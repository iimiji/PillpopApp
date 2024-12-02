import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Firebase 설정

// 각 화면 컴포넌트 import
import HomeScreen from "./app/home/home";
import LoadingScreen from "./app/home/LoadingScreen"; // LoadingScreen 추가
import CalendarScreen from "./app/calendar/calendar";
import SearchScreen from "./app/search/search";
import MapScreen from "./app/map/map";
import LoginScreen from "./app/login";
import NewsScreen from "./app/profile/news";
import SignUpScreen from "./app/signup";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Calendar") iconName = "calendar";
          else if (route.name === "Search") iconName = "search";
          else if (route.name === "Pharmacy") iconName = "medkit";
          else if (route.name === "Medical News") iconName = "heartbeat";

          return (
            <Icon
              name={iconName}
              size={size}
              color={focused ? "#428CF7" : color}
            />
          );
        },
        tabBarActiveTintColor: "#428CF7",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Pharmacy" component={MapScreen} />
      <Tab.Screen name="Medical News" component={NewsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true); // 초기 로딩 상태
  const [user, setUser] = useState(null); // 사용자 인증 상태

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // 로딩 애니메이션 시간 설정 (예: 3초)
    setTimeout(() => {
      setIsAppLoading(false); // 로딩 완료
    }, 3000);

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAppLoading ? (
          // 로딩 화면
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        ) : user ? (
          // 로그인 상태: Tab Navigator
          <Stack.Screen
            name="MainTab"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          // 비로그인 상태: Login/SignUp 관리
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
