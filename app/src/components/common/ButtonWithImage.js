import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const ButtonWithImage = ({ onPress, children, style, imgSource }) => {
    const { buttonStyle, textStyle, imgStyle } = styles;

    return (
        <TouchableOpacity
            style={[buttonStyle, style]}
            onPress={onPress}
        >
            <Image 
                source={{ uri: imgSource }}
                style={imgStyle}
            />
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>

    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#395971',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 0,
        borderColor: '#657C8E',
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        marginTop: 3,
        marginBottom: 3
    
    },
    imgStyle: {
        height: 25,
        width: 25,
        alignSelf: 'center',
        marginLeft: 8,
        marginRight: 15
    }
};


export { ButtonWithImage };
