import React,{Component} from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Linking,
  Image,
  Platform,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { Card } from 'react-native-paper';
import { AntDesign,Entypo } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import ParticlesBg from 'particles-bg'
import image1 from '../assets/image.jpg'
import * as Animatable from 'react-native-animatable'
import bg from '../dashboard.jpg'
import call from 'react-native-phone-call'

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counselorName:"",
      counselorComments:"",
      issue:"",
      contactInfo:"",
      urgency:"",
      additionalInfo:"",
      userEmail: "",
      email:firebase.auth().currentUser.email,
      docId:"",
    };
  }

  
  getProfile= async()=>{
    var id = this.props.navigation.getParam("docId");
    // console.log(id)
    var temp = await db.collection("requestsForCounselors").doc(id).get();
    console.log(temp.data())
  var obj = temp.data()
      this.setState({
        counselorName:obj.counselorName,
        contactInfo:obj.contactInfo,
        counselorComments:obj.counselorComments,
        userEmail:obj.userEmail,
        issue:obj.issue,
        urgency:obj.urgency,
        additionalInfo:obj.additionalInfo,
      })
    
  }
 


  componentDidMount=()=>{
    this.getProfile()
  }


  render() {
    return (

      <View style={{flex:1, }}>

        <ImageBackground source={bg} style={{flex:1}}>
 <ScrollView>
 <View style={{backgroundColor:"#ffa576",borderBottomLeftRadius:90,borderBottomRightRadius:90, height:100}}>
    <Text style={{fontWeight:'bold',fontSize:20,marginTop:50,fontFamily:"Times New Roman",textAlign:'center',color:'brown'}}> Pending Request Details</Text>
    </View>

    
      
<ScrollView>



<View> 

<Text style={{fontWeight:'bold',fontSize:15,marginTop:40,fontFamily:"Times New Roman", paddingLeft:54,color:'brown'}}>
          Counselor
        </Text>

        <View style={styles.textInput}>

         <Text>
         {this.state.counselorName}
          </Text>
        </View>

  <Text style={{fontWeight:'bold',fontSize:15,marginTop:40,fontFamily:"Times New Roman", paddingLeft:55,color:'brown'}}>
          Issue
        </Text>

        <View style={styles.textInput}>
 <Text>
         {this.state.issue}
          </Text>
        </View>
        

<Text style={{fontWeight:'bold',fontSize:15,marginTop:40,fontFamily:"Times New Roman", paddingLeft:55,color:'brown'}}>
          Urgency - Out of 5
        </Text>

        <View style={styles.textInput}>
     
        <Text  style={{paddingLeft:10,  color:'black', fontFamily:"Times New Roman",}}>
         {this.state.urgency}
          </Text>
        
 </View>

        <Text style={{fontWeight:'bold',fontSize:15,marginTop:40,fontFamily:"Times New Roman", paddingLeft:55,color:'brown'}}>
          Additional Info
        </Text>

         <View style={styles.addInfo}>
        
         <Text>
         {this.state.additionalInfo}
          </Text>
 </View>

 


 <View style={{width:'100%',backgroundColor:'#eeeeee', height:2, marginTop:25}}></View>

  </View>
 

  <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Dashboard")
            
          }}>
        <View style={styles.button1}>
        <Text style={styles.buttonText1}>Back</Text>
        </View>
          
          </TouchableOpacity>

</ScrollView>
</ScrollView>
</ImageBackground>

      </View>
    );
  }
}
const styles = StyleSheet.create({

 textInput:{

            borderWidth: 1,
            borderRadius: 10,
            width: '70%',
            alignSelf: 'center',
            height: 30,
            borderColor: '#ffccb9',
            borderBottomColor:"black",
              marginTop:5,
        
  },

addInfo:{

            borderWidth: 1,
            borderRadius: 10,
            width: '70%',
            alignSelf: 'center',
            height: 100,
            borderColor: '#ffccb9',
            borderBottomColor:"black",
              marginTop:5,
        
  },


   

     button1: {
  width: '30%',
    height: 30,
    marginLeft:'34%',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor:'black',
  },
 
  buttonText1: {
  fontFamily: 'Times New Roman',
  fontSize: 13,
  textAlign:'center',
  marginTop:5
  },


});
