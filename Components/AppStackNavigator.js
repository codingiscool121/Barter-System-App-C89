import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Receiver from '../screens/ReceiverDetails';
import Home from '../screens/Home';

export const AppStackNavigator= createStackNavigator({
    Home:{
       screen:Home,
       navigationOptions:{
           headerShown:false,
        tabBarIcon:
        <Image
        source={require('../assets/homeicon.png')} 
        style={{width:20, height: 20}}
        tabBarLabel="Home"
        />
       }
    },
    Receiver:{
        screen:Receiver,
        navigationOptions:{
         headerShown:false
        }
    },
},
    {
        initialRouteName:'Home'
    }
)