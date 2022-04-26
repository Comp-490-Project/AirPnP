import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import colors from '../assets/theme/colors';

export const useDirections = (location, destination) => {
  return (
    <MapViewDirections
      origin={location}
      destination={destination}
      apikey={'AIzaSyB65lV0eONvq5_rGwaZm7pMHOJZYM4gVMk'}
      strokeColor={colors.directionsStroke}
      strokeWidth={4}
    />
  );
};
