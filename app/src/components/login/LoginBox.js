import React from 'react';
import {
    View,
    Image,
    ScrollView
} from 'react-native';
import { 
     Button,
     Input
} from '../common';

const LoginBox = ({ onLogin }) => {
        return (
            <View style={styles.loginBoxStyle}>
                <Image source={require('../../../assets/images/login/kortLogo.png')} />
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
            </View>
        );
};

const styles = {
        loginBoxStyle: {
        justifyContent: 'flex-end',
         paddingBottom: 150,
         backgroundColor: 'transparent'
    },
     buttonStyle: {
         justifyContent: 'flex-end',
         marginTop: 30
     }
};

export default LoginBox;
