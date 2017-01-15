import React, { Component } from 'react';
import { 
    Modal,
    View
 } from 'react-native';
import LoginBox from './LoginBox';

class LoginOverview extends Component {

    state = { showModal: true, animationType: 'none' };

    onLogin() {
        this.setState({ showModal: false });
    }

    onShow() {
        this.setState({ animationType: 'slide' });
    }
    
    render() {
        return (
                <Modal
                    visible={this.state.showModal}
                    animationType={this.state.animationType}
                    onShow={this.onShow.bind(this)}
                    onRequestClose={() => {}}
                >
                    <View style={styles.backgroundStyle} >
                        <LoginBox onLogin={this.onLogin.bind(this)} />

                    </View>
         </Modal>
        );
    }
}

const styles = {
     backgroundStyle: {
         backgroundColor: '#395971',
         justifyContent: 'center',
         alignItems: 'center',
         flex: 1
     }
 };

export default LoginOverview;
