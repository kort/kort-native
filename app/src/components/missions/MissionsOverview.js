import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Map from './Map';
import MissionSolver from './MissionSolver';
import MissionView from './MissionView';
import { Spinner, Popup } from '../common';
import { clearErrorMsg, showMission } from '../../actions/MissionActions';

class MissionsOverview extends Component {

    state = { hideModal: false };

    onInfoAccept() {
        console.log('hide gps', this.state.hideModal, this.props.accuracyThresholdReached);
        this.setState({ hideModal: true });
    }

    onAccept() {
        this.props.clearErrorMsg();
    }

    onOpenAnnotation() {
        this.props.showMission(true);
    }

    onTap() {
        this.props.showMission(false);
    }

    renderMission() {
        if (this.props.missionViewVisible) {
            return (
                <MissionView
                    heights={[100, this.props.missionViewHeight]}
                >
                    <MissionSolver />
                </MissionView>
            );
        }
        return <View />;
    }

    renderSpinner() {
        if (this.props.missionsLoading) {
            return (
                <Spinner
                    size='small'
                    style={this.props.mapModeFullScreen ? 
                    styles.spinnerFullScreen : styles.spinnerSmallScreen} 
                />
            );
        }
        return null;
    }

    render() {
        return (
            <View style={styles.bgColor}>
                <Map 
                    onTap={this.onTap.bind(this)}
                    onOpenAnnotation={this.onOpenAnnotation.bind(this)} 
                />
                {this.renderSpinner()}
                {this.renderMission()}
                <Popup
                        visible={this.props.accuracyThresholdReached && !this.state.hideModal}
                        onAccept={this.onInfoAccept.bind(this)}
                        message={I18n.t('error_message_bad_gps')}
                />  
                <Popup
                        visible={this.props.errorMsg !== null}
                        onAccept={this.onAccept.bind(this)}
                        message={I18n.t('error_message_bad_connectivity')}
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


const mapStateToProps = ({ mapReducer, missionReducer }) => {
    const { mapModeFullScreen, accuracyThresholdReached } = mapReducer;
    const { missionsLoading, errorMsg, missionViewHeight, missionViewVisible } = missionReducer;
    return { mapModeFullScreen, 
        accuracyThresholdReached,
        missionsLoading,
        errorMsg,
        missionViewHeight,
        missionViewVisible };
};


export default connect(mapStateToProps, { clearErrorMsg, showMission })(MissionsOverview);
