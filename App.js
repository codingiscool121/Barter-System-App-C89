import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Exchange from './screens/ExchangeScreen';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import {AppDrawerNavigator} from './Components/AppDrawerNavigator';
import settings from './screens/Settings'
export default class App extends React.Component {
  render(){
    return(
      <AppContainer />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const BottomTab = createBottomTabNavigator(
//   {
//     Home: {screen:Home},
//     Exchange: {screen:Exchange}
//   },
//   {
//     defaultNavigationOptions: ({navigation})=>({
//       tabBarIcon:()=>{
//         const routeName = navigation.state.routeName;
//         if(routeName==="Home"){
//           return(
//             <Image
//             source={require('./assets/homeicon.png')}
//             style={{width:40,height:40}}
//             />
//           )
//         }else if(routeName==="Exchange"){
//           return(
//             <Image
//             source={require('./assets/tradingicon.gif')}
//             style={{width:40,height:40}}
//             />
//           )
//         }
//       }
//     })
//   }
// )

const switchNavigator = createSwitchNavigator({
  Welcome:{screen:Welcome},
  Settings:{screen:settings},
  Drawer: {screen:AppDrawerNavigator}
})
const AppContainer = createAppContainer(switchNavigator);
