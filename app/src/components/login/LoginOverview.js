import React, { Component } from 'react';
import { 
    Modal,
    View
 } from 'react-native';
import LoginBox from './LoginBox';

class LoginOverview extends Component {

    state = { 
        showModal: true, 
        animationType: 'none', 
        providers: ['Google', 'Facebook', 'OSM'],
        selectedProvider: 'Google',
        selectedProviderImage: require('../../../assets/images/login/google.png')
    };


    onLogin() {
        this.setState({ showModal: false });
    }

    onShow() {
        this.setState({ animationType: 'slide' });
    }

    onOptionSelect(index, value) {
        switch (value) {

            case 'Google':
                this.setState({ selectedProviderImage: require('../../../assets/images/login/google.png') });
                break;
            case 'Facebook':
                this.setState({ selectedProviderImage: require('../../../assets/images/login/facebook.png') });
                break;
            case 'OSM':
                this.setState({ selectedProviderImage: require('../../../assets/images/login/osm.png') });
                break;
            default:
                this.setState({ selectedProviderImage: '' });
        }
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
                        <LoginBox
                            onLogin={this.onLogin.bind(this)}
                            options={this.state.providers}
                            onOptionSelect={this.onOptionSelect.bind(this)}
                            selectedOption={this.state.selectedProviderImage}
                        />
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
