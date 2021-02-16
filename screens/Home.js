import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert, FlatList } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import Header from '../Components/Header'

import {ListItem} from 'react-native-elements';
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            requesteditems: [],
        }
        this.requestref = null;
    }
    getrequesteditem=()=>{
        this.requestref = db.collection('Barter_Items').onSnapshot((snapshot)=>{
            var items = snapshot.docs.map(document=>document.data()
            )
            this.setState({
                requesteditems: items
            })
        })
    }
    componentDidMount(){
        this.getrequesteditem()
    }
    componentWillUnmount(){
        this.requestref;
    }
    keyExtractor=(item,index)=>{
    index.toString()
    }
    renderItem=({item,i})=>{
    // console.log(item)
    return(
        <ListItem
        key={i}
        style={styles.item}
        title={item.ItemName}
        // subtitle={item.Description}
        titleStyle={{color:"#26a5f6"}}
        rightElement={
        <TouchableOpacity style={{width:30, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius:10 }}
        onPress={()=>{
            this.props.navigation.navigate('Receiver', {"details":item}) 
        }}
        >
        <Text style={{color:"orange"}}>
            View Details
        </Text>
        </TouchableOpacity>
        }    
        bottomDivider
        >
        </ListItem>
    )
    }



    render(){
  
        return(
            <View style={{flex:1}} >
            <Header title="Items Requested:" navigation={this.props.navigation}></Header>
            <View style={{flex:1}}>
            {
              this.state.requesteditems.length===0
              ?
              (<View style={{flex:1, fontSize: 20, justifyContent: 'center', alignItems: 'center', fontWeight:'bold'}}>
              <Text>{"The list of items requested by our users, like you, " + firebase.auth().currentUser.email + ", would appear here. Currently, there are no pending item requests. To make one, go to the Exchange screen."}</Text>
              </View>)  
              :
              (
              <FlatList keyExtractor={this.keyExtractor} 
              data={this.state.requesteditems}
              renderItem={
                  this.renderItem
              }
              >
              </FlatList>
              )
            }    
            </View></View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    item: {
      backgroundColor: 'lightblue',
      padding:10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    itemContainer: {
      height: 80,
      width:'100%',
      borderWidth: 2,
      borderColor: 'turquoise',
      justifyContent:'center',
      alignSelf: 'center',
    }
  });
