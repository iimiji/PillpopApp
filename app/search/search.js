import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../firebaseConfig';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'; // Swipeable 추가
import styles from '../styles';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [medications, setMedications] = useState([]);
  const [medicationChoices, setMedicationChoices] = useState([]);
  const [imageMap, setImageMap] = useState({}); // 약물 ID와 이미지 URI를 매핑하는 객체

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        loadUserMedications(user.uid);
      } else {
        setMedications([]);
      }
    });
    return unsubscribe;
  }, []);

  const loadUserMedications = async (userId) => {
    try {
      const q = query(collection(db, "medications"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const userMedications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedications(userMedications);
    } catch (error) {
      console.error("Error loading medications:", error);
      Alert.alert("Failed to load medications.");
    }
  };

  const searchMedication = async () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Error', 'Please enter a valid medication name.');
      return;
    }

    try {
      const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${searchQuery}&limit=5`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const medicationsList = data.results.map((item) => ({
          id: item.id || Math.random().toString(),
          name: item.openfda.brand_name ? item.openfda.brand_name[0] : 'No name available',
          description: item.description ? item.description[0] : 'No description available',
        }));

        setMedicationChoices(medicationsList);
      } else {
        Alert.alert('No medications found.');
      }
    } catch (error) {
      console.error('API fetch error:', error);
      Alert.alert('Failed to fetch medication information.');
    }
  };

  const saveMedication = async (medication) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Please log in to save medications.");
      return;
    }

    const medicationData = {
      userId: user.uid,
      name: medication.name,
      description: medication.description.length > 100
        ? medication.description.substring(0, 100) + '...'
        : medication.description,
    };

    try {
      const docRef = await addDoc(collection(db, "medications"), medicationData);
      setMedications([...medications, { ...medicationData, id: docRef.id }]);
      setMedicationChoices([]);
      Alert.alert("Medication saved successfully!");
    } catch (error) {
      console.error("Error saving medication:", error);
      Alert.alert("Failed to save medication.");
    }
  };

  const deleteMedication = async (medicationId) => {
    try {
      await deleteDoc(doc(db, "medications", medicationId));
      setMedications(medications.filter((medication) => medication.id !== medicationId));
      Alert.alert("Medication deleted successfully!");
    } catch (error) {
      console.error("Error deleting medication:", error);
      Alert.alert("Failed to delete medication.");
    }
  };

  const pickImage = async (medicationId) => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        { text: "Camera", onPress: () => openCamera(medicationId) },
        { text: "Gallery", onPress: () => openGallery(medicationId) },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const openCamera = async (medicationId) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Camera access is required to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImageMap((prev) => ({ ...prev, [medicationId]: uri })); // 로컬 상태에 이미지 URI 저장
    }
  };

  const openGallery = async (medicationId) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Media library access is required to select a photo.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImageMap((prev) => ({ ...prev, [medicationId]: uri })); // 로컬 상태에 이미지 URI 저장
    }
  };

  const renderRightActions = (medicationId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteMedication(medicationId)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.sectionTitle}>Search Tablet</Text>
      <View style={styles.searchHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Tablet"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={searchMedication}>
          <MaterialIcons name="search" size={30} color="#4da6ff" />
        </TouchableOpacity>
      </View>

      {medicationChoices.length > 0 && (
        <View style={styles.medicineListContainer}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          {medicationChoices.map((medication) => (
            <TouchableOpacity
              key={medication.id}
              style={styles.medicineChoiceButton}
              onPress={() => saveMedication(medication)}
            >
              <Text style={styles.medicineChoiceButtonText}>{medication.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Saved Medications</Text>
      <FlatList
        data={medications}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => renderRightActions(item.id)}
          >
            <View style={styles.medicineCard}>
              {imageMap[item.id] ? (
                <Image source={{ uri: imageMap[item.id] }} style={styles.medicineImage} />
              ) : (
                <MaterialIcons name="medication" size={40} color="#428CF7" />
              )}
              <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>{item.name}</Text>
                <Text style={styles.medicineDescription}>Description: {item.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.addPhotoButton}
                onPress={() => pickImage(item.id)}
              >
                <MaterialIcons name="add-a-photo" size={24} color="#4da6ff" />
              </TouchableOpacity>
            </View>
          </Swipeable>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.medicineListContainer}
      />
    </GestureHandlerRootView>
  );
};

export default Search;
