import { View, Text, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import React from 'react';

const StartScreen = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/onboarding/1');
  }, 2000);
  return (
    <View style={styles.container}>
      <Text style={styles.brandName}>Weather Pocket</Text>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  brandName: {
    fontFamily: 'poppinsMedium',
    fontSize: 20,
    textAlign: 'center',
  },
});
