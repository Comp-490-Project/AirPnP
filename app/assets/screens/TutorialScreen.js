import {StyleSheet,View, FlatList, Animated} from 'react-native'
import { useState,useRef } from 'react';
import React from 'react';
import slides from '../../constants/slides';
import TutorialItem from '../components/TutorialItem';
import colors from '../theme/colors';

export default function TutorialScreen() {

  const [currentPage, setCurrentPage] = useState(0);
  const scrollHorizontal = useRef(new Animated.Value(0)).current;
   

  //Ref for animated value
  const slidesRef = useRef(null);
 
  const viewableItemsChanged = useRef(({viewableItems})=>{ //Occurs whenever a scroll in the flastlist occurs, obtain index of page being observed at the current time.
    setCurrentPage(viewableItems[0].index)
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current; //Slide contents on next scren must be 50% to be changed upon swipe.


  return (  
    <View style={styles.container}>
        <View style={{ flex: 3 }}>
            <FlatList 
            data={slides} 
            renderItem={({item})=><TutorialItem item={item}/>}
            horizontal //For Horizontal Scrolling
            showsHorizontalScrollIndicator 
            pagingEnabled //Snap instead of scrolling
            bounces={false} //Removes user ability to slowly drag the page
            keyExtractor={(item)=> item.id} //Keep track of data
            onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollHorizontal}}}],{
            useNativeDriver: false //Animated driver doesn't support width animation for some reason? So just disable it.
            })} 
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            scrollEventThrottle={32}
            ref={slidesRef}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkBackground
    }
})
