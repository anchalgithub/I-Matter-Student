import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { Card } from "react-native-paper";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import ParticlesBg from "particles-bg";
import bg2 from "../dashboard.jpg";
import * as Animatable from "react-native-animatable";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      parentsNo: "",
      parentEmail: "",
      contactNo: "",
      country: "",
      image: "",
      userId: firebase.auth().currentUser.email,
      email: firebase.auth().currentUser.email,
      id: "",
    };
  }

  getProfile = async () => {
    var email = firebase.auth().currentUser.email;
    var temp = await db
      .collection("studentAccounts")
      .where("email", "==", email)
      .get();
    temp.docs.map((doc) => {
      var obj = doc.data();
      this.setState({
        image: obj.image,
        name: obj.name,
        country: obj.country,
        contactNo: obj.contactNo,
        parentsNo: obj.parentsNo,
        parentEmail: obj.parentEmail,
        id: doc.id,
      });
    });
  };

  componentDidMount = () => {
    this.getProfile();
    this.fetchImage(this.state.userId);
  };

  onSubmit = () => {
    db.collection("studentAccounts").doc(this.state.id).update({
      name: this.state.name,
      country: this.state.country,
      image: this.state.image,
      contactNo: this.state.contactNo,
      parentsNo: this.state.parentsNo,
      parentEmail: this.state.parentEmail,
    });
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("student_accounts/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("student_accounts/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={bg2} style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100,
              }}
            >
              <TouchableOpacity onPress={this.selectPicture}>
                <Avatar
                  rounded
                  size={115}
                  backgroundColor="grey"
                  source={{
                    uri: this.state.image,
                  }}
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.footer}>
                <Animatable.View style={{ height: "50%" }}>
                  <View>
                    <Text style={{ fontWeight: "bold", paddingRight: 170 }}>
                      Name
                    </Text>

                    <View style={styles.textInput}>
                      <AntDesign name="user" size={23} color="#ffa585" />
                      <TextInput
                        style={{
                          paddingLeft: 10,
                          fontFamily: "Times New Roman",
                        }}
                        value={this.state.name}
                        placeholder="EX: Nina E. "
                        onChangeText={(val) => {
                          this.setState({ name: val });
                        }}
                      />
                    </View>

                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingRight: 155,
                        marginTop: 10,
                      }}
                    >
                      Your email
                    </Text>

                    <View style={styles.textInput}>
                      <AntDesign name="mail" size={23} color="#ffa585" />
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: "black",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {this.state.email}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingRight: 155,
                        marginTop: 10,
                      }}
                    >
                      Phone number
                    </Text>

                    <View style={styles.textInput}>
                      <Icon name="phone" size={23} color="#ffa585" />
                      <TextInput
                        style={{
                          paddingLeft: 10,
                          fontFamily: "Times New Roman",
                        }}
                        value={this.state.contactNo}
                        placeholder="+Country code and phone number "
                        keyboardType={"numeric"}
                        onChangeText={(val) => {
                          this.setState({ contactNo: val });
                        }}
                      />
                    </View>

                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingRight: 155,
                        marginTop: 10,
                      }}
                    >
                      Parent email
                    </Text>

                    <View style={styles.textInput}>
                      <Entypo name="mail" size={23} color="#ffa585" />
                      <TextInput
                        style={{
                          paddingLeft: 10,
                          fontFamily: "Times New Roman",
                        }}
                        value={this.state.parentEmail}
                        placeholder="Parent email"
                        onChangeText={(val) => {
                          this.setState({ parentEmail: val });
                        }}
                      />
                    </View>

                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingRight: 155,
                        marginTop: 10,
                      }}
                    >
                      Parent phone number
                    </Text>

                    <View style={styles.textInput}>
                      <Icon name="phone-call" size={23} color="#ffa585" />
                      <TextInput
                        style={{
                          paddingLeft: 10,
                          fontFamily: "Times New Roman",
                        }}
                        value={this.state.parentsNo}
                        keyboardType={"numeric"}
                        placeholder="+Country code and phone number"
                        onChangeText={(val) => {
                          this.setState({ parentsNo: val });
                        }}
                      />
                    </View>

                    <Text
                      style={{
                        fontWeight: "bold",
                        marginTop: 10,
                        paddingRight: 170,
                      }}
                    >
                      Country
                    </Text>

                    <View style={styles.textInput}>
                      <AntDesign name="enviromento" size={23} color="#ffa585" />
                      <TextInput
                        style={{
                          paddingLeft: 10,
                          fontFamily: "Times New Roman",
                        }}
                        value={this.state.country}
                        placeholder="EX: USA (Optional)"
                        onChangeText={(val) => {
                          this.setState({ country: val });
                        }}
                      />
                    </View>

                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#eeeeee",
                        height: 2,
                        marginTop: 10,
                      }}
                    ></View>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.onSubmit}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        firebase.auth().signOut();
                        this.props.navigation.navigate("LoginScreen");
                      }}
                    >
                      <View style={styles.button1}>
                        <Text style={styles.buttonText1}>Sign Out</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              </View>
            </ScrollView>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "white",
    width: "100%",
    height: 40,
    flexDirection: "row",
    marginLeft: 1,
    paddingBottom: 15,
    marginTop: 10,
  },

  button: {
    width: "60%",
    height: 30,
    marginLeft: "20%",
    borderRadius: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonText: {
    fontFamily: "Times New Roman",
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
  },

  footer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 50,
    paddingHorizontal: 30,
    width: "100%",
  },

  button1: {
    width: "30%",
    height: 30,
    marginLeft: "34%",
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonText1: {
    fontFamily: "Times New Roman",
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
  },
});
