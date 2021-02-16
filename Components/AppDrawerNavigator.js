import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import settings from '../screens/Settings'
import MyBarters from '../screens/MyBarters'
import Notifications from '../screens/Notifications'
export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
    Settings:{
        screen:settings
    },
    Notifications:{
        screen:Notifications
    },
    Barters:{
        screen:MyBarters,
        navigationOptions:{
         tabBarLabel: "Your Barters"
        }
    },
},
    {
        contentComponent:CustomSideBarMenu
    },
    
    {
        initalRouteName:"Home",
        initalRouteName:"Settings"
    },

)
