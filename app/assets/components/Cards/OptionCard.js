import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import colors from '../../theme/colors';
import Icon from '@expo/vector-icons/FontAwesome';
import { HEIGHT, WIDTH } from '../../../constants/Dimensions';

export default function OptionCard({ icon, bg, title }) {
  const [isEnabled, setisEnabled] = useState(false);
  const toggleSwitch = () => setisEnabled((previousState) => !previousState);

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: 'row',
        backgroundColor: '#1c1f28',
      }}
    >
      <View style={styles.icon}>
        <Icon name={icon} size={20} color={bg} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Switch
        trackColor={{ false: colors.backgroundDark, true: colors.green }}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{
          transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
          marginLeft: '8%',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT * 0.06,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },
});
