import React from 'react';
import {
    Scene,
    Router
} from 'react-native-router-flux';
import MissionsOverview from './components/missions/MissionsOverview';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key='missions' >
            <Scene
                key='missionsOverview'
                component={MissionsOverview}
                title='Missions'
                initial
            />
        </Scene>
        
        </Router>
    );
};

export default RouterComponent;
