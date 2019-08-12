import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
class Home extends Component {

  render() {
    return (
      <ScrollView>
        <View style={{flex:1}}>
          <View>
            <Card>
              <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Image source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' }}
                style={{ width: 70, height: 70 }} />} />
              <Card.Content>
                <Title>Card title</Title>
              </Card.Content>
              <Card.Actions>
                <Button>Ver</Button>
              </Card.Actions>
            </Card>
          </View>

        </View>
      </ScrollView>
    );
  }
}


export default Home;