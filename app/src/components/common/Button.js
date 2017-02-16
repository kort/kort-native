import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

const Button = ({ onPress, children, style }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity
            style={[buttonStyle, style]}
            onPress={onPress}
        >
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>

    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#395971',
        backgroundColor: 'transparent',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#657C8E',
        marginLeft: 5,
        marginRight: 5,
    }
};


export { Button };
