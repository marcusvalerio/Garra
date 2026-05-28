import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Geist_400Regular,
  Geist_600SemiBold,
  Geist_700Bold,
  Geist_900Black,
} from '@expo-google-fonts/geist';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

import { colors } from './src/theme';
import BottomNav from './src/components/BottomNav';
import HomeScreen from './src/screens/HomeScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import CrewScreen from './src/screens/CrewScreen';
import ProfileScreen from './src/screens/ProfileScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const [fontsLoaded] = useFonts({
    Geist_400Regular,
    Geist_600SemiBold,
    Geist_700Bold,
    Geist_900Black,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':   return <HomeScreen />;
      case 'treino': return <WorkoutScreen />;
      case 'crew':   return <CrewScreen />;
      case 'perfil': return <ProfileScreen />;
      default:       return <HomeScreen />;
    }
  };

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      {renderScreen()}
      <BottomNav active={activeTab} onPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
