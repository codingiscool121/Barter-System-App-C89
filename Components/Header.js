import React from 'react';
import {View} from 'react-native'
import {Header, Icon, Badge} from 'react-native-elements';
import db from '../config'
import firebase from 'firebase'


export default class MyHeader extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:""
        }
    }
    componentDidMount(){
        this.getnotificationnumber()
    }
    getnotificationnumber(){
        db.collection('allNotifications').where('NotificationStatus', '==', 'Unread')
        .onSnapshot(snapshot=>{
            var unreadnotification = snapshot.docs.map(doc=>doc.data)
            console.log("Notification" + unreadnotification)
            this.setState({
                value:unreadnotification.length
            })
        })
    }

    BellIconWithBadge=()=>{
        return(
            <View>
                <Icon
                name='bell'
                type='font-awesome'
                color="#d24e4b"
                size={30}
                onPress={()=>{
                    this.props.navigation.navigate('Notifications')
                }}
                />
                <Badge
                value={this.state.value}
                containerStyle={{position:"absolute", top: -4, right: -4}}
                />
            </View>
        )
    }
    render(){
        return(
            <Header
            leftComponent={
                <Icon
                name='bars'
                type='font-awesome'
                color='#1a86ba'
                onPress={()=>{
                  this.props.navigation.toggleDrawer()
                }}
                >
                </Icon>}
                 centerComponent={{text:this.props.title, style:{color:"black", fontSize: 30, fontWeight:"bold"}}}
                 rightComponent={<this.BellIconWithBadge {...this.props}/>}
                 backgroundColor="#5bcaff"
                 >             
            </Header>
        )
    }
}

