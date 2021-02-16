import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import Header from '../Components/Header'
import {isMobile} from 'react-device-detect';
import {Input,Icon} from 'react-native-elements'
export default class Exchange extends React.Component{
constructor(props){
    super(props);
    this.state={
        UserId: firebase.auth().currentUser.email,
        ItemName:"",
        Description: "",
        IsExchangeRequestActive: "",
        docId: "",
        ItemValue: "",
        currencyCode: "",
        ItemStatus: ""
    }
}

createUniqueId(){
    return(
        Math.random().toString(12).substring(7)
    )
}

getData(){
    fetch("http://data.fixer.io/api/latest?access_key=1f7dd48123a05ae588283b5e13fae944&format=1")
    .then(response=>{
      return response.json();
    }).then(responseData =>{
      var currencyCode = this.state.currencyCode
      var currency = responseData.rates.INR
      var value =  69 / currency
      console.log(value);
    })
    }
  

updateItemRequestStatus = ()=>{
    db.collection('Barter_Items').doc(this.state.docId).update({
        ItemStatus: "Received",
    })
    db.collection('users').where('UserId', '==', this.state.UserId).get()
    .then(
        snapshot =>{
                snapshot.forEach((doc=>{
                // console.log(IsExchangeRequestActive)
                    db.collection('users').doc(doc.id).update({
                        IsExchangeRequestActive: false,
                    })
                })) 
        }
    )
    this.setState({
        IsExchangeRequestActive: false
    
    })
}


getIsExchangeRequestActive =()=>{
    db.collection('users')
    .where('UserId', '==', this.state.UserId)
    .onSnapshot(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                IsExchangeRequestActive: doc.data().IsExchangeRequestActive,
                docId : doc.id,
                currencyCode: doc.data().currencyCode
            })
         })
    })
}
componentDidMount(){
    this.getIsExchangeRequestActive()
        this.getExchangeRequest()
    this.getData()
}
getExchangeRequest=()=>{
    db.collection('Barter_Items').where("UserId", '==', this.state.UserId).get()
    .then(
        snapshot=>{
            snapshot.forEach(doc=>{
                if(doc.data().ItemStatus !== 'Received'){
                this.setState({
                    RequestId: doc.data().RequestId,
                    ItemName: doc.data().ItemName,
                    ItemStatus: doc.data().ItemStatus,
                    ItemValue: doc.data().ItemValue,
                    docId: doc.id
                })
                }
            })
        }
    )
}
storeItem(ItemName, Description){
var userid = this.state.UserId;
var requestId = this.createUniqueId();
db.collection('Barter_Items').add({
    UserId: userid,
    ItemName: ItemName,
    Description: Description,
    RequestId: requestId,
    ItemStatus: "Requested",
    ItemValue: this.state.ItemValue
})
this.getExchangeRequest()
db.collection('users').where('UserId', '==' , this.state.UserId).get()
.then(
    snapshot=>{
        snapshot.forEach(doc=>{
            db.collection('users').doc(doc.id).update({
                IsExchangeRequestActive: true,
            })
        })
    }
)
this.setState({
    ItemName:"",
    Description: "",
    ItemValue: ""
});
return alert(
    ItemName + "  has successfully been requested, and we will try to get it to you, " + firebase.auth().currentUser.email + "as soon as possible."
    // [
    //     {text:'Thanks', onPress:()=>{
    //         this.props.navigation.navigate('Drawer');
    //     }}
    // ]
)
}
render(){
    if(this.state.IsExchangeRequestActive === false){
        console.log(this.state.IsExchangeRequestActive)
        return(
            <View style={{flex:1}}>
            <Header title="Request An Item"></Header>
                <KeyboardAvoidingView>
                <Input placeholder="Please enter a item name."
                    leftIcon={
                        <Icon
                          name='rename-box'
                          type="material-community"
                          size={24}
                          color="#003366"
                        />
                      }
                onChangeText={text=>{
                    this.setState({
                        ItemName: text
                    })
                }}
                value={this.state.ItemName}
                // style={styles.inputBox}
                ></Input>
                {
                    this.state.showFlatlist
                    ?(
                 <FlatList
                 data = {
                    this.state.dataSource
                 }
                renderItem={
                    this.renderItem()
                }
                enableEmptySections={true}
                style={{marginTop:10}}
                keyExtractor={(item,index)=>index.toString()}
                 />
                     )
                     :
                     (
                <View>
               <Input placeholder={"Insert a link to the product here."}
            //    multiline={true}
            leftIcon={
                <Icon
                  name='link'
                  type="antdesign"
                  size={24}
                  color="#0645AD"
                />
              }
               numberOfLines={2}
                onChangeText={text=>{
                    this.setState({
                        Reason: text
                    })
                }}
                value={this.state.Reason}
                style={[,{
                    height:10,
                }]}
                ></Input>
                  <Input
                         leftIcon={
                        <Icon
                         name="money-check"
                          type="font-awesome-5"
                           size={24}
                          color="#5ca49c"
                        />
                      }
            // style={styles.inputBox}
            placeholder ={"Item Value"}
            maxLength ={10}
            onChangeText={(text)=>{
              this.setState({
                ItemValue: text
              })
            }}
            value={this.state.ItemValue}
          />
                <TouchableOpacity style={styles.button} 
                onPress={()=>{
                    this.storeItem(this.state.ItemName,this.state.Reason)

                }}
                >
                    <Text>Send</Text>
                
                </TouchableOpacity>
                </View>
               )}
                </KeyboardAvoidingView>
            </View>
       )}
       else{
        return(
            <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
                Item Name:
            </Text>
            <Text style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
                {this.state.ItemName} 
            </Text>
            <Text  style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
                Item Status: 
            </Text>
            <Text  style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
                {this.state.ItemStatus}
            </Text>
            <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
         <Text> Item Value </Text>

         <Text style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>{this.state.ItemValue}</Text>
         </View>
            <TouchableOpacity
             style={styles.button}
             onPress={()=>{
                 this.updateItemRequestStatus()
             }}
            >
               <Text>Item Received.</Text> 
            </TouchableOpacity>
            
            </View>

        )
    }
}
}

const styles= StyleSheet.create({
    // keyboardstyle:{
    //     flex:1,
    //     alignItems:'center',
    //     justifyContent: ' center'
    // },
    inputBox:{
        width:'100%',
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    button:{
        width:'100%',
        height: 20,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 1,
        backgroundColor: "#4fa9d8",
        marginTop: 30,
        shadowColor: "black",
        shadowOpacity: 0.53,
        // shadowOffset:{width:23, height: 34}
    }
})
