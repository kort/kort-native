import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import Map from './Map';
import MissionSolver from './MissionSolver';
import MissionView from './MissionView';
import { Spinner, Popup } from '../common';

class MissionsOverview extends Component {

    state = { gpsModalShowed: false, missionActive: false };

    onInfoAccept() {
        this.setState({ gpsModalShowed: true });
    }

    onOpenAnnotation() {
        this.setState({ missionActive: true });
    }

    onTap() {
        this.setState({ missionActive: false });
    }

    renderMission() {
        if (this.state.missionActive) {
            return (
                <MissionView
                    heights={[100, 300]}
                >
                    <MissionSolver />
                </MissionView>
            );
        }
        return <View />;
    }

    render() {
        const { bgColor, spinnerFullScreen, spinnerSmallScreen } = styles;
        return (
            <View style={bgColor}>
                <Map 
                    onTap={this.onTap.bind(this)}
                    onOpenAnnotation={this.onOpenAnnotation.bind(this)} 
                />
                <Spinner
                    size='small'
                    style={this.props.mapModeFullScreen ? spinnerFullScreen : spinnerSmallScreen} 
                />
                {this.renderMission()}
                <Popup
                        visible={this.props.accuracyThresholdReached && !this.state.gpsModalShowed}
                        onAccept={this.onInfoAccept.bind(this)}
                        message='Your GPS signal is bad. Get outdoors.'
                />       
             </View>
        );
    }
}

const styles = {
    spinnerFullScreen: {
        position: 'absolute',
        paddingTop: 20,
        paddingLeft: 10
    },
    spinnerSmallScreen: {
        position: 'absolute',
        paddingTop: 74,
        paddingBottom: 60,
        paddingLeft: 10
    },
    bgColor: {
        backgroundColor: '#202931',
        flex: 1,
    }
};


const mapStateToProps = ({ mapReducer }) => {
    const { mapModeFullScreen, accuracyThresholdReached } = mapReducer;
    return { mapModeFullScreen, accuracyThresholdReached };
};


export default connect(mapStateToProps, {})(MissionsOverview);
