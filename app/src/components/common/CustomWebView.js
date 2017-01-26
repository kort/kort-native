import React from 'react';
import { WebView } from 'react-native';

const CustomWebView = ({ uri, error }) => {
    return (
      <WebView
        source={{ uri }}
        style={{ marginTop: 40, marginBottom: 40 }}
        renderError={error}
      />
    );
};

export { CustomWebView };
