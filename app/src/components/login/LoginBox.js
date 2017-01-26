import React, { Component } from 'react';
import {
    View,
    Image,
    Linking,
    Modal,
} from 'react-native';
import { Actions } from 'react-native-router-flux'; 
import { GoogleSignin } from 'react-native-google-signin';
import _ from 'lodash';
import { ButtonWithImage, CustomWebView, Button, Spinner } from '../common';
import Config from '../../constants/Config';
import KortAPI from '../../data/KortAPI';

class LoginBox extends Component {

    state = { modalMode: '' };

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
            const urlPairs = _.chain(url)
                .replace('kortapp://', '')
                .split('?')
                .map()
                .value()
                ;
            this.secretReceived(urlPairs[1]);
        }
    }

    configureGoogleSignIn() {
        GoogleSignin.configure({
        iosClientId: Config.GOOGLE_IOS_CLIENT_ID, 
        webClientId: Config.GOOGLE_WEB_CLIENT_ID
        })
        .then(() => {
                GoogleSignin.currentUserAsync().then((user) => {
                this.setState({ user });
                if (this.state.user) {
                    console.log(GoogleSignin.currentUser());
                    this.verifyGoogleIdToken(this.state.user.idToken);
                }
            }).done();
        });
    }

    signInGoogle() {
        GoogleSignin.signIn()
        .then((user) => {
            console.log('signing in');
            this.setState({ user });
            console.log(this.state.user);
            if (this.state.user) {
                this.verifyGoogleIdToken(this.state.user.idToken);
            }
        })
        .catch((err) => {
            console.log('WRONG SIGNIN', err);
        })
        .done();            
    }

    verifyGoogleIdToken(token) {
    this.setState({ modalMode: 'showSpinner' });        
        console.log('verify ', token);
        const api = new KortAPI();
        api.verifyUser(token)
            .then(response => this.secretReceived(response))
            .catch(error => console.log(error));
    }

    secretReceived(data) {
        console.log(data);
        this.hideModal();
        Actions.root();
    }

    signInOSM() {
        this.setState({ 
            modalMode: 'showWebView', 
            uri: `${Config.API_URL}${Config.OSM_LOGIN}`
        });        
    }

    hideModal() {
        this.setState({ modalMode: '' });
    }

    signInFacebook() {
        
    }

    proceedWithoutLogin() {
        this.hideModal();
        Actions.root();
    }

    onWebViewError() {
        console.log('error');
    }

    renderModal() {
        switch (this.state.modalMode) {
            case 'showWebView': {
            return (
                <Modal
                    visible
                    transparent
                    animationType='slide'
                    onRequestClose={() => this.hideModal()}
                >
                    <CustomWebView 
                        uri={this.state.uri} 
                        error={() => this.onWebViewError()}
                    />
                </Modal>
            );
            }
            
            case 'showSpinner': {
            return (    
                <Modal
                    visible
                    transparent
                    animationType='fade'
                    onRequestClose={() => this.hideModal()}
                >
                    <Spinner style={styles.spinnerStyle} />
                </Modal>);
            }
            default: {
            return (
                <View />
            );
            }
        }
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
                <Button 
                    style={{ marginTop: 20 }}
                    onPress={this.proceedWithoutLogin.bind(this)}
                >Proceed without login
                </Button>          
            </View>
            
           {this.renderModal()}
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
     spinnerStyle: {
         backgroundColor: '#000',
         opacity: 0.6

     },
     buttonStyle: {
         color: 'black',
        width: 312,
        height: 48,
        backgroundColor: 'transparent'
     }
};

export default LoginBox;
