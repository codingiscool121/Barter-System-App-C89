import React from 'react';
import LottieView from 'lottie-react-native'


export default class Animation extends React.Component{
    render(){
        return(
            <LottieView 
            source={require('../assets/Money.json')}
            style={{width:120, marginTop:50}}
            autoPlay loop
            >
            </LottieView>
           
        )
    }
}