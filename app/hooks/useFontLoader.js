import { useFonts } from 'expo-font';
import Inter from '../assets/fonts/Inter.ttf';

export const useFontLoader = () => {
  const [fontsLoaded] = useFonts({
    Inter,
  });

  return fontsLoaded;
};
