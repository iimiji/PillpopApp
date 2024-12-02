import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import styles from '../styles';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysInMonth = {
  Jan: 31, Feb: 28, Mar: 31, Apr: 30, May: 31, Jun: 30, Jul: 31, Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31,
};

const getStartDayOfMonth = (monthIndex) => {
  const year = 2024; // 원하는 연도로 설정
  return new Date(year, monthIndex, 1).getDay();
};

const Calendar = () => {
  const [userId, setUserId] = useState(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medications, setMedications] = useState([]);

  const currentMonth = months[currentMonthIndex];
  const totalDays = daysInMonth[currentMonth];
  const startDay = getStartDayOfMonth(currentMonthIndex);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        loadUserAlarmsForDate(user.uid, selectedDate);
      } else {
        setUserId(null);
        setMedications([]);
      }
    });

    return unsubscribeAuth;
  }, [selectedDate]);

  const loadUserAlarmsForDate = (userId, date) => {
    if (!userId || !date) return;

    try {
      const formattedDate = date.toISOString().split('T')[0]; // ISO 8601 형식
      const q = query(
        collection(db, 'alarms'),
        where('userId', '==', userId),
        where('date', '==', formattedDate)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const meds = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMedications(meds);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error converting date:', error);
      Alert.alert('Invalid date format', 'Please select a valid date.');
    }
  };

  const handleDateSelect = (day) => {
    const date = new Date(2024, currentMonthIndex, day); // 연도를 고정하여 처리
    setSelectedDate(date);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev - 1 + months.length) % months.length);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev + 1) % months.length);
  };

  const renderCalendarDays = () => {
    const daysArray = [];

    for (let i = 0; i < startDay; i++) {
      daysArray.push(<View key={`blank-${i}`} style={styles.blankDay}></View>);
    }

    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(
        <TouchableOpacity
          key={day}
          onPress={() => handleDateSelect(day)}
          style={styles.dayContainer}
        >
          <Text style={selectedDate.getDate() === day && currentMonthIndex === selectedDate.getMonth() ? styles.dateSelected : styles.calendarDay}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    const remainingDays = (startDay + totalDays) % 7;
    if (remainingDays !== 0) {
      for (let i = remainingDays; i < 7; i++) {
        daysArray.push(<View key={`blank-end-${i}`} style={styles.blankDay}></View>);
      }
    }

    return daysArray;
  };

  const renderMedicationItem = ({ item }) => (
    <View style={styles.medCard}>
      <Text style={styles.medTime}>{item.time}</Text>
      <Text style={styles.medName}>{item.name}</Text>
      <Text style={item.taken ? styles.calendarTaken : styles.calendarNotTaken}>
        {item.taken ? 'Taken' : 'Not Taken'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Text style={styles.arrow}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.month}>{currentMonth}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendar}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.calendarDayLabel}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.datesContainer}>{renderCalendarDays()}</View>
      </View>

      <Text style={styles.sectionTitle}>Medication History</Text>
      <Text style={styles.dateTitle}>{selectedDate.toDateString()}</Text>
      {medications.length > 0 ? (
        <FlatList
          data={medications}
          renderItem={renderMedicationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.medList}
        />
      ) : (
        <Text style={styles.noMedicationText}>No medications taken on this day</Text>
      )}
    </View>
  );
};

export default Calendar;
