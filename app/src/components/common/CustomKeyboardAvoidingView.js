import React, { Component } from 'react';
import {
    Platform,
    KeyboardAvoidingView,
    View 
} from 'react-native';

class CustomKeyboardAvoidingView extends Component {

    render() {
        if (Platform.OS === 'ios') {
            return (
                <KeyboardAvoidingView
                    behavior='position'
                >
                    {this.props.children}
                </KeyboardAvoidingView>
            );
        }
        return (
            <View
                behavior='position'
            >
                {this.props.children}
            </View>
        );
    }
}

export { CustomKeyboardAvoidingView };
