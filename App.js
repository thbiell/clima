import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import WeatherChart from './WeatherChart';
import { mockData } from './mockdata';
import { getForecast } from './api-weather';

const App = () => {
  const [data, setData] = useState(mockData);


  useEffect(() => {
    getForecast().then((res) => {
      setData(res.data);
    });
  }, []);

  const hours = data.hourly.time;
  const values = data.hourly.temperature_2m;
  const rainProbabilities = data.hourly.precipitation_probability;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/images/background4.jpeg')}
        style={styles.backgroundImage}
      >
        <Text style={styles.cityText}>{data.timezone}</Text>
        <View style={styles.chartContainer}>
          <Text style={styles.titleContainer}>Temperatura</Text>
          <WeatherChart
            yDomain={{ min: 10, max: 35 }}
            hours={hours}
            values={values}
            color={{
              to: '#36d',
              from: '#d61',
              line: '#555',
            }}
          />
          <Text style={styles.titleContainer}>Probabilidade de chuva</Text>
          <WeatherChart
            yDomain={{ min: 0, max: 100 }}
            hours={hours}
            values={rainProbabilities}
            color={{
              to: '#ddf',
              from: '#14a',
              line: '#555',
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',

  },
  chartContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 16,
  },
  titleContainer:{
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default App;
