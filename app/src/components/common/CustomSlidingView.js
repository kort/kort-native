import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SlidingView from './SlidingView';

class CustomSlidingView extends Component {

    state = { isOpen: false, clickEvent: '' };

    isOpen(open) {
        this.setState({ isOpen: open, clickEvent: '' });
    }

    openView() {
        this.setState({ clickEvent: 'open' });
    }

    closeView() {
        this.setState({ clickEvent: 'close' });  
    }

    renderIcon() {
        if (this.state.isOpen) {
            return (
                    <View style={styles.drawerStyle}>
                        <Icon 
                            style={styles.iconStyle} 
                            size={30} 
                            name='arrow-drop-down' 
                            onPress={this.closeView.bind(this)}
                        />
                    </View>
                )
            ;
        }
            return (
                    <View style={styles.drawerStyle}>
                        <Icon 
                            style={styles.iconStyle} 
                            size={30} 
                            name='arrow-drop-up'
                            onPress={this.openView.bind(this)}
                        />
                    </View>)
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
            clickEvent={this.state.clickEvent}
        >
        <View>
            {this.renderIcon()}

            {this.props.children}
        </View>
        </SlidingView>
        );
    }
}

const styles = {
    drawerStyle: {
        backgroundColor: '#395971',
        height: 20
    },
    iconStyle: {
        borderRadius: 10,
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#395971',
        
    }
};

export { CustomSlidingView };
