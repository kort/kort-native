import React from 'react';
import {
    View,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import { 
     Button,
     Input
} from '../common';

const LoginBox = ({ onLogin }) => {
        return (
            <KeyboardAvoidingView style={styles.loginBoxStyle} behavior='position'>
                <Image 
                    source={require('../../../assets/images/login/kortLogo.png')} 
                    style={styles.imageStyle}
                />
                <Input
                    imgSource={require('../../../assets/images/tabIcons/profile.png')}
                    placeHolder={'user@gmail.com'}
                />
                <Input
                    imgSource={require('../../../assets/images/tabIcons/lock.png')}
                    placeHolder={'password'}
                    secureTextEntry
                />

                <Button onPress={onLogin} style={styles.buttonStyle}>
                    Login
                    </Button>
            </KeyboardAvoidingView>
        );
};

const styles = {
    loginBoxStyle: {
        justifyContent: 'flex-end',
         backgroundColor: 'transparent'
    },
     imageStyle: {
         marginBottom: 30,
         width: 300,
         height: 300
     },
     buttonStyle: {
         justifyContent: 'flex-end',
         marginTop: 30
     }
};

export default LoginBox;
