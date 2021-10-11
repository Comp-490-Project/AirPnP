import AnimatedSplash from "react-native-animated-splash-screen"
import React from 'react';
import { useEffect, useState,} from "react";
export default function SplashScreen(){
    
    //WE WANT TO CHANGE THIS WITH A USEEFFECT/USESTATE hook and integrate it with the Native Router.

    return( 
        <AnimatedSplash
        translucent={true}
        isLoaded={true} //Set is loaded to always true. Refer to comment above
        logoImage={require("../templogo.png")}
        backgroundColor={"#42a7f5"}
        loogoHeight={150}
        logoWidth={150}
        ></AnimatedSplash>
    );

}




