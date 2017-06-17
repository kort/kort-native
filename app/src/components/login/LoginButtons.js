import React from 'react';
import {
  View
} from 'react-native';
import I18n from 'react-native-i18n';
import * as Animatable from 'react-native-animatable';
import { Button, ButtonWithImage } from '../common';

const LoginButtons = ({ signInGoogle, signInOSM, signInFacebook, proceedWithoutLogin }) => {
    return (
            <View style={styles.bgColor}>
                <Animatable.Image
                    animation="fadeIn" easing="ease-out" iterationCount={1}
                    style={styles.imageLogoStyle}
                    source={{ uri: 'kort_logo' }}
                />
                <ButtonWithImage 
                    onPress={signInGoogle}
                    imgSource={'google'}
                >{I18n.t('login_button_sign_in_with', { provider: 'Google' })}
                </ButtonWithImage> 
                <ButtonWithImage 
                    onPress={signInOSM}
                    imgSource={'osm'}
                >{I18n.t('login_button_sign_in_with', { provider: 'OSM' })}
                </ButtonWithImage> 
                {/*<ButtonWithImage 
                    onPress={signInFacebook}
                    imgSource={'facebook'}
                >{I18n.t('login_button_sign_in_with', { provider: 'Facebook' })}
                </ButtonWithImage>  */}
                <Button 
                    style={{ marginTop: 20 }}
                    onPress={proceedWithoutLogin}
                >{I18n.t('login_button_sign_in_without_login')}
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
