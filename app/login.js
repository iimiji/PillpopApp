import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Firebase 인증 객체 가져오기

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 로그인 처리 함수
  const handleLogin = async () => {
    // 이메일과 비밀번호 유효성 검사
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Firebase 로그인 처리
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in!');

      // 로그인 성공 시 Tab Navigator로 이동
      navigation.reset({
        index: 0,
        //routes: [{ name: 'MainTab' }], // MainTab은 App.js의 Tab Navigator 이름
      });
    } catch (error) {
      // Firebase 오류 메시지 처리
      if (error.code === 'auth/user-not-found') {
        setError('User not found. Please check your email.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError(error.message); // 일반적인 Firebase 오류 메시지 표시
      }
    }
  };

  // 회원가입 화면으로 이동 함수
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#888"
        autoCapitalize="none" // 이메일 자동 대문자 방지
        keyboardType="email-address" // 이메일 입력 키보드 활성화
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#888"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSignUp}>
        <Text style={styles.linkText}>
          Don’t have an account? <Text style={styles.link}>Sign Up Now</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
  },
  link: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
