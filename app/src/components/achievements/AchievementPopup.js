import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import I18n from 'react-native-i18n';
import { Popup } from '../common/';

class AchievementPopup extends Component {

    createMessage(message, achieved, achievementDate) {
        if (achieved) {
            return I18n.t('achievements_message_congratulations_award', 
                { message, achievementDate });
        }
        return message;
    }

    renderAnimatedImage(uri) {
        return (
            <Animatable.Image
                animation="bounceIn" 
                easing="ease-out" 
                iterationCount={this.props.animateIndef ? 'infinite' : 1}
                style={styles.badgeStyle}
                source={{ uri }}
                defaultSource={{ uri: 'placeholder_badge' }}
            />
        );
    }

    renderImage(uri, achieved) {
        return (
            <Image
                style={styles.badgeStyle}
                source={{ uri }}
                defaultSource={{ uri: 'placeholder_badge' }}
            >
                    <View style={achieved ? {} : styles.notAchievedStyle} />
            </Image>
        );
    }

    render() {
        const { achievementImageURI, achievementTitle, achievementDescription, 
            achieved, achievementDate } = this.props.achievement;
        return (  
            <Popup
                visible={this.props.visible}
                onAccept={this.props.onAccept}
                title={achievementTitle}
                message={this.createMessage(achievementDescription, 
                    achieved, achievementDate)}
            >
                {achieved ? this.renderAnimatedImage(achievementImageURI) : 
                    this.renderImage(achievementImageURI)}
            </Popup>
        );
    }
}

const styles = {
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

export default AchievementPopup;
