import React from 'react';
import { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMarkerAttributes,
  setMapCenterLocation,
} from '../../actions/restroomActions';
import MarkerImage from '../icons/marker.png';
import MainMarkerImage from '../icons/main-marker.png';

function MapMarker({ marker, index }) {
  const dispatch = useDispatch();

  const { restroomWithDirections } = useSelector((state) => state.map);
  const coordinates = restroomWithDirections.split(',');
  const selectedLat = Number(coordinates[0]);
  const selectedLng = Number(coordinates[1]);

  return (
    <Marker
      key={index}
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
      image={
        marker.latitude === selectedLat && marker.longitude === selectedLng
          ? MainMarkerImage
          : MarkerImage
      }
      onPress={() => {
        dispatch(setMarkerAttributes(marker));
        dispatch(setMapCenterLocation(marker.latitude, marker.longitude));
      }}
    />
  );
}

export default MapMarker;
