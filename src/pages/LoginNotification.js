import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';
export default class LoginNotification extends Component {
    render() {
      const { title, message, noUser } = this.props;

      return (<View style={styles.wrapper_}> 
                        <View style={styles.notificationContent}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.messsage}>{message}</Text>
                        </View>
                    </View>);
        
      
    }
  }
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: "white",
      height: 60,
      width: "100%",
      padding: 10
    },
    notificationContent: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start"
    },
    title: {
      color: 'orange',
      marginRight: 5,
      fontSize: 14,
      marginBottom: 2
    },
    messsage: {
      marginBottom: 2,
      fontSize: 14
    }
  });