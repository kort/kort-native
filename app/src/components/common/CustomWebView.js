import React from 'react';
import { WebView } from 'react-native';

const CustomWebView = ({ uri }) => {
    return (
      <WebView
        source={{ uri }}
        style={{ marginTop: 40, marginBottom: 40 }}
      />
    );
};

export { CustomWebView };
