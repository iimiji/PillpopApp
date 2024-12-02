import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '../styles';

const GOOGLE_API_KEY = 'AIzaSyCfPShKzUR4Md8IF31rp7p7LnKP3OGGsnc';

const Map = () => {
  const [latitude, setLatitude] = useState(37.7749); // Default: San Francisco
  const [longitude, setLongitude] = useState(-122.4194); // Default: San Francisco
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 현재 위치 가져오기
  const fetchCurrentLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission denied');
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setError(null);
    } catch (err) {
      setError('Failed to fetch current location.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 약국 데이터 가져오기
  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=3000&type=pharmacy&key=${GOOGLE_API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const pharmaciesWithDetails = await Promise.all(
          data.results.map(async (pharmacy) => {
            const details = await fetchPlaceDetails(pharmacy.place_id);
            return {
              ...pharmacy,
              distance: calculateDistance(
                latitude,
                longitude,
                pharmacy.geometry.location.lat,
                pharmacy.geometry.location.lng
              ),
              opening_hours: details?.opening_hours || null,
            };
          })
        );

        setPharmacies(pharmaciesWithDetails.sort((a, b) => a.distance - b.distance));
      } else {
        Alert.alert('No pharmacies found nearby.');
        setPharmacies([]);
      }
    } catch (err) {
      setError('Failed to fetch pharmacies.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 장소 상세 정보 가져오기
  const fetchPlaceDetails = async (placeId) => {
    try {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&key=${GOOGLE_API_KEY}`;
      const response = await fetch(detailsUrl);
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Failed to fetch place details:', error);
      return null;
    }
  };

  // 두 지점 간 거리 계산 함수
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetchPharmacies();
    }
  }, [latitude, longitude]);

  // 영업 시간 포맷팅 함수
  const formatOpeningHours = (openingHours) => {
    if (!openingHours) {
      return 'Hours not available';
    }
    const today = new Date().getDay();
    const hours = openingHours.weekday_text?.[today - 1]; // API 기준: 월요일=1
    return hours || 'Hours not available';
  };

  const renderPharmacyItem = ({ item }) => (
    <View style={styles.pharmacyCard}>
      <Text style={styles.pharmacyName}>{item.name}</Text>
      <Text style={styles.pharmacyAddress}>{item.vicinity}</Text>
      <Text style={styles.pharmacyDistance}>
        {item.distance.toFixed(2)} km away
      </Text>
      <Text style={styles.pharmacyHours}>
        {formatOpeningHours(item.opening_hours)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pharmacyTitle}>Pharmacy Finder</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#428CF7" />
      ) : (
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title="Your Location"
            pinColor="blue"
          />
          {pharmacies.map((pharmacy, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: pharmacy.geometry.location.lat,
                longitude: pharmacy.geometry.location.lng,
              }}
              title={pharmacy.name}
              description={`${pharmacy.vicinity} (${pharmacy.distance.toFixed(
                2
              )} km)`}
            />
          ))}
        </MapView>
      )}
      <FlatList
        data={pharmacies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPharmacyItem}
        contentContainerStyle={styles.pharmacyList}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

export default Map;
