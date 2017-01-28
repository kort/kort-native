import React from 'react';
import {
    Modal
} from 'react-native';
import { CustomWebView } from '../common';

const ModalWebView = ({ uri, error, onRequestClose, visible }) => {
    console.log(uri);
    return (
        <Modal
                    visible={visible}
                    transparent
                    animationType='slide'
                    onRequestClose={onRequestClose}
        >
                    <CustomWebView 
                        uri={uri} 
                        error={error}
                    />
                </Modal>
    );
};

export { ModalWebView };
