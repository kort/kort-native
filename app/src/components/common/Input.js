import React from 'react';
import {
    TextInput,
    View
} from 'react-native';

const Input = ({ value, onChangeText, placeHolder, secureTextEntry, keyboardType }) => {
    const { containerStyle, inputStyle } = styles;

    return (
        <View style={containerStyle}>
            <TextInput 
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}
                autoCorrect={false}
                placeholder={placeHolder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#ffffff',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 20,
        lineHeight: 23,
        flex: 2,
        textAlign: 'center'
    },
    containerStyle: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    }
};


export { Input };
