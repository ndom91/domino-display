import { Pressable, Text, StyleSheet, TextInput, ActivityIndicator, Platform } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import tw from "twrnc"

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { setData } from '@/hooks/useAsyncStorage';
import { useThemeColor } from '@/hooks/useThemeColor';
import Toast from 'react-native-toast-message';
import BluetoothScan from '@/components/BLEScan';
import { ExternalLink } from '@/components/ExternalLink';

export default function Welcome() {
  const [isLoading, setIsLoading] = useState(false);
  const [codeText, changeCodeText] = useState('');
  const [ssidText, changeSsidText] = useState('');
  const [passwordText, changePasswordText] = useState('');

  const text = useThemeColor('text');
  const tint = useThemeColor('tint');
  const brandColor = useThemeColor('brandColor');
  const brandContrast = useThemeColor('brandContrast');

  async function submitDisplayCode() {
    if (!codeText || !ssidText || !passwordText) {
      Toast.show({
        type: 'error',
        text1: 'Missing Data',
        text2: 'Please ensure all fields are filled out',
      })
    }
    setIsLoading(true)
    console.log('displayCode', codeText)
    await setData('displayCode', codeText)
    await setData('hasSeenWelcome', true)
    setIsLoading(false)
  }

  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.subTitleContainer}>
        <ThemedText type="default">
          You've got a new <ExternalLink style={tw`text-[${tint}]`} href="https://github.com/ndom91/domino-display">DominoDisplay</ExternalLink>! Now is time to set it up. First, enter your display code below.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          style={tw.style('dark:text-white text-black', {
            height: 40,
            padding: 10,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: text,
          })}
          onChangeText={changeCodeText}
          placeholder="2904f0bc-1b89-4f..."
          value={codeText}
          placeholderTextColor="#475569"
          autoCorrect={false}
          autoCapitalize='none'
        />
        <ThemedText type="default">
          Next, enter the Wifi credentials of the network your display should connect to
        </ThemedText>
        <TextInput
          style={tw.style('dark:text-white text-black', {
            height: 40,
            padding: 10,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: text,
          })}
          onChangeText={changeSsidText}
          placeholder="my-wifi-01"
          value={ssidText}
          placeholderTextColor="#475569"
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={tw.style('dark:text-white text-black', {
            height: 40,
            padding: 10,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: text,
          })}
          onChangeText={changePasswordText}
          placeholder="p4ssw0rd"
          value={passwordText}
          placeholderTextColor="#475569"
          autoCorrect={false}
          autoCapitalize='none'
        />
        <Pressable
          onPress={submitDisplayCode}
          style={tw`rounded-md py-3 bg-[${brandColor}] gap-2 items-center w-full flex flex-row flex-1 justify-center`}
        >
          {isLoading ? <ActivityIndicator size="small" color={brandContrast} /> : null}
          <Text style={tw`font-bold`}>Submit</Text>
        </Pressable>

        {Platform.select({
          ios: (
            <BluetoothScan />
          ),
          android: (
            <BluetoothScan />
          ),
        })}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    color: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#475569',
  },
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
    marginTop: 8,
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
