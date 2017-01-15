import React from 'react';
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { 
     Button,
     Input
} from '../common';


const LoginBox = ({ onLogin, options, onOptionSelect, selectedOption }) => {
        return (
            <KeyboardAvoidingView style={styles.loginBoxStyle} behavior='position'>
                <Image 
                    source={require('../../../assets/images/login/kortLogo.png')} 
                    style={styles.imageLogoStyle}
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
                <View style={styles.dropdownStyle}>
                <Image 
                        style={styles.providerImageStyle}
                        source={require('../../../assets/images/login/cloud.png')}
                />
                    <ModalDropdown options={options} onSelect={onOptionSelect}>
                        <Image 
                            source={selectedOption}
                            style={styles.imageOptionStyle} 
                        />
                    </ModalDropdown>
                </View>
                <Button onPress={onLogin} style={styles.buttonStyle}>
                    Login
                    </Button>
            </KeyboardAvoidingView>
        );
};

const styles = {
    dropdownStyle: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    loginBoxStyle: {
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
     imageLogoStyle: {
         marginBottom: 30,
         width: 300,
         height: 300
     },
    imageOptionStyle: {
         width: 30,
         height: 30
     },
     buttonStyle: {
         justifyContent: 'flex-end',
         marginTop: 30,
         marginBottom: 10
     },
     providerImageStyle: {
        paddingLeft: 20,
        marginRight: 10,
        height: 30,
        width: 30,
        tintColor: '#657C8E'
     }
};

export default LoginBox;
