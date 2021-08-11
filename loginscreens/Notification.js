import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text,Image, ImageBackground } from 'react-native';
import { ListItem } from 'react-native-elements';
import bg2 from '../dashboard.jpg'
import SwipeableFlatlist from '../components/SwipeableFlatlist';
import db from '../config';
import firebase from 'firebase';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

export default class Updates extends Component{
  constructor(props) {
    super(props)

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : []
    }

    this.notificationRef = null;
  }

 
  getNotifications = () => {
    this.notificationRef = db.collection("all_notifications")
      .where("notification_status", "==", "unread")
      .where("targeted_user_id", "==", this.state.userId)
      .onSnapshot(snapshot => {
        var allNotifications = [];
        snapshot.docs.map(doc => {
          var notification = doc.data();
          notification["doc_id"] = doc.id;
          allNotifications.push(notification);
        });
        this.setState({
          allNotifications: allNotifications
        });
      });
  }

  componentDidMount(){
    this.getNotifications();
  }


  componentWillUnmount() {
    this.notificationRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item,index}) =>{
      return (
        <ListItem
          key={index}
          leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
          title={item.book_name}
          titleStyle={styles.LiTitle}
          subtitle={item.message}
          bottomDivider
        />
      )
 }


  render(){
    return(
      <View style={styles.container}>
         <ImageBackground source={bg2} style={{flex:1}}>
        <View style={{flex:0.8}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={styles.imageView}>
             
               <Entypo name="bell" size={50} style={{justifyContent:'center'}}/>
               <Text style={{fontSize:25}}>Updates feature</Text>
                <Text style={{fontSize:25}}>coming soon!</Text>
              </View>
            )
            :(
              <SwipeableFlatlist allNotifications={this.state.allNotifications}/>
            )
          }
         
        
        </View>
          </ImageBackground>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor:'#deeeed'
  },
  imageView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  LiTitle:{
    color: 'black',
    fontWeight: 'bold'
  }
})