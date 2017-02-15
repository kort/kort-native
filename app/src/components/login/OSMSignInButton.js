import React from 'react';
import { ButtonWithImage } from './../common';

const OSMSignInButton = ({ onPress }) => {
    return (
        <ButtonWithImage 
            onPress={onPress}
            imgSource={require('../../../assets/images/login/osm.png')}
        >Sign in with OSM</ButtonWithImage>
    );
};

export default OSMSignInButton;
