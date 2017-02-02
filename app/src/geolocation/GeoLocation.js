import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import { locationUpdate } from '../actions/MapActions';

class GeoLocation extends Component {

    state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position;
        this.setState({ initialPosition });
        console.log(initialPosition);
        this.props.locationUpdate(initialPosition);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
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

export default connect(null, { locationUpdate })(GeoLocation);
