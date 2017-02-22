import React, { Component } from 'react';
import {
        Text,
        Image
     } from 'react-native';
import * as Animatable from 'react-native-animatable';

class KortCoin extends Component {
    renderKoin() {
        if (this.props.animationStyle === 'pulse') {
            return (
                <Animatable.Image
                    animation="pulse" easing="ease-out" iterationCount="infinite" 
                    style={[styles.koinStyle]}
                    source={{ uri: 'koin' }}
                    defaultSource={{ uri: 'placeholderBadge' }}
                >
                <Text style={styles.amountStyle}>{this.props.children}</Text>
                </Animatable.Image>
            );
        }
        else if (this.props.animationStyle === 'win') {
            return (
                <Animatable.Image
                    animation="tada" easing="ease-out" iterationCount="infinite" 
                    style={[styles.koinStyle]}
                    source={{ uri: 'koin' }}
                    defaultSource={{ uri: 'placeholderBadge' }}
                >
                <Text style={styles.amountStyle}>{this.props.children}</Text>
                </Animatable.Image>
            );
        } 
        return (
            <Image
                style={[styles.koinStyle]}
                source={{ uri: 'koin' }}
                defaultSource={{ uri: 'placeholderBadge' }}
            >
                <Text style={styles.amountStyle}>{this.props.children}</Text>
            </Image>
            );
    }

    render() {
        return (
            this.renderKoin()
        );
    }
    
}

const styles = {
    amountStyle: {
        backgroundColor: 'transparent',
        color: '#C89E1E',
        textAlign: 'center',
        fontSize: 25,
        marginLeft: 0,
        marginRight: 0,
        fontFamily: 'Britannic-BoldT.',
    },
    koinStyle: {
        justifyContent: 'center',
        height: 60,
        width: 60,
        alignSelf: 'center',
    },
};

export { KortCoin };
