import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import HeartIconSvg from '../icons/heart-icon.svg';
import { useDispatch} from 'react-redux';
import { favoriteHandler } from '../../actions/userActions';

const HeartIcon = ({  geohash }) => {
    const dispatch = useDispatch();
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            dispatch(favoriteHandler(geohash))
          }
        >
          <HeartIconSvg height={30} width={60}  />
        </TouchableOpacity>
      </View>
    );
  };
  export default HeartIcon;
