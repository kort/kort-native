import React, { Component } from 'react';
import {
    View,
    Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'; 
import { GoogleSignin } from 'react-native-google-signin';
import { ModalSpinner, ModalWebView } from '../common';
import LoginButtons from './LoginButtons';
import Config from '../../constants/Config';
import { loginUser, showWebView, verifyGoogleIdToken, parseURL } from '../../actions/AuthActions';

class LoginBox extends Component {

    componentDidMount() {
        //init google play services
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            this.configureGoogleSignIn();
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
            </View>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    console.log(authReducer);
    const { loggedIn, loading, webviewURI } = authReducer;
    return { loggedIn, loading, webviewURI };
};

export default connect(mapStateToProps, { 
    loginUser, showWebView, verifyGoogleIdToken, parseURL })(LoginBox);
