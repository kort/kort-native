import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import Map from './Map';
import { Spinner } from '../common';

class MissionsOverview extends Component {

    render() {
        return (
            <View style={styles.bgColor}>
                <Map />
                <Spinner
                    size='small'
                    style={this.props.mapModeFullScreen ? styles.spinnerStyleFullScreen : styles.spinnerStyleSmallScreen} 
                />
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
    const { mapModeFullScreen } = mapReducer;
    return { mapModeFullScreen };
};


export default connect(mapStateToProps, {})(MissionsOverview);
