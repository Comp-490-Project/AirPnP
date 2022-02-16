import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from 'expo-image-picker';

// Request permission for camera and set image source
export const openCamera = async () => {
  const { granted } = await requestCameraPermissionsAsync();

  if (!granted) {
    alert(
      'You must allow AirPnP to access your camera in order to take a photo!'
    );
    return;
  }

  const { cancelled, uri } = await launchCameraAsync();

  if (!cancelled) {
    return uri;
  }
};

// Request permission for camera roll (media library) and set image source
export const openLibrary = async () => {
  const { granted } = await requestMediaLibraryPermissionsAsync();

  if (!granted) {
    alert(
      'You must allow AirPnP to access your photo gallery in order to upload an image!'
    );
    return;
  }

  const { cancelled, uri } = await launchImageLibraryAsync();

  if (!cancelled) {
    return uri;
  }
};
