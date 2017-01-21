import React, { Component } from 'react';
import {
    View,
    Image,
    Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux'; 
import { GoogleSignin } from 'react-native-google-signin';
import { ButtonWithImage } from '../common';
import Config from '../../constants/Config';

class LoginBox extends Component {

    componentDidMount() {
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
        this.configureGoogleSignIn();
                console.log('configured');
        });
    }

    configureGoogleSignIn() {
        GoogleSignin.configure({
        iosClientId: Config.GOOGLE_IOS_CLIENT_ID, 
        })
        .then(() => {
            console.log('ok');
                GoogleSignin.currentUserAsync().then((user) => {
                console.log('USER', user);
                this.setState({ user });
            }).done();
        });
    }

    signInGoogle() {
        Actions.root();

        GoogleSignin.signIn()
        .then((user) => {
            console.log(user);
            this.setState({ user });
        })
        .catch((err) => {
            console.log('WRONG SIGNIN', err);
        })
        .done();
            console.log('success');
            console.log(this.state.user);
        }

    signInOSM() {
        Linking.openURL('http://localhost:5000/osm/login');
    }

    signInFacebook() {

    }

    render() {
        return (
            <View style={styles.bgColor}>
                <Image 
                    source={require('../../../assets/images/login/kortLogo.png')} 
                    style={styles.imageLogoStyle}
                />


                <ButtonWithImage 
                    onPress={this.signInGoogle.bind(this)}
                    imgSource={require('../../../assets/images/login/google.png')}
                >Sign in with Google
                </ButtonWithImage> 
                <ButtonWithImage 
                    onPress={this.signInOSM.bind(this)}
                    imgSource={require('../../../assets/images/login/osm.png')}
                >Sign in with OSM
                </ButtonWithImage> 
                <ButtonWithImage 
                    onPress={this.signInFacebook.bind(this)}
                    imgSource={require('../../../assets/images/login/facebook.png')}
                >Sign in with Facebook
                </ButtonWithImage>           
            </View>
        );
    }
}

const styles = {
    bgColor: {
        flex: 1,
        justifyContent: 'center'
    },
    imageLogoStyle: {
         marginBottom: 30,
         width: 300,
         height: 300
     },
     buttonStyle: {
         color: 'black',
        width: 312,
        height: 48,
        backgroundColor: 'transparent'
     }
};

export default LoginBox;
