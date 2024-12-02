import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Svg, Circle } from 'react-native-svg';
import { collection, addDoc, getDocs, query, where, onSnapshot, deleteDoc, updateDoc, doc, Timestamp, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'; 
import { auth, db } from '../../firebaseConfig';
import styles from '../styles';
import { Audio } from 'expo-av'; // expo-av을 사용하여 사운드 재생

export default function HomeScreen() {
  const [userId, setUserId] = useState(null);
  const [alarms, setAlarms] = useState([]);
  const [takenCount, setTakenCount] = useState(0);
  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [medicationList, setMedicationList] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState({ Morning: false, Lunch: false, Dinner: false });
  const [customInstructions, setCustomInstructions] = useState('');
  const [defaultTimes, setDefaultTimes] = useState({
    Morning: '9:00 AM',
    Lunch: '1:00 PM',
    Dinner: '8:00 PM',
  });
  const [sound, setSound] = useState();
  const [progressAnim, setProgressAnim] = useState(new Animated.Value(0)); // Animation for progress circle opacity

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        loadUserMedications(user.uid);
        loadUserAlarms(user.uid);
        loadDefaultAlarmTimes(user.uid);
      } else {
        setUserId(null);
        setAlarms([]);
        setMedicationList([]);
      }
    });
    return unsubscribe;
  }, []);

  const loadDefaultAlarmTimes = async (uid) => {
    try {
      const docRef = doc(db, 'alarmSettings', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDefaultTimes({
          Morning: data.Morning ? new Date(data.Morning.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '9:00 AM',
          Lunch: data.Lunch ? new Date(data.Lunch.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '1:00 PM',
          Dinner: data.Dinner ? new Date(data.Dinner.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '8:00 PM',
        });
      }
    } catch (error) {
      console.error("Error loading default alarm times:", error);
    }
  };

  const loadUserMedications = async (userId) => {
    if (!userId) return;

    try {
      const q = query(collection(db, 'medications'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const meds = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setMedicationList(meds);
    } catch (error) {
      console.error('Error loading medication list:', error);
    }
  };

  const loadUserAlarms = (userId) => {
    if (!userId) return;

    const q = query(collection(db, 'alarms'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userAlarms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      handleSortAlarms(userAlarms);
    });
    return unsubscribe;
  };

  // Function to play the pop sound when an alarm is toggled
  const playPopSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/pop.mp3')  // pop.mp3 경로
    );
    setSound(sound);
    await sound.playAsync();
  };

  // Function to play the done sound when all alarms are taken
  const playDoneSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/done.mp3')  // done.mp3 경로
    );
    setSound(sound);
    await sound.playAsync();
  };

  const toggleTaken = async (id) => {
    if (!userId) return;

    const updatedAlarms = alarms.map((alarm) => {
      if (alarm.id === id) {
        const newTakenStatus = !alarm.taken;
        updateDoc(doc(db, 'alarms', id), { taken: newTakenStatus });
        return { ...alarm, taken: newTakenStatus };
      }
      return alarm;
    });

    handleSortAlarms(updatedAlarms);
    playPopSound(); // Play pop sound when taken status is toggled
  };

  const calculateTakenCount = (alarms) => {
    const count = alarms.filter((alarm) => alarm.taken).length;
    setTakenCount(count);
    if (count === alarms.length) {
      animateProgress(); // Trigger blinking effect when all alarms are taken
      playDoneSound(); // Play done.mp3 when all alarms are taken
    }
  };

  const handleAddAlarm = () => {
    setAlarmModalVisible(true);
    setSelectedMedication(null);
    setSelectedTimes({ Morning: false, Lunch: false, Dinner: false });
    setCustomInstructions('');
  };

  const toggleTimeSelection = (timePeriod) => {
    if (!selectedMedication) {
      Alert.alert('Please select a medication first');
      return;
    }
    setSelectedTimes((prevTimes) => ({
      ...prevTimes,
      [timePeriod]: !prevTimes[timePeriod],
    }));
  };

  const handleSaveAlarm = async () => {
    if (!userId || !selectedMedication || customInstructions.trim() === '') {
      Alert.alert('Error', 'Please select a medication, enter instructions, and choose a time.');
      return;
    }

    const newAlarms = [];
    const today = new Date();
    const todayTimestamp = Timestamp.fromDate(today);

    for (const period in selectedTimes) {
      if (selectedTimes[period]) {
        const alarmData = {
          userId: userId,
          name: selectedMedication.name,
          time: defaultTimes[period],
          period,
          instructions: customInstructions,
          taken: false,
          date: todayTimestamp,
        };

        const docRef = await addDoc(collection(db, 'alarms'), alarmData);
        newAlarms.push({ ...alarmData, id: docRef.id });
      }
    }

    const updatedAlarms = [...alarms, ...newAlarms];
    handleSortAlarms(updatedAlarms);
    setAlarmModalVisible(false);
  };

  const handleDeleteAlarm = async (id) => {
    try {
      await deleteDoc(doc(db, 'alarms', id));
      const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
      handleSortAlarms(updatedAlarms);
    } catch (error) {
      console.error('Error deleting alarm:', error);
    }
  };

  const handleSortAlarms = (alarms) => {
    const sortedAlarms = [...alarms].sort((a, b) => {
      const periodOrder = { Morning: 0, Lunch: 1, Dinner: 2 };
      if (a.taken !== b.taken) {
        return a.taken - b.taken;
      }
      return periodOrder[a.period] - periodOrder[b.period];
    });

    setAlarms(sortedAlarms);
    calculateTakenCount(sortedAlarms);
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => Alert.alert('Delete Alarm', 'Are you sure you want to delete this alarm?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => handleDeleteAlarm(id) },
      ])}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderAlarmItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.card}>
        <View style={styles.medPeriodContainer}>
          <Text style={styles.medPeriod}>{item.period}</Text>
          <Text style={styles.medTime}>{item.time}</Text>
        </View>
        <View style={styles.medContentContainer}>
          <View style={styles.leftSection}>
            <MaterialIcons name="medication" size={40} color="#428CF7" />
            <View style={styles.medInfo}>
              <Text style={styles.medName}>{item.name}</Text>
              <Text style={styles.medDescription}>{item.instructions}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => toggleTaken(item.id)}>
            <Text style={[styles.takenStatus, item.taken ? styles.homeTaken : styles.homeNotTaken]}>
              {item.taken ? 'Taken' : 'Not Taken'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  // Compute progress here without redeclaring `progress`
  const progress = alarms.length ? takenCount / alarms.length : 0;

  // Animation trigger
  const animateProgress = () => {
    Animated.sequence([
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(progressAnim, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.progressText}>
          {takenCount === alarms.length ? "Well done!" : "Almost there, keep going!"}
        </Text>
        <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
          <Svg height="100" width="100" style={{ position: 'absolute', zIndex: 1 }}>
            <Circle
              cx="50"
              cy="50"
              r="40"
              stroke="#428CF7"
              strokeWidth="10"
              fill="none"
              strokeDasharray={`${Math.PI * 2 * 40}`}
              strokeDashoffset={`${Math.PI * 2 * 40 * (1 - progress)}`}
            />
          </Svg>
          <Animated.View
            style={[styles.progressCircle, { opacity: progressAnim }]}>
            <Text style={styles.progress}>{takenCount}/{alarms.length}</Text>
          </Animated.View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Today's Medications</Text>
      <FlatList
        data={alarms}
        renderItem={renderAlarmItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAlarm}>
        <Text style={styles.addButtonText}>Add Alarm</Text>
      </TouchableOpacity>
      <Modal visible={alarmModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setAlarmModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="#878787" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Medication</Text>
            {medicationList.length > 0 ? (
              <FlatList
                data={medicationList}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setSelectedMedication(item)}>
                    <Text style={selectedMedication?.id === item.id ? styles.selectedMedication : styles.modalItemText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <Text>No saved medications found.</Text>
            )}
            {selectedMedication && (
              <TextInput
                placeholder="Enter instructions (e.g., take with food)"
                value={customInstructions}
                onChangeText={setCustomInstructions}
                style={styles.input}
              />
            )}
            {selectedMedication && (
              <View style={styles.timeSelectionContainer}>
                <TouchableOpacity onPress={() => toggleTimeSelection('Morning')}>
                  <Text style={selectedTimes.Morning ? styles.selectedTime : styles.timeOption}>Morning ({defaultTimes.Morning})</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSelection('Lunch')}>
                  <Text style={selectedTimes.Lunch ? styles.selectedTime : styles.timeOption}>Lunch ({defaultTimes.Lunch})</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSelection('Dinner')}>
                  <Text style={selectedTimes.Dinner ? styles.selectedTime : styles.timeOption}>Dinner ({defaultTimes.Dinner})</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={handleSaveAlarm}>
              <Text style={styles.modalButtonText}>Save Alarm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}
