import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ExchangeScreen from '../screens/ExchangeScreen';
import Home from '../screens/Home';
import {AppStackNavigator} from './AppStackNavigator'

export const AppTabNavigator = createBottomTabNavigator({
    Home:{
    screen:AppStackNavigator,
    navigationOptions:{
        tabBarIcon:
        <Image
        source={require('../assets/homeicon.png')} 
        style={{width:20, height: 20}}
        tabBarLabel="Home"
        />
    }
    },


    Exchange:{
        screen:ExchangeScreen,
        navigationOptions:{
            tabBarIcon:
            <Image
            source={require('../assets/tradingicon.gif')}
            style={{width:20, height: 20}}
            tabBarLabel="Exchange An Item"
            />
        }
    },

})