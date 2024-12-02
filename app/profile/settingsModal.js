import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';

export default function SettingsModal({ onClose }) {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Settings</Text>

        <View style={styles.inputContainer}>
          <Text>Notifications</Text>
          <Switch value={isNotificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>

        <TouchableOpacity style={styles.settingsOption}>
          <Icon name="refresh" size={16} color="#4da6ff" />
          <Text style={styles.settingsItemText}>Reset Medication Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsOption}>
          <Icon name="question-circle" size={16} color="#4da6ff" />
          <Text style={styles.settingsItemText}>Help & Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
