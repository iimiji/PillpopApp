import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Linking, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import styles from '../styles';
import { auth } from '../../firebaseConfig'; 
import { signOut } from 'firebase/auth'; 
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; 
import DateTimePicker from '@react-native-community/datetimepicker';

const db = getFirestore(); 

export default function ProfileScreen() {
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [alarmTimes, setAlarmTimes] = useState({
    Morning: new Date('2024-12-01T09:00:00'),
    Lunch: new Date('2024-12-01T12:30:00'),
    Dinner: new Date('2024-12-01T18:00:00'),
  });
  const [isTimePickerVisible, setTimePickerVisible] = useState({
    Morning: false,
    Lunch: false,
    Dinner: false,
  });
  const [isSettingModalVisible, setSettingModalVisible] = useState(false);
  const [isHealthNewsModalVisible, setHealthNewsModalVisible] = useState(false);
  const [healthNews, setHealthNews] = useState([]);
  const [latestHealthNews, setLatestHealthNews] = useState([]); 

  // Load alarm times from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadAlarmTimes(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchHealthNews(); 
  }, []);

  // Fetch health news
  const fetchHealthNews = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          category: 'health',
          apiKey: '06248a09bade4d42a929d49ef8c405fe',
        },
      });

      // Filter out articles with 'removed' in title or url and set the latest 3 news
      const filteredArticles = response.data.articles.filter(item => 
        !item.title.includes("[removed]") && !item.url.includes("removed")
      );

      setHealthNews(filteredArticles.slice(0, 20)); // Show top 20 health news
      setLatestHealthNews(filteredArticles.slice(0, 3)); // Latest 3 news for the page
    } catch (error) {
      console.error('Error fetching health news:', error);
    }
  };

  // Handle time changes
  const handleTimeChange = (timePeriod, event, selectedTime) => {
    const newTime = selectedTime || alarmTimes[timePeriod];
    setAlarmTimes(prevTimes => ({
      ...prevTimes,
      [timePeriod]: newTime,
    }));
    setTimePickerVisible(prevState => ({
      ...prevState,
      [timePeriod]: false,
    }));
  };

  const toggleTimePicker = (timePeriod) => {
    setTimePickerVisible(prevState => ({
      ...prevState,
      [timePeriod]: !prevState[timePeriod],
    }));
  };

  // Save alarm times to Firebase
  const saveAlarmTimes = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'User is not logged in.');
        return;
      }
      const docRef = doc(db, 'users', user.uid, 'settings', 'alarmTimes');
      await setDoc(docRef, {
        Morning: alarmTimes.Morning.toISOString(),
        Lunch: alarmTimes.Lunch.toISOString(),
        Dinner: alarmTimes.Dinner.toISOString(),
      });
      Alert.alert('Success', 'Alarm times saved successfully.');
      setTimeModalVisible(false); 
    } catch (error) {
      console.error('Error saving alarm times:', error.message);
      Alert.alert('Error', 'Failed to save alarm times.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  // Open the news article link when clicked
  const handleNewsClick = (url) => {
    if (url) {
      Linking.openURL(url);
    } else {
      console.log('URL not available');
    }
  };

  // Render news items
  const renderHealthNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleNewsClick(item.url)} style={styles.newsItem}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Latest Medical News</Text>
      

      {/* Latest Health News (3 items) */}
      {latestHealthNews && latestHealthNews.map((newsItem, index) => (
        <View key={index} style={styles.newsContainer}>
          <Text style={styles.newsTitle}>{newsItem.title}</Text>
          <Text style={styles.newsDescription}>{newsItem.description}</Text>
        </View>
      ))}

      <TouchableOpacity onPress={() => setSettingModalVisible(true)} style={styles.settingsIcon}>
        <MaterialIcons name="settings" size={30} color="#4da6ff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setHealthNewsModalVisible(true)}>
        <MaterialIcons name="local-hospital" size={20} color="#4da6ff" style={styles.icon} />
        <Text style={styles.buttonText}>More Health News</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <MaterialIcons name="logout" size={20} color="#4da6ff" style={styles.icon} />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Time Modal for Adjusting Alarm Times */}
      <Modal visible={isTimeModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setTimeModalVisible(false)} style={styles.closeButton}>
              <MaterialIcons name="close" size={30} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Adjust Alarm Times</Text>

            {/* Morning Time Picker */}
            <TouchableOpacity onPress={() => toggleTimePicker('Morning')}>
              <Text style={styles.timeOption}>
                Morning: {alarmTimes.Morning.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {isTimePickerVisible.Morning && (
              <DateTimePicker
                value={alarmTimes.Morning}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => handleTimeChange('Morning', event, selectedTime)}
              />
            )}

            {/* Lunch Time Picker */}
            <TouchableOpacity onPress={() => toggleTimePicker('Lunch')}>
              <Text style={styles.timeOption}>
                Lunch: {alarmTimes.Lunch.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {isTimePickerVisible.Lunch && (
              <DateTimePicker
                value={alarmTimes.Lunch}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => handleTimeChange('Lunch', event, selectedTime)}
              />
            )}

            {/* Dinner Time Picker */}
            <TouchableOpacity onPress={() => toggleTimePicker('Dinner')}>
              <Text style={styles.timeOption}>
                Dinner: {alarmTimes.Dinner.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {isTimePickerVisible.Dinner && (
              <DateTimePicker
                value={alarmTimes.Dinner}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => handleTimeChange('Dinner', event, selectedTime)}
              />
            )}

            <TouchableOpacity style={styles.modalButton} onPress={saveAlarmTimes}>
              <Text style={styles.modalButtonText}>Save Times</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Setting Modal */}
      <Modal visible={isSettingModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setSettingModalVisible(false)} style={styles.closeButton}>
              <MaterialIcons name="close" size={30} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Settings</Text>
            <TouchableOpacity onPress={() => setTimeModalVisible(true)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Adjust Alarm Times</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Health News Modal */}
      <Modal visible={isHealthNewsModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setHealthNewsModalVisible(false)} style={styles.closeButton}>
              <MaterialIcons name="close" size={30} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>More Health News</Text>
            <Text style={styles.subTitle}>Click the article title to read more.</Text>
            <FlatList
              data={healthNews}
              renderItem={renderHealthNewsItem}
              keyExtractor={(item) => item.url} 
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
