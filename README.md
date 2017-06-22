[![Build Status](https://travis-ci.org/kort/kort-native.svg?branch=master)](https://travis-ci.org/kort/kort-native)
# kort-native
Kort Native will be the next iteration of the known Kort webapp. It will be available on Android and iOS as a native version.
First release will be available during Q2'17

Kort is a serious game aimed to improve OpenStreetMap data using the concepts of crowdsourcing and gamification.

# setup for release

## Android
1. keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
2. cd android && ./gradlew assembleRelease
## iOS
1. open project in XCode
2. select scheme 'release'