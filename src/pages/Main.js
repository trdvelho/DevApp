import React, { useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
//import Login from '../pages/Login';
import Storage from '@react-native-community/async-storage';
import axios from '../services/apis';
import logo from '../assets/logo.png';
import {
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useScreens } from 'react-native-screens';



export default function Main ({navigation}) {
  let id =  navigation.getParam('user');
  const [users, setUsers] = useState([]);
  console.log('......>> ', id);
  
  useEffect(()=>{
    async function loadUsers(){
      const response = await axios.get('devs',{
         headers: {
           user: id
        }
      });
      setUsers(response.data);
      console.log('......>> ', response.data);
    }
    loadUsers();
    }, [id]);
  
  async function handleLike(){
    const [user, ... rest] = users;
    
    await axios.post(`/dev/${user._id}/dislike`, null, {
      headers: { user: id}
    });

    setUsers(rest);
  }

  async function handleDislike(){
    const [user, ... rest] = users;
    await axios.post(`/dev/${user._id}/like`, null, {
      headers: { user: id}
    });

    setUsers(rest);
  }

  async function handleLogout(){
    await Storage.setItem('user', '');
    
    navigation.navigate('Login', {});
  }

     
  
  return (

    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0, 0.7]}
        colors={['#004D9B', 'lightblue']}
        style={{flex: 1}}
    >
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
      <Image source={logo} />
      </TouchableOpacity>
      
      <View style={styles.cardContainer}>
        { users.length == 0 
          ? <Text>Acabou</Text> 
          : (
            users.map((user, index) => (
              <View key={user._id} style={[styles.card, {zIndex: users.length - index}]}>
                <Image style={styles.devImage} source={{uri: user.avatar }} />
                <View style={styles.footer}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.bio}>{user.bio}</Text>
                </View>
              </View>
            ))
          ) }
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleDislike} style={styles.button}>
          <Text>X</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike} style={styles.button}>
          <Text>L</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </LinearGradient>
            
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContainer:{
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      maxHeight: 500
    },

    card: {
        borderWidth: 1,
        borderColor: 'darkorange',
        backgroundColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top:0,
        right: 0,
        left: 0,
        bottom: 0
    },
    footer:{
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    bio: {
      lineHeight: 20
    },
    devImage: {
        flex: 1,
        height: 300
    },
    buttons:{
      flexDirection: 'row',
      marginBottom: 30
    },
    name: {
      fontWeight: 'bold'
    },
    button: {
      width: 50,
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 25,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      shadowRadius: 2,
      shadowOffset: {
        width: 0,
        height: 2
      }
    }

});
