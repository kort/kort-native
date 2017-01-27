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
import { loginUser, showWebView, verifyGoogleIdToken, 
         secretReceived, parseURL } from '../../actions/AuthActions';

class LoginBox extends Component {

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
                this.props.handleURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.appWokeUp);
    }

    onWebViewError(err) {
        console.log('error ', err);
    }

    signInOSM() {
        this.props.showWebView(`${Config.API_URL}${Config.OSM_LOGIN}`);        
    }

    hideModal() {
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

    renderLoadingModal() {
        if (this.props.loading) {
            return (
                <ModalSpinner hideModal={() => this.hideModal()} />
            );
        }
        return <View />;
    }

    renderWebViewModal() {
        if (this.props.webviewURI) {
            return (
                <ModalWebView 
                    uri={this.props.webviewURI} 
                    error={(err) => this.onWebViewError(err)} 
                    onRequestClose={() => this.hideModal()} 
                />
            );
        }
        return <View />;
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
            {this.renderLoadingModal()}
            {this.renderWebViewModal()}
           </View>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    console.log(auth);
    const { loggedIn, modalMode, kortSecret, loading, webviewURI } = auth;
    return { loggedIn, modalMode, kortSecret, loading, webviewURI };
};

export default connect(mapStateToProps, { 
    loginUser, showWebView, verifyGoogleIdToken, secretReceived, parseURL
})(LoginBox);
