import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Popup } from '../common/';

class AchievementItem extends Component {

    state = { showModal: false };

    onRowPress() {
        this.setState({ showModal: true });
    }

    onAccept() {
        this.setState({ showModal: false });
    }

    createMessage(message, achieved, achievementDate) {
        if (achieved) {
            return `${message}\n\nCongratulations. You have earned this award on ${achievementDate}.`;
        }
        return message;
    }

    renderAnimatedImage(uri) {
        return (
            <Animatable.Image
                animation="bounceIn" easing="ease-out" iterationCount={1}
                style={styles.badgeStyle}
                source={{ uri }}
                defaultSource={{ uri: 'placeholderBadge' }}
            />
        );
    }

    renderImage(uri, achieved) {
        return (
                    <Image
                        style={styles.badgeStyle}
                        source={{ uri }}
                        defaultSource={{ uri: 'placeholderBadge' }}
                    >
                            <View style={achieved ? {} : styles.notAchievedStyle} />
                    </Image>
        );
    }

    render() {
        const { achievementImageURI, achievementDescription, 
            achieved, achievementDate } = this.props.achievement;
        return (  
                <View style={styles.itemStyle}>
                    <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                        {this.renderImage(achievementImageURI, achieved)}
                    </TouchableWithoutFeedback>
                    <Popup
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        message={this.createMessage(achievementDescription, 
                            achieved, achievementDate)}
                    >
                        {achieved ? this.renderAnimatedImage(achievementImageURI) : 
                            this.renderImage(achievementImageURI)}
                    </Popup>
                </View>
        );
    }
}

const styles = {
    itemStyle: {
        backgroundColor: 'transparent',
        margin: 5,
        height: 100,
        width: 100
    },
    badgeStyle: {
        alignSelf: 'center',
        marginTop: 10,
        width: 80,
        height: 80,
    },
    notAchievedStyle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }
};

export default AchievementItem;
