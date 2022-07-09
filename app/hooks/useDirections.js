import React from 'react';
import { GOOGLE_APIKEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
import colors from '../assets/theme/colors';

export const useDirections = (location, destination) => {
  return (
    <MapViewDirections
      origin={location}
      destination={destination}
      apikey={GOOGLE_APIKEY}
      strokeColor={colors.directionsStroke}
      strokeWidth={4}
    />
  );
};
