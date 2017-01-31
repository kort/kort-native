import React, { Component } from 'react';
import { 
    View
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginBox from './LoginBox';

class LoginOverview extends Component {
    constructor() {
        super();
        this.onLogin = this.onLogin.bind(this);
    }


    onLogin() {

    }

    renderView() {
        if (this.props.loggedIn) {
            Actions.root();
            return <View style={styles.backgroundStyle} />;
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

 const mapStateToProps = ({ auth }) => {
    const { loggedIn, kortSecret } = auth;
    return { loggedIn, kortSecret };
};

export default connect(mapStateToProps, {})(LoginOverview);
