import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import { Button } from '../common';

class Showcase extends Component {

    hideShowcase() {
        Actions.pop();
    }

    render() {
        return (
            <View 
                style={styles.bgColor}
            >
                <View style={styles.infoStyle}>
                    <Button 
                    style={styles.buttonStyle}
                    onPress={this.hideShowcase.bind(this)}
                >Let's start!
                </Button> 
                </View>
                
            </View>
        );
    }
}

const styles = {
    buttonStyle: {
        width: 200,
    },
    infoStyle: {
        justifyContent: 'center',
        height: 300
    },
    bgColor: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#395971',
        flex: 1,
    }
};

export default (Showcase);
