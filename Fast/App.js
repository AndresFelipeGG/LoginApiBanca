/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './views/Login';
import Home from './views/Home';
import AsyncStorage from '@react-native-community/async-storage';


const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Login: Login
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#063e85',
      inactiveTintColor: 'gray',
    },
  }
);

const AppNavigator = createAppContainer(TabNavigator);



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    }
  }
  getData = async () => {
    try {
      const key = await AsyncStorage.getItem('@token')
      if (key !== null) {
        this.setState({ token: key })
      } else {
        this.setState({ token: '' })
      }
    } catch (e) {
      alert.alert("Error", "Ocurrió un error por favor intentalo mas tarde");
    }
  }
  componentDidMount() {
    this.getData();
  }
  logout = async () => {
 try {
    await AsyncStorage.setItem('@token', '')
  } catch (e) {
    // saving error
  }
  }
  render() {
    if (this.state.token !== '') {
      return (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Appbar.Header
              style={{ color: '#ffd300', backgroundColor: '#063e85' }}
            >
              <Appbar.Content
                title="Bancolombia"
              />
              <Appbar.Action icon="more-vert" onPress={this.logout} />
            </Appbar.Header>
            <AppNavigator />
          </View>
      );
    } else {
      return (
        <Login />
      );
    }
  }
}

