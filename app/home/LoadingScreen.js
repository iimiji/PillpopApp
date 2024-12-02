import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated, Text } from "react-native";

const PILL_IMAGE = require("../../assets/intropill.png"); // 이미지 경로
const PILL_COLOR = "#4da6ff";
const LOGO_TEXT = "PILLPOP";

const LoadingScreen = () => {
  const pillPosition = useRef(new Animated.Value(300)).current; // 오른쪽에서 시작 (x=300)
  const logoOpacity = useRef(new Animated.Value(0)).current; // 로고는 투명 상태로 시작

  useEffect(() => {
    // 애니메이션 순차 실행
    Animated.sequence([
      Animated.timing(pillPosition, {
        toValue: 0, // 중앙으로 이동 (x=0)
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1, // 로고 나타남
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pillPosition, logoOpacity]);

  return (
    <View style={styles.container}>
      {/* 알약 이미지 */}
      <Animated.Image
        source={PILL_IMAGE}
        style={[
          styles.pill,
          {
            transform: [{ translateX: pillPosition }], // 애니메이션 이동
          },
        ]}
      />
      {/* 로고 */}
      <Animated.Text style={[styles.logo, { opacity: logoOpacity }]}>
        {LOGO_TEXT}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  pill: {
    width: 500,
    height: 200,
    resizeMode: "contain", // 이미지 비율 유지
    position: "absolute",
  },
  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: PILL_COLOR,
    position: "absolute",
    top: "60%",
  },
});

export default LoadingScreen;
