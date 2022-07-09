import React from 'react';
import { GOOGLE_APIKEY } from '@env';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  getRestrooms,
  setMapCenterLocation,
} from '../../actions/restroomActions';

const WIDTH = Dimensions.get('window').width;

export const SearchScreen = function ({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        <MaterialIcons
          name="search"
          color="black"
          size={25}
          style={{ alignSelf: 'center' }}
        />
      </View>
      <View style={styles.centerCol}>
        <GooglePlacesAutocomplete
          styles={{ style: styles.inputStyle }}
          enablePoweredByContainer={false}
          placeholder="Search here"
          GooglePlacesDetailsQuery={{
            fields: ['formatted_address', 'geometry'],
          }}
          onPress={(data, details = null) => {
            const {
              geometry: {
                location: { lat, lng },
              },
            } = details;
            dispatch(getRestrooms(lat, lng));
            dispatch(setMapCenterLocation(lat, lng));
            navigation.navigate('Tabs');
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_APIKEY,
            language: 'en',
          }}
        />
      </View>

      <View style={styles.rightCol}>
        <Text style={{ fontSize: 8 }}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    width: WIDTH - 30,
    top: 40,
    left: 15,
    backgroundColor: 'white',
    elevation: 7,
    flex: 10,
    borderRadius: 25,
  },
  rightCol: {
    flex: 1,
    alignSelf: 'center',
  },
  leftCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    height: '45%',
    alignItems: 'center',
    padding: 10,
  },
  centerCol: {
    flex: 10,
    top: 0,
    left: 0,
    height: '40%',
  },
});

export default SearchScreen;
