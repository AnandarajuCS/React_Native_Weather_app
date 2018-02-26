import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  } from 'react-native';
import Exponent from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import Hightlight from 'react-native-highlight-words';
import {fetchWeather} from './utils/weatherAPI';

const iconNames = {
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',
};

const phrases = {
  Clear: {
    title: "It's Awesome Amaze Balls",
    subtitle: "Rock that Shit!",
    highlight: "Awesome",
  },
  Rain: {
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
    highlight: "away",
  },
  Thunderstorm: {
    title: "Major Thunderstrike",
    subtitle: "Unplug those devices!",
    highlight: "Thunderstrike",
  },
  Clouds: {
    title: "Cloud Storage limit reached",
    subtitle: "error: 5000 - cirrocumulus",
    highlight: "limit",
  },
  Snow: {
    title: "Oh God! Brain freeze",
    subtitle: "You are not supposed to eat it!",
    highlight: "Freeze",
  },
  Drizzle: {
    title: "I am loving it!",
    subtitle: "It's great outside",
    highlight: "loving",
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      weather: 'Clear',
    };
  }
  // componentWillMount() {
  //   this.state = {
  //     temp: 0,
  //     weather: 'Clear',
  //   };
  // }
  componentDidMount() {
    this.getLocation();
    fetchWeather(37, -121).then(res => console.log(res));
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
        .then(res => {
          this.setState({
            temp: res.temp,
            weather: res.weather,
          });
        }),
      (error) => Alert(error),
      {timeout:10000}
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={80} color={'white'}/>
          <Text style= {styles.temp}>{this.state.temp}</Text>
        </View>
        <View style= {styles.body}>
          <Hightlight
            style= {styles.title}
            highlightStyle={{color: 'red'}}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight= {phrases[this.state.weather].title}
          />
          <Text style= {styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
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
    fontSize: 70,
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
  },
});

Exponent.registerRootComponent(App);
