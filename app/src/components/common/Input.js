import React from 'react';
import {
    TextInput,
    View,
    Image
} from 'react-native';

const Input = ({ value, onChangeText, placeHolder, secureTextEntry, imgSource, keyboardType }) => {
    const { containerStyle, imageStyle, inputStyle } = styles;

    return (
        <View style={containerStyle}>
            <Image style={imageStyle} source={imgSource} />
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
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    imageStyle: {
        paddingLeft: 20,
        height: 30,
        width: 30,
        tintColor: '#657C8E'
    },
    containerStyle: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    }
};


export { Input };
