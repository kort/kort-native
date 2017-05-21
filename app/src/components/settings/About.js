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
        return (
            <View style={styles.bgColor} >
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={styles.scrollView}
                >
        <View style={styles.container}>
          <View style={styles.containerAbout}>
            <Image style={styles.kortlogo} source={{ uri: 'kort_logo' }} />
            <Text style={styles.textTitle}>{I18n.t('about_version_title')}</Text>
            <Text style={styles.textSubTitle}>{VersionNumber.appVersion}</Text>
            <Text style={styles.textTitle}>{I18n.t('about_information_title')}</Text>
            <Hyperlink onPress={url => Linking.openURL(url)}>
                <Text style={styles.textSubTitle}>
                {`${I18n.t('about_information_homepage')} ${Config.KORT_WEBSITE}`}
                </Text>
            </Hyperlink>
            <Hyperlink onPress={url => Linking.openURL(url)}>
                <Text style={styles.textSubTitle}>
                {`${I18n.t('about_information_feedback')} ${Config.KORT_USERVOICE}`}
                </Text>
            </Hyperlink>
            <Hyperlink onPress={url => Linking.openURL(url)}>
                <Text style={styles.textSubTitle}>
                {`${I18n.t('about_information_bugs')} ${Config.KORT_GITHUB}`}
                </Text>
            </Hyperlink>
            <Text style={styles.textTitle}>{I18n.t('about_developers_title')}</Text>
            <Text style={styles.textSubTitle}>Andreas Egloff</Text>
            <Text style={styles.textSubTitle}>Jürg Hunziker</Text>
            <Text style={styles.textSubTitle}>Stefan Oderbolz</Text>
            <Text style={styles.textTitle}>{I18n.t('about_project_title')}</Text>
            <Text style={styles.textSubTitle}>Master's Thesis 2017</Text>
            <Text style={styles.textSubTitle}>HSR Hochschule für Technik Rapperswil</Text>
            <Text style={styles.textSubTitle}>
              {I18n.t('about_project_advisor')} Prof. Stefan Keller
            </Text>
            <Image 
                style={styles.hsrlogo} 
                source={require('../../../assets/images/about/hsr_logo.png')} 
            />
            <Text style={styles.textTitle}>{I18n.t('about_credits_title')}</Text>
            <Text style={styles.textSubTitle}>{I18n.t('about_credits_partner')} Liip AG</Text>
            <Text style={styles.textSubTitle}>
              {I18n.t('about_credits_tiledata')} Klokan Technologies
            </Text>
            <Hyperlink onPress={url => Linking.openURL(url)}>
                <Text style={styles.textSubTitle}>
                {I18n.t('about_credits_markers')} Icon made by Freepik from www.flaticon.com
                </Text>
            </Hyperlink>
            <Text style={styles.textTitle}>{I18n.t('about_legal_title')}</Text>
            <Text style={styles.textSubTitle}>{I18n.t('about_legal_message')}</Text>
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
};


export default (About);
