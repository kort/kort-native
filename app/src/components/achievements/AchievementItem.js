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
        // Actions.openAchievement({ achievement: this.props.achievement });
        this.setState({ showModal: true });
    }

    onAccept() {
        this.setState({ showModal: false });
    }

    render() {
        const { achievementImageURI, achievementDescription } = this.props.achievement;

        return (  
                <View style={styles.itemStyle}>
                    <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                        <Image
                            style={styles.badgeStyle}
                            source={{ uri: achievementImageURI }}
                            defaultSource={{ uri: 'placeholderBadge' }}
                        >
                        <View style={this.props.achieved ? styles.achievedStyle : {}} />
                        </Image>
                    </TouchableWithoutFeedback>
                    <Popup
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        message={achievementDescription}
                    >
                        <Animatable.Image
                            animation="shake" easing="ease-out" iterationCount="infinite"
                            style={styles.badgeStyle}
                            source={{ uri: achievementImageURI }}
                            defaultSource={{ uri: 'placeholderBadge' }}
                        >
                            <View style={this.props.achieved ? styles.achievedStyle : {}} />
                        </Animatable.Image>
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
    achievedStyle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    }
};

export default AchievementItem;
