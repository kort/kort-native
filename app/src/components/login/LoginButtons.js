import React from 'react';
import {
  View,
  Image
} from 'react-native';
import { Button, ButtonWithImage } from '../common';

const LoginButtons = ({ signInGoogle, signInOSM, signInFacebook, proceedWithoutLogin }) => {
    return (
            <View style={styles.bgColor}>
                <Image 
                    source={require('../../../assets/images/login/kortLogo.png')} 
                    style={styles.imageLogoStyle}
                />
                <ButtonWithImage 
                    onPress={signInGoogle}
                    imgSource={require('../../../assets/images/login/google.png')}
                >Sign in with Google
                </ButtonWithImage> 
                <ButtonWithImage 
                    onPress={signInOSM}
                    imgSource={require('../../../assets/images/login/osm.png')}
                >Sign in with OSM
                </ButtonWithImage> 
                <ButtonWithImage 
                    onPress={signInFacebook}
                    imgSource={require('../../../assets/images/login/facebook.png')}
                >Sign in with Facebook
                </ButtonWithImage>  
                <Button 
                    style={{ marginTop: 20 }}
                    onPress={proceedWithoutLogin}
                >Proceed without login
                </Button>          
            </View>
    );
};

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
};


export default LoginButtons ;
