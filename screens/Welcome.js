import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { render } from 'react-dom';
import {Input,Icon} from 'react-native-elements'
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emailId:"",
            password:"",
            ismodalvisible: false,
            Address: "",
            PhoneNumber: "",
            UserId: "",
            Username: "",
            confirmPassword: "",
            currencyCode:""
        }
    }

//showModal Function
showModal=()=>{
return(
<Modal animationType="cube"
transparent= {false}
visible={this.state.ismodalvisible}>
<View style={{marginTop:80}}>
    <ScrollView>
        <KeyboardAvoidingView>
            <Text style={styles.title}>Sign Up For Easy Barter</Text>
            <Input placeholder="Username" 
               leftIcon={
                <Icon
                  name='user'
                  type="antdesign"
                  size={24}
                  color='#ff7f50'
                />
              }
            onChangeText={user=>{
            this.setState({
                Username: user,
            })
            }}
            />
            <Input placeholder="Email(example@domain.com)"
                  leftIcon={
                    <Icon
                      name='email'
                      size={24}
                      color='#ff7f50'
                    />
                  }
            keyboardType={"email-address"}
            onChangeText={email=>{
                this.setState({
                    UserId:email
                })
            }}            
            ></Input>
            <Input  placeholder="Preferred Password"
               leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color="#800080"
                />
              }
            secureTextEntry={true}
            onChangeText={password=>{
                this.setState({
                    password:password
                })
            }}            
            ></Input>
                <Input placeholder="Confirm Password"
                   leftIcon={
                    <Icon
                      name='lock'
                      size={24}
                      color="#800080"
                    />
                  }
            secureTextEntry={true}
            onChangeText={confirm=>{
                this.setState({
                    confirmPassword:confirm
                })
            }}            
            ></Input>
            <Input  placeholder="Address"
               leftIcon={
                <Icon
                  name='home'
                  size={24}
                  color="#964B00"
                />
              }
            maxLength={100}
            multiline={true}
            onChangeText={address=>{
                this.setState({
                    Address:address
                })
            }}            
            ></Input>
             <Input placeholder="Currency Code" 
                leftIcon={
                    <Icon
                      name='code'
                      size={24}
                      color="black"
                    />
                  }
      onChangeText={text=>{
          this.setState({
              currencyCode:text
          })
      }}
      />
            <Input  placeholder="Phone Number"
                 leftIcon={
                    <Icon
                      name='phone'
                      size={24}
                      color="black"
                    />
                  }
            maxLength={10}
            keyboardType={"numeric"}
            keyboardType={"number-pad"}
            onChangeText={phonenumber=>{
                this.setState({
                    PhoneNumber:phonenumber
                })
            }}            
            ></Input>
            <TouchableOpacity style={styles.text} onPress={()=>{
                this.userSignUp(
                    this.state.UserId,
                    this.state.password,
                    this.state.confirmPassword,
                )
            }}>
   
            <Text>Register</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.text} onPress={()=>{
            this.setState({
                ismodalvisible:false
            })
            }}>
            <Text>Cancel</Text> 
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </ScrollView>
</View>
</Modal>
)
}



userSignUp=(email,password,confirmPassword)=>{
if(password!==confirmPassword){
return(
    alert("Your password's doesn't match," + this.state.Username)
)
}else{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(response=>{
        return(
         alert("Your account has been created successfully, " ,this.state.Username, [{text:"Go Back To Login", onPress:()=>{
               this.setState({
                   ismodalvisible:false
               })
           }}])
        )
    }).catch(function(error){
        return(
            alert("We have encountered an error. Here is what it is: " + error.message + ". If this error is in human language, then please try fixing it first. If it still doesn't work, contact codersaregreat119@gmail.com.")
        )
    })
    db.collection('users').add({
        Address: this.state.Address,
        PhoneNumber: this.state.PhoneNumber,
        UserId: this.state.UserId,
        Username: this.state.Username,
        confirmPassword: this.state.confirmPassword,
        currencyCode: this.state.currencyCode
    })
}
}

//creating text inputs for login and signup
login=(emailId,password)=>{
    // console.log(emailId);

firebase.auth().signInWithEmailAndPassword(emailId,password).then(()=>{
    return(
    this.props.navigation.navigate('Drawer')        
    )
}).catch(error=>{
    switch(error.code){
        case 'auth/user-not-found':
            alert("It appears that you don't have an account with EasyBarter "+ emailId +". Instead of clicking the Login button, please click the sign up button first. 🧾");
            console.log(error.message)
        break;
        case 'auth/invalid-email':
            alert("Your email is invalid. You should format it to be something like example@domain.com.");
            console.log(error.message)
            break;
        case 'auth/wrong-password':
            alert("Your password is invalid, "+ emailId + "! Please enter the correct password to continue.");
            console.log(error.message)
            break;
        
    }})
}
signup=(emailId,password)=>{
    // console.log(emailId);
    firebase.auth().createUserWithEmailAndPassword(emailId,password).then((response)=>{
        return(
            this.props.navigation.navigate('Drawer')
            (
           Alert. alert("You have been successfully signed up.")
            ) )
    }).catch(error=>{
        // alert("We could not sign you up, and here is the error we got when we tried: "+ error.message + " Please try to fix this error, and then try again.");
    })
    }

render(){
    return(
        <View marginTop={200}>
        <View>
        {this.showModal()}
        </View>
        <Text style={styles.title}> Login To Easy Barter</Text>
        <Input placeholder="Email(example@domain.com)"  
        leftIcon={
            <Icon
              name='email'
              size={24}
              color='#ff7f50'
            />
          }
        
        keyboardType='email-address'
        onChangeText={text=>{
            this.setState({
                emailId:text
            })
        }}
        />
      <Input
        placeholder="Enter Your Password" 
        leftIcon={
            <Icon
              name='lock'
              size={24}
              color="#800080"
            />
          }
      secureTextEntry={true}
      onChangeText={text=>{
          this.setState({
              password:text
          })
      }}
      />
  
                 <TouchableOpacity onPress={()=>{
          this.login(
              this.state.emailId,this.state.password
          )
      }} style={styles.text}>
        <Text>Login</Text>      
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        this.setState({ismodalvisible:true})
      }} style={styles.text}>
        <Text>Sign Up Here</Text>      
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
    loginBox:{
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
  
    },
    text:{
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





    



