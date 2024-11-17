import { Pressable, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import tw from "twrnc"

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { setData } from '@/hooks/useAsyncStorage';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [codeText, changeCodeText] = useState('');
  const [ssidText, changeSsidText] = useState('');
  const [passwordText, changePasswordText] = useState('');

  const brandColor = useThemeColor('brandColor');
  const brandContrast = useThemeColor('brandContrast');

  function submitDisplayCode() {
    if (!codeText || !ssidText || !passwordText) return
    setIsLoading(true)
    console.log('displayCode', codeText)
    setData('displayCode', codeText)
  }

  return (
    <div>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.subTitleContainer}>
        <ThemedText type="default">
          You've got a new <a style={tw`text-[${brandColor}]`} href="https://github.com/ndom91/domino-display">DominoDisplay</a>! Now is time to set it up. First, enter your display code below.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          style={tw.style('dark:text-white text-black', {
            height: 40,
            padding: 10,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: '#475569',
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
            borderColor: '#475569',
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
            borderColor: '#475569',
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
          disabled={!isLoading}
          style={tw`rounded-md py-3 bg-[${brandColor}] gap-2 items-center w-full flex flex-row flex-1 justify-center`}
        >
          {isLoading ? <ActivityIndicator size="small" color={brandContrast} /> : null}
          <Text style={tw`font-bold`}>Submit</Text>
        </Pressable>
      </ThemedView>
    </div>
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