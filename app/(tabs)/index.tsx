import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from "twrnc"

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getData, setData } from '@/hooks/useAsyncStorage';
import { useThemeColor } from '@/hooks/useThemeColor';
import Welcome from "@/components/Welcome"
import Button from '@/components/Button';

export default function HomeScreen() {
  const brandContrast = useThemeColor('brandContrast');
  const icon = useThemeColor('icon');

  const [showWelcome, setShowWelcome] = useState(true);

  async function checkWelcomeSeen() {
    const hasSeenWelcome = await getData('hasSeenWelcome')
    console.log('hasSeenWelcome', hasSeenWelcome)
    if (hasSeenWelcome) {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
      await setData('hasSeenWelcome', true);
    }
  }

  useEffect(() => {
    checkWelcomeSeen()
  }, [])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: icon, dark: icon }}
      headerImage={
        <Ionicons
          size={270}
          name="images-outline"
          color={brandContrast}
          style={tw`-left-4 -bottom-8`}
        />
      }
    >
      {showWelcome ? (
        <Welcome />
      ) : (
        <ThemedView>
          <ThemedView style={styles.titleContainer}>
            <HelloWave />
            <ThemedText type="title">Current State</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Current Display Status</ThemedText>
          </ThemedView>
          <Button onPress={() => setShowWelcome(true)} title="Refresh" />
        </ThemedView>
      )}
    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subTitleContainer: {
    marginTop: 8
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  list: {
    fontSize: 20,
    lineHeight: 36
  }
});
