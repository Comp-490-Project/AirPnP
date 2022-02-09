import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { getRestrooms, setCenterLocation } from '../../actions/mapActions';

const width = Dimensions.get('window').width;
export const SearchBar = function () {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftCol}>
        <MaterialIcons
          name="location-on"
          color="black"
          size={25}
          style={{ alignSelf: 'center' }}
        />
      </View>

      <View style={styles.centerCol}>
        <GooglePlacesAutocomplete
          placeholder="Search here"
          onPress={(data, details = null) => {
            const {
              geometry: {
                location: { lat, lng },
              },
            } = details;
            dispatch(getRestrooms(lat, lng));
            dispatch(setCenterLocation(lat, lng));
          }}
          styles={{
            style: styles.inputStyle,
          }}
          fetchDetails={true}
          query={{
            key: 'AIzaSyDOeEKbcngBARFdVV8a5K75fakxbrS3Kro',
            language: 'en',
          }}
          GooglePlacesDetailsQuery={{
            fields: ['formatted_address', 'geometry'],
          }}
        />
      </View>

      <View style={styles.rightCol}>
        <Text style={{ fontSize: 8 }}></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //centerCol container
    //zIndex: 5,
    position: 'absolute',
    flexDirection: 'row',
    width: width - 40, //width of window so its dynamic
    top: 60,
    left: 20,
    //borderRadius: 2,
    backgroundColor: 'white',
    elevation: 7,
    flex: 10,
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

export default SearchBar;
