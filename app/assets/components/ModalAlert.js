import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';


export default function ModalAlert({visible, children}) {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        toggleAlert();
    },[visible])

    const toggleAlert= () =>{
        if(visible){
            setShowModal(true);
            Animated.spring(scaleValue,{
                toValue:1, duration: 300, useNativeDriver: true,
            }).start();
        }else{
            setTimeout(()=> setShowModal(false), 200);
            Animated.timing(scaleValue,{
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBG}>
                <Animated.View
                    style={[styles.modalContainer, {transform:[{scale: scaleValue}]}]}>
                    {children} 
                </Animated.View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalBG: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
})