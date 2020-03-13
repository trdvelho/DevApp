import React, {useState, useEffect, setState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Storage from '@react-native-community/async-storage';
import api from '../services/apis';
import logo from '../assets/logo.png';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import LoginNotification from './LoginNotification';


//var noUser = false;
export default function Login ({navigation}) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [noUser, setnoUser] = useState(false);
  

  useEffect(() => {
    Storage.getItem('user').then(res => {
      if(res){
        navigation.navigate('Main', {user: res});
      }
    });
  },[]);
  
  async function handleLogin(){
    console.log('login ', user);
    try {
      const response = await api.post('/insdev', {username: user, pass: pass} );
      const { _id} = response.data;
      setnoUser(true);
      await Storage.setItem('user', _id);
      console.log('user registered ', response.data);
      navigation.navigate('Main', {user: _id});
    }
    catch(error){
      //User Login error
      alert(error);
      //noUser = true;
    }
  }

  return (
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0, 0.7]}
        colors={['#004D9B', 'lightblue']}
        style={{flex: 1}}
    >
    
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}>
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false} 
        placeholder="Digite seu usuário GitHub"
        value={user}
        onChangeText={setUser}
        style={styles.input} />

      <TextInput
        autoCapitalize="none"
        secureTextEntry={true} 
        password={true}
        autoCorrect={false} 
        placeholder="Sua senha desse app"
        value={pass}
        onChangeText={setPass}
        style={styles.input2} />
      
      <TouchableOpacity 
        onPress={handleLogin} 
        style={styles.button}>
        <Text>Enviar</Text>
      </TouchableOpacity>

      
      <View>
          <LoginNotification title='Error' message='Wrong GitHub user'></LoginNotification>
      </View>
      

    </KeyboardAvoidingView>
    </LinearGradient>
            
  );
};

const styles = StyleSheet.create({
   container: {
    marginTop: 130,
    marginBottom: 110,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgba(255,255,255,.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    borderRadius: 20
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 40,
    paddingHorizontal: 10

  },
  input2: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10
  },
  button: {
    marginTop: 5, 
    fontSize: 15,
    alignSelf: 'stretch',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  }
});
