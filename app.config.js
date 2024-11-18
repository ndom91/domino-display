module.exports = {
  name: "display",
  slug: "display",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "com.domino.display",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.domino.display"
  },
  android: {
    package: "com.domino.display",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    "react-native-ble-plx",
    "expo-font",
    "expo-image-picker",
    "expo-dev-launcher",
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: '35.0.0-rc1',
        },
        ios: {
          deploymentTarget: '15.1',
        },
      },
    ],
    [
      "expo-splash-screen",
      {
        "backgroundColor": "#ffffff",
        "image": "./assets/images/adaptive-icon.png",
        "dark": {
          "image": "./assets/images/adaptive-icon.png",
          "backgroundColor": "#1B1B1F"
        },
        "imageWidth": 200
      }
    ],
  ],
  experiments: {
    "typedRoutes": true
  }
}
