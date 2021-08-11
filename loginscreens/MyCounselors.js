import React, { Component } from "react";
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
import { Avatar } from "react-native-elements";
import Icon from "@expo/vector-icons/Feather";
import bg from "../dashboard.jpg";
import * as Animatable from "react-native-animatable";
import db from "../config";

export default class MyCounselors extends React.Component {
  constructor() {
    super();
    this.state = {
      pendingRequests: [],
      answeredRequests: [],
      counselorName: "",
      status: "Answered",
      issue: "",
      urgency: "",
      additionalInfo: "",
      currentUser: firebase.auth().currentUser.email,
    };
  }

  getPendingRequests = async () => {
    var response = await db
      .collection("requestsForCounselors")
      .where("userEmail", "==", this.state.currentUser)
      .get();
    response.docs.map((doc) => {
      console.log(doc.data());
      if (doc.data().status === "Pending") {
        var temp = this.state.pendingRequests;
        var t = doc.data();
        t["id"] = doc.id;
        temp.push(t);
        this.setState({ pendingRequests: temp });
      } else if (doc.data().status === "Answered") {
        var temp = this.state.answeredRequests;
        var t = doc.data();
        t["id"] = doc.id;
        temp.push(t);
        this.setState({ answeredRequests: temp });
      }
    });
  };

  // getAnsweredRequests = async () => {
  //     var response = await db.collection('requestsForCounselors').where('counselorEmail','==', this.state.currentUser).get();
  //     response.docs.map((doc) => {
  //       console.log(doc.data())
  //       var temp = this.state.answeredRequests;
  //       temp.push(doc.data());
  //       this.setState({ answeredRequests: temp });

  //     });

  //   };

  componentDidMount = () => {
    this.getPendingRequests();
    // this.getAnsweredRequests();
  };

  render() {
    // if (this.state.pendingRequests.length == 0) {
    //   return (
    //     <View style={{ width: '100%', height: '100%' }}>
    //       <ImageBackground source={bg} style={{ flex: 1 }}>
    //         <Text
    //           style={{
    //             fontWeight: 'bold',
    //             fontSize: 35,
    //             color: 'brown',
    //             fontFamily: 'Times New Roman',
    //             marginTop: 100,
    //           }}>
    //           {' '}
    //           Welcome!{' '}
    //         </Text>

    //         <View style={styles.footer}>
    //           <Animatable.View>
    //             <ScrollView>
    //               <ScrollView></ScrollView>

    //               <Text
    //                 style={{
    //                   color: 'brown',
    //                   fontSize: 18,
    //                   fontWeight: 'bold',
    //                   fontFamily: 'Times New Roman',
    //                 }}>
    //                 Pending requests
    //               </Text>

    //               <Text style={{ fontSize: 15 }}> No pending requests!</Text>

    //               <Text
    //                 style={{
    //                   color: 'brown',
    //                   fontSize: 18,
    //                   marginTop: 20,
    //                   fontWeight: 'bold',
    //                   fontFamily: 'Times New Roman',
    //                 }}>
    //                 Answered requests
    //               </Text>
    //             </ScrollView>
    //           </Animatable.View>
    //         </View>
    //       </ImageBackground>
    //     </View>
    //   );
    // } else {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <ImageBackground source={bg} style={{ flex: 1 }}>
          <ScrollView>
            <View
              style={{
                backgroundColor: "#fedfc9",
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                height: 100,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 25,
                  marginTop: 50,
                  fontFamily: "Times New Roman",
                  textAlign: "center",
                  color: "brown",
                }}
              >
                {" "}
                My Requests
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: "brown",
                  fontSize: 18,
                  marginTop: 100,
                  fontWeight: "bold",
                  paddingLeft: 5,
                  fontFamily: "Times New Roman",
                }}
              >
                Yet to be Answered
              </Text>

              {this.state.pendingRequests.length !== 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {this.state.pendingRequests.map((item, index) => {
                    return (
                      <View key={index.toString()}>
                        <Card
                          style={{
                            width: 270,
                            height: 130,
                            marginTop: 20,

                            marginLeft: 5,
                            backgroundColor: "#ffCba4",
                            borderRadius: 20,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate("RequestDetails", {
                                docId: item.id,
                              });
                            }}
                          >
                            <View style={{ marginLeft: 230, marginTop: 5 }}>
                              <Icon name="info" size={20} color="black" />
                            </View>
                          </TouchableOpacity>

                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 10,
                            }}
                          >
                            <View>
                              <View style={{ marginTop: 10 }}>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontFamily: "Times New Roman",
                                  }}
                                >
                                  Counselor: {item.counselorName}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontFamily: "Times New Roman",
                                    marginTop: 5,
                                  }}
                                >
                                  Issue: {item.issue}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </Card>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <Text
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: 13,
                    paddingLeft: 5,
                  }}
                >
                  No pending requests!
                </Text>
              )}
              <Text
                style={{
                  color: "brown",
                  fontSize: 18,
                  marginTop: 100,
                  paddingLeft: 5,
                  fontWeight: "bold",
                  fontFamily: "Times New Roman",
                }}
              >
                Answered
              </Text>
              {this.state.answeredRequests.length != 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {this.state.answeredRequests.map((item, index) => {
                    return (
                      <View key={index.toString()}>
                        <Card
                          style={{
                            width: 270,
                            height: 130,
                            marginTop: 20,
                            elevation: 10,
                            marginLeft: 5,
                            backgroundColor: "#ffCba4",
                            borderRadius: 20,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate(
                                "RequestADetails",
                                { docId: item.id }
                              );
                            }}
                          >
                            <View style={{ marginLeft: 230, marginTop: 5 }}>
                              <Icon name="info" size={20} color="black" />
                            </View>
                          </TouchableOpacity>

                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 10,
                            }}
                          >
                            <View>
                              <View style={{ marginTop: 10 }}>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontFamily: "Times New Roman",
                                  }}
                                >
                                  Counselor: {item.counselorName}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontFamily: "Times New Roman",
                                    marginTop: 5,
                                  }}
                                >
                                  Issue: {item.issue}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </Card>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <Text
                  style={{
                    fontFamily: "Times New Roman",
                    fontSize: 13,
                    paddingLeft: 5,
                  }}
                >
                  No answered requests!
                </Text>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
  // }
}

const styles = StyleSheet.create({});
