import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import I18n from 'react-native-i18n';
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
            return I18n.t('achievements_message_congratulations_award', 
                { message, achievementDate });
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
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View style={styles.itemStyle}>
                        {this.renderImage(achievementImageURI, achieved)}
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
            </TouchableWithoutFeedback>

        );
    }
}

const deviceWidth = Dimensions.get('window').width;

const styles = {
    itemStyle: {
        backgroundColor: 'transparent',
        margin: (deviceWidth <= 320) ? 0 : 5,
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
