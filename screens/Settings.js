import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import Header from '../Components/Header'


export default class Settings extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Address:"",
      PhoneNumber:"",
      UserId:"",
      Username:"",
      docId:""
    }
  }

  componentDidMount(){
    this.getDetails();
  }


  componentWillUnmount(){
    this.getDetails();
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
          PhoneNumber:data.PhoneNumber,
          UserId: data.UserId,
          Address:data.Address,
          Town: data.Town,
          State: data.State,
          Country: data.Country,
          docId:doc.id
        })
      })
    })
  }

updateDetails=()=>{
  db.collection('users').doc(this.state.docId).update({
    Username:this.state.Username,
    Address: this.state.Address,
    PhoneNumber: this.state.PhoneNumber,
    Town: this.state.Town,
    State: this.state.State,
    Country: this.state.Country
  })
  alert("Hello, " + this.state.Username + ". Your personal information has been updated. Thank you for using EasyBarter!")
}

// confirmation(){
//   const worked = this.updateDetails()
//   if(worked){
//     alert("Hello," + firebase.auth().currentUser.email + ". Your personal information has been updated. Thank you for using EasyBarter!")
//   }else{
//     alert("Hello," + firebase.auth().currentUser.email + ". Your personal information has been updated. Thank you for using EasyBarter!")
//   }
// }

  render(){
    return(
      <View>
      <Header title="Shipment Details" navigation={this.props.navigation}></Header>
      <TextInput 
      style={styles.personalInfo}
      placeholder="Username"
      onChangeText={username=>{
        this.setState({
          Username:username
        })
      }}
      value={this.state.Username}
      ></TextInput>

      <TextInput
      style={styles.personalInfo}
      placeholder="Phone Number"
      onChangeText={phonenumber=>{
        this.setState({
          PhoneNumber:phonenumber
        })
      }}
      value={this.state.PhoneNumber}
      ></TextInput>
      <TextInput
      style={styles.personalInfo}
      placeholder="Address"
      onChangeText={address=>{
        this.setState({
          Address:address
        })
      }}
      value={this.state.Address}
      >
      </TextInput>
      <TextInput
      style={styles.personalInfo}
      placeholder="Town"      
      onChangeText={town=>{
        this.setState({
          Town:town
        })
      }}
      value={this.state.Town}
      >
      </TextInput>
      <TextInput
      style={styles.personalInfo}
      placeholder="State"
      onChangeText={state=>{
        this.setState({
        State:state
        })
      }}
      value={this.state.State}
      >
      </TextInput>
      <TextInput
      style={styles.personalInfo}
      placeholder="Country"
      onChangeText={country=>{
        this.setState({
          Country:country
        })
      }}
      value={this.state.Country}
      >

      </TextInput>
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        this.updateDetails()
      }}
      >
        <Text>Update</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
      flex: 1,
      marginTop:50,
      backgroundColor:'white',
  },
  personalInfo:{
      width:300,
      height:40,
      borderWidth:1.5,
      fontSize:20,
      margin:10,
      paddingLeft:10,
      alignSelf:"center",
      justifyContent: "center",
      borderColor:"#FF7F50",
      borderRadius: 500,
      marginTop: 15

  },
  button:{
      fontSize:30,
      textAlign:"center",
      marginBottom:50,
      alignSelf:"center",
      backgroundColor:'#c54245',
      height:60,
      width:120,
      paddingTop:13,
      borderWidth:3,
      borderRadius:1,
      justifyContent:"center",
      borderRadius: 10
  },

  title:{
      fontSize: 40,
      textAlign:'center',
      alignSelf: 'center',
      color:"#D2B48C"
  }
})