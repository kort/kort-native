import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonWithIcon = ({ onPress, iconName }) => {
    const { buttonStyle } = styles;

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
        >
            <Ionicons 
                style={{ color: '#FFFFFF', alignSelf: 'center' }}
                size={25} 
                name={iconName} 
            />
        </TouchableOpacity>

    );
};

const styles = {
    buttonStyle: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 3,
        marginBottom: 3
    
    }
};


export { ButtonWithIcon };
