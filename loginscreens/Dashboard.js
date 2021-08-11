import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import firebase from "firebase";
import { Card } from "react-native-paper";
import axios from "axios";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import cards from "../cards.jpg";
import header from "../assets/header.png";
import bg from "../dashboard.jpg";
import db from "../config";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      allProfiles: [],
      quote: "",
    };
  }

  getProfiles = async () => {
    this.setState({ allProfiles: [] });
    var response = await db.collection("counselorAccounts").get();
    response.docs.map((doc) => {
      var temp = this.state.allProfiles;
      temp.push(doc.data());
      this.setState({ allProfiles: temp });
    });
  };

  componentDidMount = () => {
    this.getProfiles();
    this.apicall2();
  };

  apicall2 = () => {
    const options = {
      method: "POST",
      url: "https://motivational-quotes1.p.rapidapi.com/motivation",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "e6f9c14a7emsh0dc5298b5f08110p171692jsnc10c2307671b",
        "x-rapidapi-host": "motivational-quotes1.p.rapidapi.com",
      },
      data: { key1: "value", key2: "value" },
    };

    axios
      .request(options)
      .then((response) => {
        this.setState({ quote: response.data });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={bg} style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: "#fedfc9",
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                height: 140,
              }}
            >
              <Text style={styles.welcomeText}> Hello! </Text>
            </View>

            <Text
              style={{
                fontFamily: "Times New Roman",
                color: "brown",
                textAlign: "center",
                fontSize: 19,
                marginTop: 70,
                fontWeight: "bold",
              }}
            >
              Our Quote
            </Text>
            <Text
              style={{
                fontFamily: "Times New Roman",
                color: "brown",
                textAlign: "center",
                fontSize: 19,
              }}
            >
              {this.state.quote
                ? this.state.quote
                : "Believe you can and you're already there. - Theodore Roosevelt"}
            </Text>

            <View style={{ marginTop: 110 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  fontFamily: "Times New Roman",
                  color: "brown",
                  textAlign: "center",
                }}
              >
                {" "}
                Need Help?{" "}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  fontFamily: "Times New Roman",
                  color: "brown",
                  textAlign: "center",
                }}
              >
                {" "}
                Request Counselors to Talk to{" "}
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {this.state.allProfiles.map((item, index) => {
                return (
                  <View key={index.toString()}>
                    <Card
                      style={{
                        width: 270,
                        height: 170,
                        borderRadius: 20,
                        elevation: 10,
                        marginTop: 25,
                        backgroundColor: "#ffCba4",
                        marginLeft: 5,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate("RaisingQuery", {
                            counselorEmail: item.email,
                            counselorName: item.name,
                          });
                        }}
                      >
                        <Entypo
                          name="plus"
                          size={24}
                          color="black"
                          style={{ marginLeft: 240, marginTop: 10 }}
                        />
                      </TouchableOpacity>

                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 10,
                        }}
                      >
                        <View>
                          <Avatar
                            rounded
                            size="medium"
                            source={{
                              uri: item.image,
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: 15,
                              marginTop: 10,
                              paddingLeft: 10,
                              fontFamily: "Times New Roman",
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          paddingTop: 15,
                          fontFamily: "Times New Roman",
                          paddingLeft: 15,
                        }}
                      >
                        {item.bio}
                      </Text>
                    </Card>
                  </View>
                );
              })}
            </ScrollView>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeText: {
    fontWeight: "bold",
    fontSize: 35,
    color: "brown",
    fontFamily: "Times New Roman",
    marginTop: 50,
  },
});
