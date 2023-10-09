import React, {useState, useEffect} from 'react';
import {StyleSheet,Text, View} from 'react-native';
import WeatherChart from './WeatherChart';
import { mockData } from './mockdata';
import { getForecast } from './api-weather';

const App = () => {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    getForecast().then((res) => {
        setData(res.data);
    })
  }, [])

  const hours = data.hourly.time;
  const values = data.hourly.temperature_2m;
  const rainProbabilities = data.hourly.precipitation_probability;

  return (
    <View style={styles.container}>
      <WeatherChart 
        yDomain={{min: 10, max: 35}}
        hours={hours}
        values={values}
        color={{
          to: '#36d',
          from: '#d61',
          line: '#555'
        }}
      />
      <WeatherChart 
        yDomain={{min: 0, max: 100}}
        hours={hours}
        values={rainProbabilities}
        color={{
          to: '#ddf',
          from: '#14a',
          line: '#555'
        }}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
 container:{
  flex: 1,
  backgroundColor: '#fff',
  alignItens: 'center',
  justifyContent: 'center',
 }
});

export default App;
