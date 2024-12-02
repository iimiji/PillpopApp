import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';

export default function EditProfileModal({ onClose }) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Edit Profile</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.input}>
            <Text>User Name</Text>
            <Icon name="pencil" size={16} color="#4da6ff" />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ages</Text>
          <View style={styles.input}>
            <Text>24</Text>
            <Icon name="pencil" size={16} color="#4da6ff" />
          </View>
        </View>

        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
