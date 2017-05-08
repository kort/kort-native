/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import { locationUpdate, locationAccuracyInsufficient } from '../actions/MapActions';
import GPS_ACCURACY from './../constants/Config';

class GeoLocation extends Component {

    state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    accuracy: 0
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position;
        this.setState({ initialPosition });
        console.log(initialPosition);
        this.props.locationUpdate(initialPosition);
        console.log(GPS_ACCURACY.constructor.name);
        if (position.coords.accuracy > 40) {  //TODO move param to config file
          this.props.locationAccuracyInsufficient(true);
        } else {
          this.props.locationAccuracyInsufficient(false);
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.props.locationUpdate(position);
      const lastPosition = position;
      this.setState({ lastPosition });
    });
  }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
  }

  watchID = 234;

    render() {
        return (
            <View />
        );
    }
}

export default connect(null, { locationUpdate, locationAccuracyInsufficient })(GeoLocation);
