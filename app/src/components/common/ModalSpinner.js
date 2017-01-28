import React from 'react';
import {
    Modal
} from 'react-native';
import { Spinner } from '../common';

const ModalSpinner = ({ hideModal, visible }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={() => hideModal()}
        >
            <Spinner style={styles.spinnerStyle} />
        </Modal>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        opacity: 0.6
    }
};

export { ModalSpinner };
