import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import { Marker, Callout } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { setMarkerAttributes } from '../../actions/mapActions';

function MapMarker({ marker, reference, index }) {
  const dispatch = useDispatch();

  return (
    <Marker
      key={index}
      image={require('../../assets/icons/app-logo.png')}
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
    >
      <Callout
        tooltip
        onPress={() => {
          dispatch(setMarkerAttributes(marker));
          reference.current.snapTo(0);
        }}
      >
        <View>
          <View style={styles.calloutWindow}>
            <Text style={styles.name}>{marker.name}</Text>
            <Text>{marker.description}</Text>
          </View>
          <View style={styles.arrowBorder} />
          <View style={styles.arrow} />
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  calloutWindow: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderRadius: 7,
    borderColor: colors.medium,
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: colors.white,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: colors.white,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

export default MapMarker;
