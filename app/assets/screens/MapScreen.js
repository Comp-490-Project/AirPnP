import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import useLocation from '../../hooks/useLocation';
import SearchBar from '../../components/SearchBar';
import { firebase } from '../../../Firebase/firebase';

export default function MapScreen() {
  const [markerLoaded, setMarkerLoaded] = useState(false);
  const [restrooms, setRestrooms] = useState([]);

  async function getRestrooms() {
    const query = firebase.firestore().collection('testing');

    query.get().then((querySnapshot) => {
      const docs = querySnapshot.docs;
      for (const doc of docs) {
        setRestrooms((restrooms) => [...restrooms, doc.data()]);
      }
      setMarkerLoaded(true);
    });
  }

  useEffect(() => {
    if (!markerLoaded) {
      getRestrooms();
    }
  }, [markerLoaded]);

  const location = useLocation();
    
  return (
    <>
      {!location ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} //Google Maps
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0015,
              longitudeDelta: 0.0121,
            }}
            loadingEnabled={true}
          >
            {markerLoaded &&
              restrooms.map((marker, i) => (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.name}
                  description={marker.description}
                >
                  <Image
                    source={require('../../assets/Logo.png')}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                </Marker>
              ))}
          </MapView>
          <SearchBar />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    position: 'absolute',
    top: 100,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});