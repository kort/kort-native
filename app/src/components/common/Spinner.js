import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

const Spinner = ({ size, style }) => {
    return (
        <View style={[style, styles.spinnerStyle]}>
            <ActivityIndicator
                size={size || 'large'}
            />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { Spinner };
