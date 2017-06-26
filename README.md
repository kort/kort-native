[![Build Status](https://travis-ci.org/kort/kort-native.svg?branch=master)](https://travis-ci.org/kort/kort-native)
# kort-native
Kort Native is the next iteration of the known Kort webapp.
It is currently available in beta for iOS and Android and will be released later in summer 17.


Kort is a serious game aimed to improve OpenStreetMap data using the concepts of crowdsourcing and gamification.

# Setup (Debug)

## Android
1.
```shell
react-native run-android
```
2. shake device in order to debug remotely
## iOS
1.
```shell
react-native run-ios
```
2. shake device in order to debug remotely

# Setup (Release)

## Android
1.
```shell
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
2.
```shell
cd android && ./gradlew assembleRelease
```
3. provide password of key and keystore 
## iOS
1. open project in XCode
2. switch scheme from 'debug' to 'release'

# Mission Types

Currently the following mission types are available:

| Mission Description               | Source    | OSM Tag         |
|-----------------------------------|-----------|-----------------|
| Motorway without reference        | Keepright | ref             |
| Object without a name             | Keepright | name            |
| Missing speed limit               | Keepright | maxspeed        |
| Type of track unknown             | Keepright | tracktype       |
| Place of worship without religion | Keepright | religion        |
| Language of the name unknown      | Keepright | name:XX         |
| Street without a name             | Keepright | name            |
| Restaurant without a cuisine      | Overpass  | cuisine         |
| Place without opening hours       | Overpass  | opening_hours   |
| Missing Levels                    | Overpass  | building:levels |
