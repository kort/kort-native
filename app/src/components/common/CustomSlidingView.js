import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SlidingView from './SlidingView';

class CustomSlidingView extends Component {

    state = { isOpen: false };

    isOpen(open) {
        this.setState({ isOpen: open });
    }

    renderIcon() {
        if (this.state.isOpen) {
            return (
                    <Icon 
                        style={{ textAlign: 'center', backgroundColor: '#395971' }} 
                        size={20} 
                        name='arrow-drop-down' 
                    />)
            ;
        }
            return (
                    <Icon 
                        style={{ textAlign: 'center', backgroundColor: '#395971' }} 
                        size={20} 
                        name='arrow-drop-up' 
                    />)
            ; 
    }

    render() {
        return (
        <SlidingView
            threshold={5}
            tension={50}
            friction={10}
            heights={this.props.heights}
            isOpen={this.isOpen.bind(this)}
        >
        <View>
            {this.renderIcon()}

            {this.props.children}
        </View>
        </SlidingView>
        );
    }
}

export { CustomSlidingView };
