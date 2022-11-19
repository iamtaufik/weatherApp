import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigate, useParams } from 'react-router-native';

const OnBoarding = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(`${id != 2 ? '/onboarding/2' : '/home'}`);
  };

  const handleBack = () => {
    navigate(`${id != 2 ? '' : '/onboarding/1'}`);
  };

  const assetsData = [
    {
      onBoarding1: {
        textTitle: 'Memperkirakan Cuaca',
        textParagraph: 'Dengan aplikasi Weather Pocket kalian bisa melihat cuaca yang akan datang sekarang.',
        image: require('../assets/images/raining.gif'),
      },
    },
    {
      onBoarding2: {
        textTitle: 'Fitur Search',
        textParagraph: 'Dengan fitur ini kalian bisa mencari dikota mana yang sedang terkena hujan atau tidak dan sebaliknya sedang cerah atau tidak.',
        image: require('../assets/images/searching.gif'),
      },
    },
  ];

  let arr = [
    {
      onBoarding1: [
        {
          icon: require('../assets/images/active.png'),
        },
        {
          icon: require('../assets/images/not-active.png'),
        },
      ],
    },
    {
      onBoarding2: [
        {
          icon: require('../assets/images/not-active.png'),
        },
        {
          icon: require('../assets/images/active.png'),
        },
      ],
    },
  ];
  arr = id != 2 ? arr[0].onBoarding1 : arr[1].onBoarding2;

  return (
    <View style={styles.container}>
      <View style={styles.secContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={id == 1 ? assetsData[0].onBoarding1.image : assetsData[1].onBoarding2.image} />
        </View>
        <Text style={styles.textTitle}>{id == 1 ? assetsData[0].onBoarding1.textTitle : assetsData[1].onBoarding2.textTitle}</Text>
        <Text style={styles.textParagraph}>{id == 1 ? assetsData[0].onBoarding1.textParagraph : assetsData[1].onBoarding2.textParagraph}</Text>
      </View>
      <View style={styles.footer}>
        {id == 1 ? (
          <Text style={styles.navigation}></Text>
        ) : (
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.navigation}>Kembali</Text>
          </TouchableOpacity>
        )}
        <View style={styles.containerIcons}>
          {arr.map((value, i) => {
            return <Image key={i} source={value.icon} style={styles.icon} />;
          })}
        </View>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.navigation}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 25,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
  },
  textTitle: {
    marginTop: -30,
    fontFamily: 'poppinsRegular',
    fontWeight: '600',
    fontSize: 26,
  },
  textParagraph: {
    marginTop: 5,
    fontFamily: 'poppinsRegular',
    fontWeight: '200',
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    width: '75%',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerIcons: {
    width: 25,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigation: {
    width: 100,
    fontFamily: 'poppinsMedium',
    fontSize: 16,
    fontWeight: '500',
  },
});
