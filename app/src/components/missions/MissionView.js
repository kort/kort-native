import React, { Component } from 'react';
import {
    View,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomKeyboardAvoidingView } from '../common';
import CustomSlidingView from '../common/CustomSlidingView';

class MissionView extends Component {

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
                    <TouchableWithoutFeedback 
                        style={styles.drawerStyle}
                        onPress={this.closeView.bind(this)}
                    >
                        <Icon 
                            style={styles.iconStyle} 
                            size={30} 
                            name='arrow-drop-down' 
                        />
                    </TouchableWithoutFeedback>
                )
            ;
        }
            return (
                    <TouchableWithoutFeedback 
                        style={styles.drawerStyle}
                        onPress={this.openView.bind(this)}
                    >
                        <Icon 
                            style={styles.iconStyle} 
                            size={30} 
                            name='arrow-drop-up'
                        />
                    </TouchableWithoutFeedback>)
            ; 
    }

    render() {
        return (
        <CustomKeyboardAvoidingView>
        <CustomSlidingView
            threshold={5}
            tension={50}
            friction={10}
            heights={this.props.heights}
            isOpen={this.isOpen.bind(this)}
            clickEvent={this.state.clickEvent}
            lockSlider={this.props.answerModalVisible}
        >
        <View>
            {this.renderIcon()}
            {this.props.children}
        </View>
        </CustomSlidingView>
        </CustomKeyboardAvoidingView>
        );
    }
}

const styles = {
    drawerStyle: {
        height: 20
    },
    iconStyle: {
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#395971',
        color: 'white'
        
    }
};

const mapStateToProps = ({ answerReducer }) => {
    const { answerModalVisible } = answerReducer;
    return { answerModalVisible };
};


export default connect(mapStateToProps, {})(MissionView);
