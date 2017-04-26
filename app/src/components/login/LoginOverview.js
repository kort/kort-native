import React, { Component } from 'react';
import { 
    View
 } from 'react-native';
import { connect } from 'react-redux';
import LoginBox from './LoginBox';
import AppLoader from '../../AppLoader';
import { setAppSettingsLoaded } from '../../actions/SettingsActions';

class LoginOverview extends Component {

    renderView() {
        if (this.props.loggedIn == null && !this.props.appSettingsLoaded) {
            console.log('app loader');
            this.props.setAppSettingsLoaded(true);
            return <AppLoader />;
        } else if (this.props.loggedIn) {
            return null;
        }
        return (
            <LoginBox onLogin={this.onLogin} />            
        );
    }

    render() {
        return (
            <View style={styles.backgroundStyle}>
                {this.renderView()}    
            </View>
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

 const mapStateToProps = ({ authReducer, settingsReducer }) => {
    const { loggedIn } = authReducer;
    const { appSettingsLoaded } = settingsReducer;
    return { loggedIn, appSettingsLoaded };
};

export default connect(mapStateToProps, { setAppSettingsLoaded })(LoginOverview);
