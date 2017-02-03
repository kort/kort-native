import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import Map from './Map';
import { Spinner, Popup } from '../common';

class MissionsOverview extends Component {

    state = { gpsModalShowed: false };

    onInfoAccept() {
        this.setState({ gpsModalShowed: true });
    }

    render() {
        return (
            <View style={styles.bgColor}>
                <Map />
                <Spinner
                    size='small'
                    style={this.props.mapModeFullScreen ? styles.spinnerStyleFullScreen : styles.spinnerStyleSmallScreen} 
                />
                <Popup
                        visible={this.props.accuracyThresholdReached && !this.state.gpsModalShowed}
                        onAccept={this.onInfoAccept.bind(this)}
                >
                    Your GPS signal is bad. Get outdoors.
                </Popup>           
             </View>
        );
    }
}

const styles = {
    spinnerStyleFullScreen: {
        position: 'absolute',
        paddingTop: 20,
        paddingLeft: 10
    },
    spinnerStyleSmallScreen: {
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
    console.log(mapReducer);
    const { mapModeFullScreen, accuracyThresholdReached } = mapReducer;
    return { mapModeFullScreen, accuracyThresholdReached };
};


export default connect(mapStateToProps, {})(MissionsOverview);
