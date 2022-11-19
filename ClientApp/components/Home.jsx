import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, faBarsStaggered, faSpinner, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const Home = () => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mesage, setMesage] = useState('');

  const imageIcon = [
    {
      name: 'Cerah',
      url: require('../assets/images/Cerah.png'),
    },
    {
      name: 'Mendung',
      url: require('../assets/images/Mendung.png'),
    },
    {
      name: 'Hujan',
      url: require('../assets/images/Hujan.png'),
    },
  ];

  const handleIcon = (summary) => {
    const filtered = imageIcon.filter((value) => {
      if (value.name == summary) {
        return value;
      }
    });
    return filtered[0].url;
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.6}>
        <View style={{ width: 60, height: 75, justifyContent: 'center', alignItems: 'center' }} key={index}>
          <Text style={styles.textTime}>{item.time}</Text>
          <Image source={handleIcon(item.summary)} style={{ width: 20, height: 20 }} />
          <Text style={styles.textTime}>{item.summary}</Text>
          <Text style={styles.textTime}>{item.temprature}°C</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const getWeatherCondition = async () => {
      try {
        const response = await axios.get('http://192.168.43.226:5080/weathercondition');
        setWeather(response.data);
      } catch (error) {
        setLoading(true);
        setMesage(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getWeatherCondition();
  }, []);

  if (mesage !== '') {
    return (
      <View style={styles.onError}>
        <View style={styles.containerError}>
          <Text style={styles.errorText}>
            <FontAwesomeIcon icon={faTriangleExclamation} color={'yellow'} />
          </Text>
          <Text style={styles.errorText}>Gagal Mengakses API</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={loading ? styles.onLoading : styles.container}>
      {loading ? (
        <View style={styles.containerLoading}>
          <Text style={styles.loadingText}>
            <FontAwesomeIcon icon={faSpinner} color={'#fff'} />
          </Text>
          <Text style={styles.loadingText}> Loading API</Text>
        </View>
      ) : (
        <>
          <View style={styles.navbar}>
            <TouchableOpacity activeOpacity={0.7}>
              <View>
                <Text style={styles.icons}>
                  <FontAwesomeIcon icon={faBarsStaggered} style={{ color: '#ffffff' }} />
                </Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.textTitle}>Weatherpocket</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <View>
                <Text style={styles.icons}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#ffffff' }} />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'relative', marginTop: 20 }}>
            <View style={{ position: 'absolute', bottom: -12, width: '100%', zIndex: 99 }}>
              <View>
                <Text style={styles.textCity}>{weather[0].city}</Text>
                <Text style={styles.textDate}>{weather[0].date}</Text>
              </View>
              <View style={styles.containerImage}>
                <Image source={handleIcon(weather[0].summary)} style={{ width: 110, height: 110 }} />
              </View>
            </View>
            <View>
              <Image source={require('../assets/images/bg-night.png')} style={{ width: '100%', height: 200 }} />
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.containerText}>
              <Text style={styles.text}>{weather[0].temprature}°C</Text>
              <Text style={styles.text}>{weather[0].summary}</Text>
            </View>
            <View style={styles.containerWidgets}>
              <FlatList data={weather[0].todayForecast} horizontal={true} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <View style={styles.button}>
                <Text style={styles.textButton}>Ramalan 3 Hari</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Data Disediakan Oleh</Text>
              <Text style={styles.footerText}>Ramalan Cuaca</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  onLoading: {
    height: '100%',
    backgroundColor: '#ABABAB',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoading: {
    height: 50,
    shadowColor: '#fff',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    width: '40%',
    backgroundColor: '#2E2E2E',
    borderColor: '#acacac',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5,
  },
  loadingText: {
    fontFamily: 'poppinsMedium',
    fontSize: 16,
    color: '#fff',
  },
  onError: {
    height: '100%',
    backgroundColor: '#ABABAB',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerError: {
    height: 70,
    width: '55%',
    backgroundColor: '#2E2E2E',
    borderColor: '#acacac',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5,
  },
  errorText: {
    fontFamily: 'poppinsMedium',
    fontSize: 16,
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    paddingTop: 25,
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#ABABAB',
  },
  navbar: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: 'poppinsMedium',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '200',
  },
  icons: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  body: {
    marginTop: -2,
    height: '100%',
    paddingTop: 12,
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    paddingHorizontal: 20,
  },
  textCity: {
    marginBottom: 4,
    fontFamily: 'poppinsMedium',
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
    color: '#ffffff',
  },
  textDate: {
    fontFamily: 'poppinsMedium',
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  containerText: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'poppinsRegular',
    fontSize: 36,
    color: '#ffffff',
  },
  containerImage: {
    width: '100%',
    marginVertical: 12,
    alignItems: 'center',
  },
  textTime: {
    fontFamily: 'poppinsRegular',
    fontSize: 12,
    color: '#ffffff',
  },
  containerWidgets: {
    height: 75,
    flexDirection: 'row',
  },
  button: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ABABAB',
    width: 175,
    height: 34,
    borderRadius: 50,
  },
  textButton: {
    fontFamily: 'poppinsLight',
    fontSize: 14,
    color: '#ffffff',
  },
  footer: {
    paddingVertical: 20,
  },
  footerText: {
    color: '#ffffff',
    fontFamily: 'poppinsExtraLight',
    fontSize: 14,
    textAlign: 'center',
  },
});
