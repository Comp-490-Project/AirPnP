import React from 'react';
import { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMarkerAttributes,
  setMapCenterLocation,
} from '../../actions/restroomActions';
import ToiletMarker from '../icons/marker.svg';
import MainMarker from '../icons/main-marker.svg';

function MapMarker({ marker, index }) {
  const dispatch = useDispatch();

  const { mapCenterLocation } = useSelector((state) => state.map);

  const selectedLat = mapCenterLocation?.latitude;
  const selectedLng = mapCenterLocation?.longitude;

  return (
    <>
      <Marker
        key={index}
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        onPress={() => {
          dispatch(setMarkerAttributes(marker));
          dispatch(setMapCenterLocation(marker.latitude, marker.longitude));
        }}
      >
        {marker.latitude === selectedLat && marker.longitude === selectedLng ? (
          <MainMarker width={100} height={40} />
        ) : (
          <ToiletMarker width={100} height={40} />
        )}
      </Marker>
    </>
  );
}

export default MapMarker;
