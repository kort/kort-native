import React, { Component } from 'react';
import {
        Text
     } from 'react-native';
import * as Animatable from 'react-native-animatable';

class KortCoin extends Component {

    renderKoin() {
        let animationEffect = '';
        if (this.props.animationStyle === 'normal') {
            animationEffect = 'pulse';
        } else if (this.props.animationStyle === 'win') {
            animationEffect = 'jello';
        }
        return (
            <Animatable.Image
                animation={animationEffect} 
                easing="ease-out" 
                iterationCount="infinite" 
                style={[styles.koinStyle]}
                source={{ uri: 'koin' }}
                defaultSource={{ uri: 'placeholderBadge' }}
            >
                <Text style={styles.amountStyle}>{this.props.children}</Text>
            </Animatable.Image>
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
