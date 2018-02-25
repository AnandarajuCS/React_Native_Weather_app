import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Exponent from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Icon</Text>
          <Text style= {styles.temp}>24</Text>
        </View>
        <View style= {styles.body}>
          <Text style= {styles.title}>Build a Awesome Weather App!!</Text>
          <Text style= {styles.subtitle}>Let's make it rain!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  temp: {
    fontSize: 45,
    color: 'white',
  },
  body: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    margin: 10,
  },
  title: {
    fontSize: 78,
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
  },
});

Exponent.registerRootComponent(App);
