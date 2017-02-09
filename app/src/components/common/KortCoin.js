import React from 'react';
import { Image,
        Text
     } from 'react-native';

const KortCoin = ({ children }) => {
    return (
      <Image
        style={styles.koinStyle}
        source={{ uri: 'koin' }}
        defaultSource={{ uri: 'placeholderBadge' }}
      >
      <Text style={styles.amountStyle}>{children}</Text>
      </Image>
    );
};

const styles = {
    amountStyle: {
        backgroundColor: 'transparent',
        color: '#C89E1E',
        textAlign: 'center',
        fontSize: 25,
        marginLeft: 10,
        marginRight: 10,
        fontFamily: 'Britannic-BoldT.',
    },
    koinStyle: {
        justifyContent: 'center',
        height: 70,
        width: 70,
    },
};

export { KortCoin };
