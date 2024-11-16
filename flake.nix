{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            android_sdk.accept_license = true;
            allowUnfree = true;
          };
        };
        androidComposition = pkgs.androidenv.composeAndroidPackages {
          buildToolsVersions = [ "35.0.0-rc1" ];
          platformVersions = [ "UpsideDownCake" ];
          abiVersions = [ "x86_64" ];
          includeEmulator = true;
          emulatorVersion = "34.2.11";
          includeSystemImages = true;
          systemImageTypes = [ "google_apis" ];
          includeNDK = true;
          ndkVersions = [ "25.1.8937393" ];
          cmakeVersions = [ "3.22.1" ];
        };
        androidSdk = androidComposition.androidsdk;
      in
      {
        devShell =
          with pkgs; mkShell {
            ANDROID_SDK_ROOT = "${androidSdk}/libexec/android-sdk";
            ANDROID_HOME = "${androidSdk}/libexec/android-sdk";
            ANDROID_AVD_HOME = "/home/ndo/.config/.android/avd";
            QT_QPA_PLATFORM = "wayland;xcb";
            PATH = "$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools";
            GRADLE_OPTS = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${androidSdk}/libexec/android-sdk/build-tools/35.0.0-rc1/aapt2";
            LD_LIBRARY_PATH = "${libglvnd}/lib";
            buildInputs = [
              androidSdk

              nodejs
              corepack
              jdk17
              crudini
            ];
          };
      });
}
