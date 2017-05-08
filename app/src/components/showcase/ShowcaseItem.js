import React, { } from 'react';
import {
    View,
    Text
} from 'react-native';
import { Button } from '../common';

const ShowcaseItem = ({ title, description, buttonText, buttonAction, children }) => {
    const { infoStyle, iconStyle, titleStyle, descriptionStyle, buttonStyle } = styles;

    return (
        <View style={infoStyle}>
            <View 
                style={iconStyle}
            >
            {children}
            </View>
            <Text style={titleStyle}>{title}</Text>
            <Text style={descriptionStyle}>{description}</Text>
            <Button 
                style={buttonStyle}
                onPress={buttonAction}
            >{buttonText}
            </Button> 
        </View>
        );
};

const styles = {
    iconStyle: {
        width: 200,
        height: 200,
        marginBottom: 20,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        width: 150,
        height: 250,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#657C8E',
        marginBottom: 20,
        justifyContent: 'flex-end'
    },
    buttonStyle: {
        alignSelf: 'center',
        width: 200,
    },
    titleStyle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    descriptionStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 50
    },
    infoStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300
    },
    bgColor: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#395971',
        flex: 1,
    }
};

export default (ShowcaseItem);
