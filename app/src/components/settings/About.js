import React, { Component } from 'react';
import VersionNumber from 'react-native-version-number';
import Hyperlink from 'react-native-hyperlink';
import {
    Linking,
    View,
    Platform,
    ScrollView,
    Image,
    Text
} from 'react-native';
import I18n from 'react-native-i18n';
import Config from '../../constants/Config';

class About extends Component {
    
    render() {
        const { bgColor, scrollView, container, containerAbout, kortlogo,
         hsrlogo, textTitle, textSubTitle, linkStyle } = styles;
        return (
            <View style={bgColor} >
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={scrollView}
                >
        <View style={container}>
          <View style={containerAbout}>
            <Image style={kortlogo} source={{ uri: 'kort_logo' }} />
            <Text style={textTitle}>{I18n.t('about_version_title')}</Text>
            <Text style={textSubTitle}>{VersionNumber.appVersion}</Text>
            <Text style={textSubTitle}>{I18n.t('about_legal_message')}</Text>
            <Text style={textTitle}>{I18n.t('about_information_title')}</Text>
            <Hyperlink linkStyle={linkStyle} onPress={url => Linking.openURL(url)}>
                <Text style={textSubTitle}>
                {`${I18n.t('about_information_homepage')} ${Config.KORT_WEBSITE}`}
                </Text>
            </Hyperlink>
            <Hyperlink linkStyle={linkStyle} onPress={url => Linking.openURL(url)}>
                <Text style={textSubTitle}>
                {`${I18n.t('about_information_feedback')} ${Config.KORT_USERVOICE}`}
                </Text>
            </Hyperlink>
            <Hyperlink linkStyle={linkStyle} onPress={url => Linking.openURL(url)}>
                <Text style={textSubTitle}>
                {`${I18n.t('about_information_bugs')} ${Config.KORT_GITHUB}`}
                </Text>
            </Hyperlink>
            <Text style={textTitle}>{I18n.t('about_project_title')}</Text>
            <Text style={textSubTitle}>Master's Thesis 2017 by Andreas Egloff</Text>
            <Text style={textSubTitle}>HSR Hochschule für Technik Rapperswil</Text>
            <Text style={textSubTitle}>
              {I18n.t('about_project_advisor')} Prof. Stefan Keller
            </Text>
            <Image 
                style={hsrlogo} 
                source={require('../../../assets/images/about/hsr_logo.png')} 
            />
            <Text style={textTitle}>{I18n.t('about_credits_title')}</Text>
            <Text style={textSubTitle}>Data:{'\n'}
                OpenStreetMap contributors{'\n'}
                KeepRight{'\n'}
                Overpass</Text>
            <Hyperlink 
                linkStyle={linkStyle}
                onPress={url => Linking.openURL(url)}
                linkText={() => { return 'OpenMapTiles.com'; }}
            >
            <Text style={textSubTitle}>
              {I18n.t('about_credits_tiledata')}{'\n'}
              https://openmaptiles.com/hosting/ (Klokan Technologies){'\n'}
              Mapbox
            </Text>
            </Hyperlink>
            <Hyperlink 
                linkStyle={linkStyle}
                onPress={url => Linking.openURL(url)}
                linkText={url => {
                    if (url === 'http://www.flaticon.com/authors/freepik') {
                        return 'Freepik';
                    } else if (url === 'http://www.flaticon.com/authors/cursor-creative') {
                        return 'Cursor Creative';
                    } else if (url === 'http://www.flaticon.com/authors/hevngrafix') {
                        return 'HevnGrafix';
                    }
                        return 'www.flaticon.com';
                    }
                }
            >
                <Text style={textSubTitle}>
                {I18n.t('about_credits_markers')} Icon made by{'\n'}
                http://www.flaticon.com/authors/freepik{'\n'}
                http://www.flaticon.com/authors/cursor-creative{'\n'}
                http://www.flaticon.com/authors/hevngrafix{'\n'}
                from www.flaticon.com
                </Text>
            </Hyperlink>
            <Hyperlink linkStyle={linkStyle} onPress={url => Linking.openURL(url)}>
                <Text style={textSubTitle}>
                Fonts:{'\n'}
                FontAwesome{'\n'}
                Ionicons{'\n'}
                MaterialIcons
                </Text>
            </Hyperlink>
            <Hyperlink 
                linkStyle={linkStyle}
                onPress={url => Linking.openURL(url)}
                linkText={() => { return 'Transifex'; }}
            >
                <Text style={textSubTitle}>{I18n.t('about_credits_translation')}{'\n'}
                    https://www.transifex.com/odi/kort/</Text>
            </Hyperlink>
            <Text style={textSubTitle}>Software Libraries:{'\n'}
                    lodash{'\n'}
                    react{'\n'}
                    react-native{'\n'}
                    react-native-animatable{'\n'}
                    react-native-google-signin{'\n'}
                    react-native-hyperlink{'\n'}
                    react-native-i18n{'\n'}
                    react-native-mapbox-gl{'\n'}
                    react-native-modal-datetime-picker{'\n'}
                    react-native-modal-dropdown{'\n'}
                    react-native-page-control{'\n'}
                    react-native-rest-client{'\n'}
                    react-native-router-flux{'\n'}
                    react-native-segmented-control-tab{'\n'}
                    react-native-select-multiple{'\n'}
                    react-native-settings-list{'\n'}
                    react-native-simple-store{'\n'}
                    react-native-vector-icons{'\n'}
                    react-native-version-number{'\n'}
                    react-redux{'\n'}
                    redux{'\n'}
                    redux-thunk
            </Text>
            <Text style={textTitle}>{I18n.t('about_thanks')}</Text>
            <Text style={textSubTitle}>
            Stefan Oderbolz (Liip){'\n'}
            Jürg Hunziker (Liip){'\n'}
            Reto Senn (bitforge){'\n'}
            Pirmin Kalberer (Sourcepole){'\n'}
            E. Sivro{'\n'}
            S. Fritschi{'\n'}
            M. Melchiori{'\n'}
            D. Mülhaupt{'\n'}
            A. Egli{'\n'}
            C. Schumacher{'\n'}
            {I18n.t('about_many_more')}
            </Text>
          </View>
        </View>
      </ScrollView>
            </View>
        );
    }
}

const styles = {
    bgColor: {
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        backgroundColor: '#202931',
        flex: 1
    },
    scrollView: {
    marginBottom: 46,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  containerAbout: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#395971',
    borderColor: '#657C8E',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10

  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 7,
    color: 'white'
  },
  textSubTitle: {
    marginTop: 5,
    color: 'white'
  },
  kortlogo: {
    alignSelf: 'center',
    marginTop: 7,
    height: 128,
    width: 128,
  },
  hsrlogo: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: 150,
  },
  linkStyle: {
      textDecorationLine: 'underline'
  }
};


export default (About);
