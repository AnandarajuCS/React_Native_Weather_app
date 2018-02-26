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
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',
};

const phrases = {
  Default: {
    title: "Fetching your Weather data",
    subtitle: "Please be patient, you are about to see a miracle",
    highlight: "Weather",
    color: "#636363",
    background: "#9C9C9C",
  },
  Clear: {
    title: "It's Awesome Amaze Balls",
    subtitle: "Rock that Shit!",
    highlight: "Awesome",
    color: "#E32500",
    background: "#FFD017",
  },
  Rain: {
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
    highlight: "away",
    color: "#004A96",
    background: "#2F343A",
  },
  Thunderstorm: {
    title: "Major Thunderstrike",
    subtitle: "Unplug those devices!",
    highlight: "Thunderstrike",
    color: "#FBFF46",
    background: "#020202",
  },
  Clouds: {
    title: "Cloud Storage limit reached",
    subtitle: "error: 5000 - cirrocumulus",
    highlight: "limit",
    color: "#0044FF",
    background: "#939393",
  },
  Snow: {
    title: "Oh God! Brain freeze",
    subtitle: "You are not supposed to eat it!",
    highlight: "Freeze",
    color: "#021D4C",
    background: "#15A678",
  },
  Drizzle: {
    title: "I am loving it!",
    subtitle: "It's great outside",
    highlight: "loving",
    color: "#B3F6E4",
    background: "#1FBB68",
  },
};

export default class App extends React.Component {
  // to resolve this error
  // Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      weather: 'Default',
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
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
        .then(res => {
          this.setState({
            temp: Math.round(res.temp),
            weather: res.weather,
          });
        }),
      (error) => Alert(error),
      {timeout:10000}
    );
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: phrases[this.state.weather].background}]}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={80} color={'white'}/>
          <Text style= {styles.temp}>{this.state.temp} °C</Text>
        </View>
        <View style= {styles.body}>
          <Hightlight
            style= {styles.title}
            highlightStyle={{color: phrases[this.state.weather].color}}
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
