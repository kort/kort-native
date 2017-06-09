import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import AchievementPopup from './AchievementPopup';

class AchievementItem extends Component {

    state = { showModal: false };

    onRowPress() {
        this.setState({ showModal: true });
    }

    onAccept() {
        this.setState({ showModal: false });
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
        const { achievementImageURI, achieved } = this.props.achievement;
        return (  
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View style={styles.itemStyle}>
                        {this.renderImage(achievementImageURI, achieved)}
                    <AchievementPopup
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        achievement={this.props.achievement}
                    />
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
