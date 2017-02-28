import React from 'react';
import {
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        width: (Platform.OS === 'ios') ? 34 : 42,
        height: (Platform.OS === 'ios') ? 34 : 42,
        borderRadius: (Platform.OS === 'ios') ? 17 : 21,
        backgroundColor: 'white',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
};

export { RoundButton };
