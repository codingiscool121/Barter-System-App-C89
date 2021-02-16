import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert, FlatList } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { render } from 'react-dom';
import Header from '../Components/Header'
import {DrawerItems} from 'react-navigation-drawer';
import Welcome from '../screens/Welcome';
import {Avatar, Icon, Input} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import {RFValue} from "react-native-responsive-fontsize"

export default class CustomSideBarMenu extends React.Component{
    constructor(props){
    super(props)
    this.state={
        UserId: firebase.auth().currentUser.email,
        Image:"#",
        name: "#",
        Username:"",
        docId:"",
     }
    }
    componentDidMount(){
        this.fetchImage(this.state.UserId)
        this.getDetails(this.Username)
    }

    fetchImage= (ImageName)=>{
        var image = firebase.storage().ref().child("User_Profiles  " +  ImageName)
        image.getDownloadURL().then(
            uri=>{
                this.setState({
                    Image:uri
                })
            }
        ).catch(err=>{
           this.setState({
               Image: "#"
           })     
           console.log(err)
        })
    }

    uploadImage=async (uri,ImageName)=>{
     var storage = firebase.storage().ref().child("User_Profiles  " + ImageName )
     var response = await fetch(uri)
     var blob = await response.blob()
     return storage.put(blob).then(
         reponse=>{
             this.fetchImage(ImageName)
         }
     )

    }
    getDetails=()=>{
        var user = firebase.auth().currentUser.email
        db.collection('users').where('UserId', '==', user).get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
            var data = doc.data()
            // console.log(data)
            this.setState({
              Username:data.Username,
              docId:doc.id
            })
          })
        })
      }
    selectPicture= async ()=>{
        const{cancelled,uri}= await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspectRatio: [4,3],
            quality: '1'
        })
        if(!cancelled){
            this.setState({
                Image: uri
            })
            this.uploadImage(uri,this.state.UserId)
        }
    }
    render(){
        let color =[
            "#3385FF",
            "#33FF70"
        ]
       let c= Math.floor(Math.random()*color.length)
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.8}}>
                   <View style={{flex:0.5, alignItems: 'center', backgroundColor: "#00ced1"}}>
                <Avatar
                rounded
                source = {{uri:this.state.Image}}
                size= "medium"
                showEditButton
                onPress={()=>{
                    this.selectPicture()
                }}
                containerStyle={styles.ImageContainer}
                />
            <Text style={{fontWeight:"bold",marginTop:15}}>{"Hello " + this.state.Username + "!"}</Text>
            </View>
                    <DrawerItems {...this.props}>
                    
                    </DrawerItems>
                    <View style={{flex:0.2,justifyContent:"flex-end"}}>
                 
                    
                    <TouchableOpacity style={{width:'100', height:40, justifyContent:'center', backgroundColor:"#FF69B4"}}
            
                    onPress={()=>{
                        const signout = firebase.auth().signOut();
                        if(signout){
                            this.props.navigation.navigate('Welcome')
                        }else{
                            alert("It seems there was an error in signing you out," + firebase.auth().currentUser.email + ". When we tried, here is the error message we got: " + error.message + ". Please try fixing this error and try again.")
                        }
                    }}
                    >
                         <Icon name="logout" type="antdesign" color="#800080"  size={30} iconStyle={{paddingLeft:RFValue(-1000)} }></Icon>
                        {/* <Text>Logout</Text> */}
                    </TouchableOpacity>
                   
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    ImageContainer:{
        flex: 0.75, 
        width: "40%", 
        height: "20%", 
        marginLeft: 20, 
        marginTop: 30, 
        borderRadius: 40,
    }
})