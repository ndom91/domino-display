/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const brandColor = '#FEEFE5';
const brandColorDark = '#FAAA75';
const tintColorLight = '#FAAA75';
const tintColorDark = '#FEEFE5';

export const Colors = {
  light: {
    brandColor,
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    brandContrast: "#AC9BBF"
  },
  dark: {
    brandColor: brandColorDark,
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    brandContrast: "#141019"
  },
};
