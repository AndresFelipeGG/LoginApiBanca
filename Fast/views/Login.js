import React, { Component } from 'react';
import { Text, View, TouchableOpacity,Alert } from 'react-native';
import { Avatar, TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';  
import {decode as atob, encode as btoa} from 'base-64';

class Login extends Component {
    state = {
        user: "f0be2451-6c18-456b-ada7-2b7b3a4b3a4c",
        password: "yS1pG3uQ4fK3lD3kM5kE6hK7gU5eJ1pD6jI1yF7mO5nQ3fF7sR",
    };
    login = () => {
        let user = this.state.user;
        let password = this.state.password;

        let auth = btoa(`${user}:${password}`);
        
        // Alert.alert("Credenciales",`Auth: ${auth}`)
        axios({
            method:'post',
            url:'https://api.us.apiconnect.ibmcloud.com/bancolombiabluemix-dev/sandbox/v2/security/oauth-otp/oauth2/token?grant_type=client_credentials&scope=Deposit-account:read:user Customer:write:app',
            headers: {
                'Authorization': `Basic ${auth}` 
            }
        }).then(data => {
            this.storeData(data.data.access_token);
        });
        
      }
      storeData = async (token) => {
  try {
    await AsyncStorage.setItem('@token', token)
  } catch (e) {
    // saving error
  }
}
getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#F4F4F4' }}>
                <Card style={{ borderColor: '#000' }}>
                    <Card.Title title="App Banca" subtitle="Inicio de sesión" left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: '#063e85' }} icon={require('../images/bank.webp')} />} />
                    <Card.Content>
                        <Title>Card title</Title>
                        <TextInput
                            mode='outlined'
                            underlineColor='transparent'
                            label='Email'
                            theme={{
                                colors: {
                                    primary: '#063e85',
                                    underlineColor: 'transparent',

                                }
                            }}
                            value={this.state.user}
                            onChangeText={user => this.setState({ user })}
                        />
                        <TextInput
                            mode='outlined'
                            label='Password'
                            secureTextEntry={true}
                            theme={{
                                colors: {
                                    primary: '#063e85',
                                    underlineColor: 'FF0000',

                                },
                                clearTextOnFocus: true
                            }}

                            textContentType='newPassword'
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                    </Card.Content>

                    <Card.Actions style={{
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#063e85',
                                padding: 10,
                                borderRadius: 5,
                                width: 200
                            }}
                            onPress={this.login}
                        >
                            <Text style={{ color: '#fff' }}> INGRESAR </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={this.getStorage}>
                            <Text> ¿olvidó su contraseña? </Text>
                        </TouchableOpacity>
                    </Card.Actions>
                </Card>
            </View>
        );
    } s
}

export default Login;