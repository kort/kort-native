import React, { Component } from 'react';
import {
    Animated,
        Text,
        TouchableWithoutFeedback
     } from 'react-native';

class KortCoin extends Component {

    state = {
        bounceValue: new Animated.Value(0)
    }
    
    componentDidMount() {
        this.animate();
    }

    animate() {
        if (this.props.animated) {
            this.state.bounceValue.setValue(2.0);
            Animated.spring(
            this.state.bounceValue,
            {
                toValue: 1.0,
                friction: 0.5,
            }
        ).start();
        }
    }

    render() {
        const animatedStyle = {
            transform: [                       
            { scale: this.state.bounceValue },
          ]
        };
        return (
            <TouchableWithoutFeedback
                onPress={this.animate.bind(this)}
            >
                <Animated.Image
                    style={[styles.koinStyle, this.props.animated ? animatedStyle : {}]}
                    source={{ uri: 'koin' }}
                    defaultSource={{ uri: 'placeholderBadge' }}
                >
                <Text style={styles.amountStyle}>{this.props.children}</Text>
                </Animated.Image>
            </TouchableWithoutFeedback>
        );
    }
    
}

const styles = {
    amountStyle: {
        backgroundColor: 'transparent',
        color: '#C89E1E',
        textAlign: 'center',
        fontSize: 25,
        marginLeft: 10,
        marginRight: 10,
        fontFamily: 'Britannic-BoldT.',
    },
    koinStyle: {
        justifyContent: 'center',
        height: 70,
        width: 70,
        alignSelf: 'center',
    },
};

export { KortCoin };
