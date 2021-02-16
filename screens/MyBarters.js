import React from 'react'
import {View,Text, StyleSheet, FlatList} from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import {Card} from 'react-native-elements';
import {ListItem} from 'react-native-elements';


export default class MyBarters extends React.Component{
    constructor(props){
        super(props)
        this.state={
            UserId: firebase.auth().currentUser.email,
            Username: "",
            DonorName:"",
            ItemsGive:[]
        }
        this.requestRef= null
    }
    
    getUserDetails=()=>{
        db.collection('users').where('UserId', '==', this.state.UserId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    Username:doc.data().Username
                })
            })
        })
    }

    getItemsGive=()=>{
    this.requestRef= db.collection('ItemsGive').where('ReceiverId', '==', this.state.UserId)
    .onSnapshot(snapshot=>{
        var ItemsGive = []
        snapshot.docs.map(doc=>{
            var give = doc.data()
            give["docId"]= doc.id
            ItemsGive.push(give)
        })
        this.setState({
            ItemsGive:ItemsGive
        })
        console.log(this.state.ItemsGive)
    })
    }

    keyExtractor = (item,index)=>index.toString()

    sendItem=(ItemDetails)=>{
    if(ItemDetails.RequestStatus){
        var RequestStatus = "Item Sent"
        db.collection("ItemsGive").doc(ItemDetails.docId).update({
            RequestStatus:RequestStatus
        })
    }else{
        var RequestStatus = "Interested Giver"
        db.collection("ItemsGive").doc(ItemDetails.docId).update({
            RequestStatus:RequestStatus
        })
        this.sendNotification(ItemDetails,RequestStatus)
    }
    }


    sendNotification=(ItemDetails, RequestStatus)=>{
    var RequestId = ItemDetails.RequestId
    var UserId = ItemDetails.UserId
    db.collection('allNotifications').where('RequestId', '==', RequestId).where('UserId', '==', UserId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            var message = ""
            if(RequestStatus==="Item Sent"){
                message = this.state.DonorName + "has sent you your item."
            }else{
                message= this.state.DonorName + "is interested in giving you your item."
            }
            db.collection('allNotifications').doc(doc.id).update({
                message: "",
                NotificationStatus: "Unread",
                Date: firebase.firestore.FieldValue.serverTimestamp()
            })
        })
    })
    }
    render(){
        return(
    <View style={{flex:1}}>
    {
        this.state.ItemsGive.length===0
        ?(
        <Text>{"You have not donated any items, " + this.state.UserId}</Text>
        ):(
        <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.ItemsGive}
        renderItem={this.renderItem} 
        >
    
        </FlatList>
        )
    }
    </View>
            )
    }
    componentDidMount(){
        this.getItemsGive()
        this.getUserDetails()
    }

    componentWillUnmount(){
        this.requestRef()
    }

    renderItem=({item,i})=>{
    console.log(item)
    return(
    <ListItem
    style={styles.boxstyle}
    key={i}
    title={item.ItemName}
    subtitle= {"Receiver Name: " + item.ReceiverId}
    subtitleStyle = {{fontWeight:'bold'}}
    titleStyle={{color:"turquoise"}}
    rightElement={
        <TouchableOpacity
        style={{width:30, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius:10,}}
        onPress={()=>{
            this.sendItem(item)
        }}>
        <Text style={{color:"blue"}}>
            {
                item.RequestStatus === "Item Sent"
                ?(
                    <Text>Item Sent</Text>
                ):(
                    <Text>Send Item</Text>
                )
            }
        </Text>
        </TouchableOpacity>
    }
    bottomDivider
    >
    </ListItem>
    )
    }
}




const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    boxstyle: {
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