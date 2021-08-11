import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import bg from '../dashboard.jpg'
import db from '../config'
import Slider from '@react-native-community/slider';

export default class RaisingQuery extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      counselorName:this.props.navigation.getParam("counselorName"),
      counselorComments:"",
      counselorEmail:this.props.navigation.getParam("counselorEmail"),
      issue:"",
      studentContactInfo:"",
      contactInfo:"",
      urgency:"",
      additionalInfo:"",
      status:"Pending",
      userEmail: firebase.auth().currentUser.email,
    };
  }

request = () => {
        db.collection("requestsForCounselors").add({
          issue:this.state.issue,
          urgency:this.state.urgency,
          additionalInfo:this.state.additionalInfo,
          counselorName:this.state.counselorName,
          counselorEmail:this.state.counselorEmail,
          userEmail:this.state.userEmail,
          counselorComments:this.state.counselorComments,
          studentContactInfo:this.state.studentContactInfo,
          contactInfo:this.state.contactInfo,
          status:this.state.status
        })

        this.props.navigation.navigate('Dashboard');
        alert("Requested!")
    
  };

getContactInfo = async () => {
     var response =  await db.collection("studentAccounts").where("email","==",this.state.userEmail).get()
     response.docs.map((doc)=>{ 
       this.setState({studentContactInfo:doc.data().contactNo})
     })
     var response2 =  await db.collection("counselorAccounts").where("email","==",this.state.counselorEmail).get()
     response2.docs.map((doc)=>{ 
       this.setState({contactInfo:doc.data().contactNo})
     })
  };

componentDidMount=()=>{
this.getContactInfo()
}



  render() {
    return (
    <View style={{flex:1}}>

  <ImageBackground source={bg} style={{flex:1}}>

  <ScrollView>
    <View style={{backgroundColor:"#ffa576",borderBottomLeftRadius:90,borderBottomRightRadius:90, height:100}}>
    <Text style={{fontWeight:'bold',fontSize:20,marginTop:50,fontFamily:"Times New Roman",textAlign:'center',color:'brown'}}>Request Counselor</Text>
    </View>


<View>
    <Text style={{fontWeight:'bold',fontSize:17,marginTop:40,fontFamily:"Times New Roman", paddingLeft:48,color:'brown'}}> Counselor </Text>
    </View>

         <Text  style={{ borderWidth: 1,
            borderRadius: 10,
            width: '70%',
            alignSelf: 'center',
            height: 30,
            borderColor: '#ffccb9',
            borderBottomColor:"black",
              marginTop:5,}}>
         {this.state.counselorName}
          </Text>
 

    <View>
    <Text style={{fontWeight:'bold',fontSize:17,marginTop:40,fontFamily:"Times New Roman", paddingLeft:48,color:'brown'}}> Issue </Text>
    </View>

        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: '70%',
            alignSelf: 'center',
            height: 30,
            borderColor: '#ffccb9',
            borderBottomColor:"black",
              marginTop:5,
          }}
          placeholder="Your issue"
          placeholderTextColor="black"
          value={this.state.issue}
          onChangeText={(val)=>{
            this.setState({issue:val})
          }}
        />

 
<View>
    <Text style={{fontWeight:'bold',fontSize:17,marginTop:40,fontFamily:"Times New Roman", paddingLeft:48,color:'brown'}}> Urgency - Out of 5</Text>
    </View>

        <Slider
    style={{width: "70%", height: 40, alignSelf:'center'}}
    minimumValue={1}
    maximumValue={5}
    step={1}
    thumbTintColor="#ffa585"
    minimumTrackTintColor="#ffdfc9"
    maximumTrackTintColor="#ffdfc9"
    onValueChange={(val)=>{
this.setState({urgency:val})
    }}
  />
   <Text style={{textAlign:'center'}}>Urgency: {this.state.urgency}</Text>

 
 <View>
    <Text style={{fontWeight:'bold',fontSize:17,marginTop:40,fontFamily:"Times New Roman", paddingLeft:48,color:'brown'}}> Additional Info </Text>
    </View>

        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: '70%',
            alignSelf: 'center',
            height: 100,
            borderColor: '#ffccb9',
            borderBottomColor:"black",
              marginTop:5,
          }}
          placeholder="Info (Optional)"
          placeholderTextColor="black"
          multiline={true}
          value={this.state.additionalInfo}
          onChangeText={(val)=>{
            this.setState({additionalInfo:val})
          }}
        />


 <TouchableOpacity onPress={this.request}>
<View style={styles.button}>
          <Text style={{ fontFamily: 'Times New Roman',
    fontSize: 15,
  textAlign:'center',
  marginTop:5}}>Request</Text>
</View>
</TouchableOpacity>


 <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Dashboard")
          }}>
<View style={{ width: '30%',
    height: 30,
    marginLeft:'34%',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor:'black',}}>
          <Text style={{  fontFamily: 'Times New Roman',
  fontSize: 15,
  textAlign:'center',
  marginTop:5}}>Back</Text>
</View>
 </TouchableOpacity>

</ScrollView>
</ImageBackground>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
   width: '60%',
    height: 30,
    marginLeft:'20%',
    borderRadius: 10,
    marginTop: 35,
    borderWidth: 1,
    borderColor:'black',
  
  },

});
