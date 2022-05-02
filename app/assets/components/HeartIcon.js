import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import colors from '../theme/colors';
import { useDispatch } from 'react-redux';
import { favoriteHandler } from '../../actions/userActions';

const HeartIcon = ({ geohash }) => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity onPress={() => dispatch(favoriteHandler(geohash))}>
        <FontAwesomeIcon
          icon={faHeart}
          size={30}
          color={colors.backgroundLight}
        />
      </TouchableOpacity>
    </View>
  );
};
export default HeartIcon;
