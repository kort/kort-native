import React from 'react';
import {
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button, ButtonWithImage } from '../common';

const LoginButtons = ({ signInGoogle, signInOSM, signInFacebook, proceedWithoutLogin }) => {
    return (
            <View style={styles.bgColor}>
                <Animatable.Image
                    animation="fadeIn" easing="ease-out" iterationCount={1}
                    style={styles.imageLogoStyle}
                    source={{ uri: 'kortLogo' }}
                />
                <ButtonWithImage 
                    onPress={signInGoogle}
                    imgSource={'google'}
                >Sign in with Google
                </ButtonWithImage> 
                <ButtonWithImage 
                    onPress={signInOSM}
                    imgSource={'osm'}
                >Sign in with OSM
                </ButtonWithImage> 
                <ButtonWithImage 
                    onPress={signInFacebook}
                    imgSource={'facebook'}
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
