import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { loginUserSilently, logoutUser } from './actions/AuthActions';
import { mapRotationChanged, statsChanged } from './actions/SettingsActions';
import { SHOWCASE_SHOWN, USER, SETTINGS } from './storage/StorageKeys';
/**
 * This class handles all loading from persistent storage and initiates the according actions
 * @extends Component
 */
class AppLoader extends Component {

  componentDidMount() {
      store.get(SETTINGS).then(settings => {
          if (settings) {
            this.props.mapRotationChanged(settings.mapRotation);
            this.props.statsChanged(settings.stats);
          }
    }); 

    store.get(USER).then(user => {
            if (user) {
                this.props.loginUserSilently(user);
            } else {
            this.props.logoutUser();

            //check showcase
            store.get(SHOWCASE_SHOWN).then(obj => {
                if (obj === null || !obj.showcaseShown) {
                    Actions.showcase();
                    store.update(SHOWCASE_SHOWN, { showcaseShown: true });
                }     
            });  
            }
        });      
  }

    render() {
        return (
            <View style={styles.bgColor} />
                
        );
    }
}

const styles = {
    bgColor: {
        backgroundColor: '#202931',
        flex: 1,
        paddingTop: 60,
        paddingBottom: 50,
    },
     
    
};

export default connect(null, { 
    loginUserSilently, 
    logoutUser, 
    mapRotationChanged, 
    statsChanged })(AppLoader);
