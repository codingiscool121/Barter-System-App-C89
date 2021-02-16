import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import firebase from 'firebase';
import db from '../config'
import {Card} from 'react-native-elements';

export default class Receiver extends React.Component{
    constructor(props){
        super(props)
        this.state={
            UserId: firebase.auth().currentUser.email,
            ReceiverId: this.props.navigation.getParam('details')["UserId"],
            ItemName: this.props.navigation.getParam('details')["ItemName"],
            Description: this.props.navigation.getParam('details')["Description"],
            RequestId: this.props.navigation.getParam('details')["RequestId"],
            ReceiverName:"",
            ReceiverPhoneNumber:"",
            ReceiverAddress:"",
            RequestDocId: "",
        }
    }

    getReceiverDetails=()=>{
        db.collection('users').where('UserId', '==', this.state.ReceiverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                ReceiverName: doc.data().Username,
                ReceiverPhoneNumber: doc.data().PhoneNumber,
                ReceiverAddress: doc.data().Address,
                })
            })
        })
        db.collection('Barter_Items').where('RequestId', '==', this.state.RequestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    RequestDocId: doc.id
                })
            })
        })
    }

componentDidMount(){
    this.getReceiverDetails()
}

//adds a notification to the database
addNotification=()=>{
    var message= this.state.UserId + "  is interested in giving you " + this.state.ItemName + ". Please contact them at their email address for more information."
    db.collection('allNotifications').add({
    ReceiverId: this.state.ReceiverId,
    ItemName: this.state.ItemName,
    RequestId: this.state.RequestId,
    Date: firebase.firestore.FieldValue.serverTimestamp(),
    NotificationStatus: "Unread",
    message:message
    })
}

updateNotification=()=>{
    db.collection('ItemsGive').add({
        ReceiverId:this.state.ReceiverId,
        ItemName: this.state.ItemName,
        RequestId: this.state.RequestId,
        Date: firebase.firestore.FieldValue.serverTimestamp(),
        RequestStatus: "There is somebody who would like to give you this item."
    })
}



render(){
    return(
        <View style={{flex:1, marginTop: 80}}>
        <View style={{flex:0.3}}>
      <Card>
        <Card
        title={"Item Information:"}
        titleStyle={{fontSize:24.531}}
        >    
        </Card>
      <Card>
            <Text>
                Item Name: {this.state.ItemName}
            </Text>
        </Card>
        <Card>
            <Text>
                Receiver Name: {this.state.ReceiverName}
            </Text>
        </Card>
        <Card>
            <Text>
                Description: {this.state.Description}
            </Text>
        </Card>
        <Card>
            <Text>
                Phone Number: {this.state.ReceiverPhoneNumber}
            </Text>
        </Card>
        <Card>
            <Text>
                Address: {this.state.ReceiverAddress}
            </Text>
        </Card>
        </Card>
        </View>
            <TouchableOpacity
            style={styles.text}
            onPress={()=>{
                this.props.navigation.navigate('Home')
            }}
            >
                <Text>Back To All Requests</Text>
            </TouchableOpacity>

            <View>
            {
                this.state.ReceiverId != this.state.UserId
                ?(
                    <TouchableOpacity
                    onPress={()=>{
                        console.log("running")
                        this.addNotification()
                        this.updateNotification()
                        this.props.navigation.navigate('MyBarters')
                    }}
                    >
                    <Text>Donate/Exchange</Text>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity
                    // navigation={this.props.navigation}
                    onPress={()=>{
                        db.collection('Barter_Items').doc(this.state.RequestDocId).delete()
                        .then(function(){
                            alert("Your request for this item has been deleted. Click 'Back To All Requests' to go back Home.")
                            // this.props.navigation.navigate('Notifications')
                        })
                    }}
                    >
                        <Text>Delete This Request</Text>
                    </TouchableOpacity>
                )
            }
                
            </View>
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
        justifyContent: 'center',
        borderColor:"#00873E"
    },
    text:{
        fontSize:30,
        textAlign:"center",
        marginBottom:50,
        alignSelf:"center",
        backgroundColor:'#7784ea',
        height:60,
        width:120,
        paddingTop:13,
        borderWidth:3,
        borderRadius:1,
        justifyContent:"center",
        marginTop: 525,
    },

    title:{
        fontSize: 40,
        textAlign:'center',
        alignSelf: 'center',
        color:"#00873E"
    }
})
