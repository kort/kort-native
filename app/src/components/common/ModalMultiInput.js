import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    Modal,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';

const ModalMultiInput = ({ visible, value, onChangeText, onPress }) => {
    const { containerStyle, inputStyle, modalStyle } = styles;

    return (
        <Modal
            visible={visible}
            transparent
            animationType='none'
            onRequestClose={() => {}}
        >
                <TouchableWithoutFeedback onPress={onPress} >
                <View style={containerStyle}>
                    <KeyboardAvoidingView style={modalStyle}>
                        <TextInput
                                style={inputStyle}
                                onChangeText={onChangeText}
                                value={value}
                                multiline
                        />  
                    </KeyboardAvoidingView>                          
                </View>
                </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = {
    inputStyle: {
        color: '#395971',
        backgroundColor: 'white',
        height: 300, 
        width: 300,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 20,
        lineHeight: 23,
        flex: 2,
    },
    containerStyle: {
         backgroundColor: 'rgba(0, 0, 0, 0.6)',
         position: 'relative',
         alignItems: 'center',
         flex: 1,
         justifyContent: 'center'
     },
     modalStyle: {
         height: 300
     }
};


export { ModalMultiInput };
