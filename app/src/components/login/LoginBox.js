import React, { Component } from 'react';
import {
    View,
    Image,
    Linking,
    Modal,
} from 'react-native';
import { Actions } from 'react-native-router-flux'; 
import { GoogleSignin } from 'react-native-google-signin';
import { ButtonWithImage, CustomWebView } from '../common';
import Config from '../../constants/Config';

class LoginBox extends Component {

    state = { showModal: false };

    componentDidMount() {
        //init google play services
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
        this.configureGoogleSignIn();
                console.log('configured');
        });

        //init deep linking listeners
        Linking.addEventListener('url', this.appWokeUp);
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.handleURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.appWokeUp);
    }

    appWokeUp = (event) => {
        console.log('woke up');
        this.handleURL(event.url);
        this.hideModal();
    }

    handleURL(url) {
        if (url) {
            console.log(url);
        }
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
        this.setState({ 
            showModal: true, 
            uri: 'http://localhost:5000/osm/login' 
        });        
    }

    hideModal() {
        this.setState({ showModal: false });
    }

    signInFacebook() {

    }

    render() {
        return (
            <View>
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
           <Modal
            visible={this.state.showModal}
            transparent
            animationType='slide'
            onRequestClose={() => this.hideModal()}
           >
            <CustomWebView uri={this.state.uri} />
           </Modal>
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
