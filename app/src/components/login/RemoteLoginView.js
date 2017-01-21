import React, { Component } from 'react';
import { WebView } from 'react-native';

class RemoteLoginView extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'http://localhost:5000/osm/login' }}
        style={{ marginTop: 40, marginBottom: 40 }}
      />
    );
  }
}

export default RemoteLoginView;
