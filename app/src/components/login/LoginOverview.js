import React, { Component } from 'react';
import { 
    View
 } from 'react-native';
import { connect } from 'react-redux';
import LoginBox from './LoginBox';
import AppLoader from '../../AppLoader';

class LoginOverview extends Component {

    renderView() {
        if (this.props.loggedIn == null) {
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

 const mapStateToProps = ({ authReducer }) => {
    const { loggedIn } = authReducer;
    return { loggedIn };
};

export default connect(mapStateToProps, {})(LoginOverview);
