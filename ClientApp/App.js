import React, { useEffect, useCallback } from 'react';
import { NativeRouter, Routes, Route } from 'react-router-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Home from './components/Home';
import StartScreen from './components/StartScreen';
import { View } from 'react-native';
import OnBoarding from './components/OnBoarding';

const App = () => {
  const [loader] = useFonts({
    poppinsBlack: require('./assets/fonts/Poppins-Black.ttf'),
    poppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    poppinsExtraBold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    poppinsExtraLight: require('./assets/fonts/Poppins-ExtraLight.ttf'),
    poppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
    poppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    poppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    poppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    poppinsThin: require('./assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (loader) {
      await SplashScreen.hideAsync();
    }
  }, [loader]);

  if (!loader) {
    return null;
  }
  return (
    <View style={{ width: '100%', height: '100%' }} onLayout={onLayoutRootView}>
      <NativeRouter>
        <Routes>
          <Route path="/">
            <Route element={<StartScreen />} index />
            <Route path="home" element={<Home />} />
            <Route path="onboarding">
              <Route path=":id" element={<OnBoarding />} />
            </Route>
          </Route>
        </Routes>
      </NativeRouter>
    </View>
  );
};

export default App;
