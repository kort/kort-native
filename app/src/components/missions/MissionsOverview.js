import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import Map from './Map';
import MissionSolver from './MissionSolver';
import MissionView from './MissionView';
import { Spinner, Popup } from '../common';
import { clearErrorMsg } from '../../actions/MissionActions';

class MissionsOverview extends Component {

    state = { showModal: false, missionActive: false };

    onInfoAccept() {
        this.setState({ showModal: false });
        this.props.clearErrorMsg();
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

    renderSpinner() {
        if (this.props.missionsLoading) {
            return (
                <Spinner
                    size='small'
                    style={this.props.mapModeFullScreen ? styles.spinnerFullScreen : styles.spinnerSmallScreen} 
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
                        visible={this.props.accuracyThresholdReached && !this.state.showModal}
                        onAccept={this.onInfoAccept.bind(this)}
                        message='Your GPS signal is bad. Get outdoors.'
                />  
                <Popup
                        visible={this.props.errorMsg !== null && !this.state.showModal}
                        onAccept={this.onInfoAccept.bind(this)}
                        message='There was an error connecting to the server. Check your connectivity.'
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
    const { missionsLoading, errorMsg } = missionReducer;
    return { mapModeFullScreen, accuracyThresholdReached, missionsLoading, errorMsg };
};


export default connect(mapStateToProps, { clearErrorMsg })(MissionsOverview);
