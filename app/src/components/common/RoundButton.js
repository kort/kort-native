import React from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RoundButton = ({ onPress, style, iconName }) => {
    const { buttonStyle, iconStyle } = styles;
    return (
        <View style={[style, buttonStyle]}>
        <TouchableOpacity
            
            onPress={onPress}
        >
        <Icon style={iconStyle} name={iconName} />
        </TouchableOpacity>
        </View>
    );
};

const styles = {
    iconStyle: {
        fontSize: 24,
        backgroundColor: 'transparent',
        color: '#395971'
    },
    buttonStyle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'white',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
};

export { RoundButton };
