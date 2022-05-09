import React, {useEffect, useState, useRef} from 'react'
import {Text, View, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import colors from '../theme/colors';
import { useSelector, useDispatch} from 'react-redux';
import { getUserFeed } from '../../actions/userActions';
import AnimationLoad from '../components/AnimationLoad';
import { Entypo } from '@expo/vector-icons';
import { useScrollToTop } from '@react-navigation/native';


export default function FeedScreen({navgigation, route}) {
  const { userPosts, loading } = useSelector((state) => state.feed);
  const ref= useRef(null);
  const {geohash} = route.params;
  const dispatch = useDispatch();
  useScrollToTop(ref)

  
  useEffect(()=>{
      if(!loading){
          dispatch(getUserFeed(geohash))
      }
  },[loading])

  return (
    <View style={styles.mainView}>
        <Text style={styles.heading}>Feed</Text>

       <View style={styles.postsContainer}>
           {userPosts.length < 1 ?
                <AnimationLoad></AnimationLoad>
                :
                <FlatList
                    data={userPosts}
                    ref={ref}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item})=>(
                        <View style={styles.postView}>
                            <View style={styles.postTitle}>
                                <View style={styles.titleView}>
                                    <Text style={styles.userName}>userName</Text>
                                    <Text style={styles.caption}>caption</Text>
                                </View>
                                <View>
                                    <Entypo
                                        name='dots-three-vertical'
                                        color={colors.black}
                                    />
                                </View>
                            </View>
                            <Image style={styles.coverPhoto} source={{uri: item.downloadURL}}></Image>
                        </View>
                    )}
                >
                </FlatList>
            }
       </View>

    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        backgroundColor: colors.white,
    },

    heading:{
        fontSize: 32,
        fontWeight: 'bold',
        paddingTop: 25,
        textAlign: 'center',
        backgroundColor: colors.white,
        borderRadius: 3
    },

    userName:{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        marginTop: 10,
    },

    caption:{
        fontSize: 12,
        color: colors.textDark
           
    },

    titleView:{
        marginLeft: 15,
    },

    textContainer:{
        display: 'flex',
        alignItems: 'center',
    },

    textInput:{
        height: 40, 
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingLeft: 15,
        marginTop: 20,
        marginBottom: 20,
    },

    postsContainer:{
        width: '100%',
        paddingBottom: "20%",
    },

    postView:{
      width: "100%",
      alignItems: 'center'

    },

    postTitle:{
        width: '90%',
        justifyContent: 'space-between',
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center'
    },

    feedContainer:{
        width: '100%', 
        alignItems: 'center',
        marginTop: 40,
    },


    coverPhoto:{
        width: '90%',
        height: 200,
        backgroundColor: colors.black,
        marginTop: 20,
        borderRadius: 10,
    }

})