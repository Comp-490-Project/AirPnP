import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import colors from '../../theme/colors';
import AppButton from '../AppButton';
import { openCamera, openLibrary } from '../../../helpers/mediaPermissions';
import { useDispatch } from 'react-redux';
import { handleImageInUI } from '../../../actions/restroomActions';

function ReviewBottomSheet({ reference }) {
  const dispatch = useDispatch();

  const handleCamera = async () => {
    const image = await openCamera();
    dispatch(handleImageInUI(image));
    reference.current.snapTo(1);
  };

  const handleLibrary = async () => {
    const image = await openLibrary();
    dispatch(handleImageInUI(image));
    reference.current.snapTo(1);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photos</Text>
        <Text style={styles.panelSubtitle}>Nothing Graphic Please</Text>
      </View>
      <TouchableOpacity style={{ margin: 5 }}>
        <AppButton title="Take Photo" onPress={handleCamera} />
      </TouchableOpacity>
      <TouchableOpacity style={{ margin: 5 }}>
        <AppButton title="Choose From Library" onPress={handleLibrary} />
      </TouchableOpacity>
      <TouchableOpacity style={{ margin: 5 }}>
        <AppButton title="Cancel" onPress={() => reference.current.snapTo(1)} />
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheet
      ref={reference}
      snapPoints={['50%', 0]}
      initialSnap={1}
      enableGestureInteraction={true}
      enabledContentTapInteraction={false}
      borderRadius={10}
      renderHeader={renderHeader}
      renderContent={renderInner}
    />
  );
}

const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: colors.white,
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 5,
  },
  panelButtons: {
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 7,
    flex: 1,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.white,
  },
  header: {
    backgroundColor: colors.white,
    shadowColor: colors.lightgray,
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightgray,
    marginBottom: 10,
  },
});

export default ReviewBottomSheet;
