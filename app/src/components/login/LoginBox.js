import React, { Component } from 'react';
import {
    View,
    Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'; 
import { GoogleSignin } from 'react-native-google-signin';
import I18n from 'react-native-i18n';
import { ModalSpinner, ModalWebView, Popup } from '../common';
import LoginButtons from './LoginButtons';
import Config from '../../constants/Config';
import { loginUser, showWebView, verifyGoogleIdToken, 
    parseURL, clearErrorMsg } from '../../actions/AuthActions';

class LoginBox extends Component {

    componentDidMount() {
        //init google play services
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            console.log('logged in', this.props.loggedIn);
            if (this.props.loggedIn === null) {
                this.configureGoogleSignIn();
            }
        });
        //init deep linking listeners
        Linking.addEventListener('url', this.appWokeUp);
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.props.parseURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.appWokeUp);
    }

    onAccept() {
        this.props.clearErrorMsg();
    }

    onWebViewError(errorDomain, errorCode, errorDesc) {
        console.log('error ', errorDomain, errorCode, errorDesc);
        if (errorCode !== 102) {
            this.hideModal();
        }
    }

    signInOSM() {
        this.props.showWebView(`${Config.API_URL}${Config.OSM_LOGIN}`);        
    }

    hideModal() {
        console.log('hide webview');
        this.props.showWebView('');
    }

    signInFacebook() {
        //TODO
    }

    proceedWithoutLogin() {
        Actions.root();
    }

    configureGoogleSignIn() {
        console.log('google login configure');
        GoogleSignin.configure({
        iosClientId: Config.GOOGLE_IOS_CLIENT_ID, 
        webClientId: Config.GOOGLE_WEB_CLIENT_ID
        })
        .then(() => {
                GoogleSignin.currentUserAsync().then((user) => {
                this.setState({ user });
                if (user) {
                    console.log(GoogleSignin.currentUser());
                    this.verifyGoogleIdToken(user.idToken);
                }
            }).done();
        });
    }

    signInGoogle() {
        console.log('google login SIGIN');
        GoogleSignin.signIn()
        .then((user) => {
            console.log('signing in');
            this.setState({ user });
            console.log(this.state.user);
            if (user) {
                this.verifyGoogleIdToken(user.idToken);
            }
        })
        .catch((err) => {
            console.log('WRONG SIGNIN', err);
        })
        .done();            
    }

    verifyGoogleIdToken(token) {
        this.props.verifyGoogleIdToken(token);
    }

    appWokeUp = (event) => {
        this.props.parseURL(event.url);
        this.hideModal();
    }

    render() {
        return (
            <View>
                <LoginButtons 
                    signInGoogle={this.signInGoogle.bind(this)} 
                    signInOSM={this.signInOSM.bind(this)} 
                    signInFacebook={this.signInFacebook.bind(this)} 
                    proceedWithoutLogin={this.proceedWithoutLogin.bind(this)} 
                />
                <ModalSpinner 
                    visible={this.props.loading}
                    hideModal={() => this.hideModal()} 
                />
                <ModalWebView 
                        uri={this.props.webviewURI} 
                        error={(errorDomain, errorCode, errorDesc) => 
                            this.onWebViewError(errorDomain, errorCode, errorDesc)} 
                        onRequestClose={() => this.hideModal()}
                        visible={this.props.webviewURI !== ''} 
                />    
                <Popup
                        visible={this.props.errorMsg !== null}
                        onAccept={this.onAccept.bind(this)}
                        message={I18n.t('error_message_bad_connectivity')}
                />       
            </View>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    const { loggedIn, loading, webviewURI, errorMsg } = authReducer;
    return { loggedIn, loading, webviewURI, errorMsg };
};

export default connect(mapStateToProps, { 
    loginUser, showWebView, verifyGoogleIdToken, parseURL, clearErrorMsg })(LoginBox);
