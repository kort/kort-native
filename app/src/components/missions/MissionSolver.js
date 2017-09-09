import React, { Component } from 'react';
import {
    View,
    Text,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import I18n from 'react-native-i18n';
import Config from '../../constants/Config';
import { answerSet, 
         hideModal,
         showModal, 
         setFreetextAvailable,
         solveMission,
        showAchievements,
        resetSolutionSent } from '../../actions/AnswerSelectionActions';
import { showMission, downloadMissions } from '../../actions/MissionActions';
import { forceViewUpdateAchievements, 
         forceViewUpdateHighscore, 
         forceViewUpdateProfile } from '../../actions/NavigationActions';
import AnswerSelection from './AnswerSelection';
import { Input, 
        Button,
        KortCoin,
        Popup,
        ModalSpinner,
        ButtonWithImage } from '../common';
import OpeningHours from './types/OpeningHours';
import AchievementPopup from '../achievements/AchievementPopup';
import CoordinateCalculations from '../../geolocation/CoordinateCalculations';
import OpeningHoursVerifier from '../../date/OpenHoursVerifier';

class MissionSolver extends Component {

    componentDidMount() {
        this.props.answerSet('', '');
        this.props.setFreetextAvailable('');    
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeMission.inputType.options.length === 0 || 
            (nextProps.activeMission.inputType.options.length > 0 && 
                nextProps.activeMission.inputType.name === 'select')) {
            this.props.setFreetextAvailable(this.props.activeMission.inputType.name);
        }

        if (nextProps.solutionSent) {
            this.props.forceViewUpdateProfile(true);
            this.props.forceViewUpdateHighscore(true);
            if (nextProps.newAchievements.length > 0) {
                this.props.forceViewUpdateAchievements(true);
            }
            this.props.resetSolutionSent();
        }
    }

    onModalConfirm() {
        if (this.props.modalType === 'unsolvable') {
            const mission = this.props.activeMission;
            this.props.solveMission(this.props.user, mission, '', '', false, 0);
        } else if (this.props.modalType === 'validation') {
            this.props.hideModal(true);
        } else if (this.props.modalType !== 'notLoggedIn') {
            this.props.hideModal(true);

            if (this.props.newAchievements.length > 0 && this.validateInput()) {
                this.props.showAchievements(0);
            } else {
                this.hideMission();
            }
        } else {
            this.props.hideModal(true);
        }
    }

    onModalDecline() {
        this.props.hideModal(true);
    }

    hideMission() {
        this.props.showMission(false);
        this.props.downloadMissions(this.props.centerCoordinates, 
        Config.RADIUS_IN_M_FOR_MISSION_FETCHING, true, this.props.user.id);
    }

    /*
        true if mission is within 5km perimeter of location or user has at least 20 missions solved
    */
    checkIfMissionInsidePerimeter() {
        const latitude = this.props.activeMission.annotationCoordinate[0];
        const longitude = this.props.activeMission.annotationCoordinate[1];
        if (this.props.user.mission_count >= Config.NO_OF_MISSIONS_FOR_PERIMETER_CHECK) {
            return true;
        } else if (this.props.currentLocation && CoordinateCalculations.calculateDistance(
                { latitude, longitude }, this.props.currentLocation.coords) 
                <= Config.RADIUS_IN_M_FOR_MISSION_SOLVING) {
                    return true;
            }
        return false;
    }

    solveMission() {
        const mission = this.props.activeMission;
        const validationMessage = this.validateInput() ? '' : 
            mission.inputType.constraints.description;
        if (!this.props.user.loggedIn) {
             this.props.showModal(false, I18n.t('not_logged_in_error'), 'notLoggedIn');
        } else if (!this.checkIfMissionInsidePerimeter()) {
            this.props.showModal(false, I18n.t('mission_message_not_within_perimeter', 
                { missionCount: Config.NO_OF_MISSIONS_FOR_PERIMETER_CHECK,
                  distance: Config.RADIUS_IN_M_FOR_MISSION_SOLVING }));
        } else if (this.props.answer !== '' && validationMessage === '') {
            this.props.solveMission(
                this.props.user, mission, this.props.answer, this.props.selectedOption, true, 
                this.props.stats ? Config.ADDITIONAL_KOINS_FOR_STATS : 0);
        } else {
            this.props.showModal(false, I18n.t('mission_message_valid_answer', 
                { validationMessage }), 'validation');
        }
    }

    confirmUnsolvable() {
        this.props.showModal(true, I18n.t('mission_message_unsolvable'), 'unsolvable');
    }

    validateInput() {
        const { re, upperBound, lowerBound } = this.props.activeMission.inputType.constraints;
            if (re) {
                const regex = new RegExp(re);
                return regex.test(this.props.answer);
            } else if (upperBound && lowerBound) {
                return lowerBound <= parseFloat(this.props.answer) && 
                    parseFloat(this.props.answer) <= upperBound;
            } else if (this.props.activeMission.error_type === 'opening_hours') {
                return OpeningHoursVerifier(this.props.answer);
            }
        return true;
    }

    createListItem(index, item) {
        return { value: index, name: item };
    }

    determineKeyboardType() {
        switch (this.props.freetextType) {
            case 'text':
                return 'default';
            case 'number':
                return 'numeric';
            default:
                return '';
        }
    }

    showNextAchievementOrClose() {
        if (this.props.currentAchievementIndex < this.props.newAchievements.length - 1) {
            this.props.showAchievements(this.props.currentAchievementIndex + 1);
        } else {
            this.props.showAchievements(-1);
            this.hideMission();
        }
    }

    openOSM() {
        const { osmId, osmType } = this.props.activeMission;
        const url = `https://www.openstreetmap.org/${osmType}/${osmId}`;
        Linking.openURL(url);
    }

    renderAnswerSelection() {
        if (this.props.activeMission.error_type === 'opening_hours') {
            return (<OpeningHours 
                setAnswer={value => this.props.answerSet(value, '')}
                answer={this.props.answer}
            />);
        }

        if (!_.isEmpty(this.props.activeMission.inputType.options)) {
            const options = _.map(this.props.activeMission.inputType.options, 
                (item, index) => { return { value: index, name: item }; });
            const sortedOptions = _.sortBy(options, 'name');
            if (this.props.activeMission.inputType.name !== 'select') {
                sortedOptions.unshift({ value: -1, name: I18n.t('mission_answer_options_other') });
            }
            return <AnswerSelection options={sortedOptions} />;
        }
        return null;
    }

    renderAnswerFreetext() {
        const keyboardType = this.determineKeyboardType();
        if (keyboardType !== '') {
            return (
                <Input
                    placeHolder={I18n.t('mission_answer_placeholder')}
                    keyboardType={keyboardType}
                    value={this.props.answer}
                    onChangeText={value => this.props.answerSet(value, '')}
                />
            );
        }   
        return null;
    }

    renderModalHeader() {
        if (this.props.modalType === 'win') {
            return <KortCoin animationStyle='win'>{this.props.activeMission.koinReward}</KortCoin>;
        }
    }

    renderModal() {
                return (
                <Popup 
                    onAccept={this.onModalConfirm.bind(this)}
                    visible={this.props.modalVisible}
                    confirm={this.props.modalConfirm}
                    onDecline={this.onModalDecline.bind(this)}
                    message={this.props.modalText}
                >
                     {this.renderModalHeader()}
                </Popup>                    
            );
    }

    renderAchievementsModal() {
        if (this.props.currentAchievementIndex > -1 && 
            this.validateInput() !== '' &&
            this.checkIfMissionInsidePerimeter()) {
        const currentAchievement = this.props.newAchievements[this.props.currentAchievementIndex];
             return (  
                    <AchievementPopup
                        visible
                        onAccept={() => this.showNextAchievementOrClose()}
                        achievement={currentAchievement}
                        animateIndef
                    />                
            );
        }
       return null;
    }

    renderSending() {
        return (
            <View>
                <ModalSpinner 
                    visible={this.props.sending}
                />
                <Popup
                    visible={this.props.errorMsg !== null}
                    onAccept={() => this.props.hideModal(true)}
                    message={I18n.t('error_message_bad_connectivity')}
                />
            </View>
        );      
    }

    render() {
        const { bgColor, missionTextStyle, headerStyle, additionalButtonsStyle,
            containerStyle, unsolvableButtonStyle, completeMissionButtonStyle } = styles;
        return (
            <View style={[bgColor, { height: this.props.missionViewHeight }]}>
                <View style={headerStyle}>
                    <KortCoin animationStyle='normal'>
                         {this.props.activeMission.koinReward}
                    </KortCoin>
                    <Text style={missionTextStyle}>{this.props.activeMission.question}</Text>
                </View>
                <View style={containerStyle} >
                    {this.renderAnswerSelection()}
                    {this.renderAnswerFreetext()}
                        <Button
                            onPress={this.solveMission.bind(this)}
                            style={completeMissionButtonStyle}
                        >{I18n.t('mission_complete_mission')}
                        </Button>
                        <View style={additionalButtonsStyle}>
                        <ButtonWithImage
                            style={{ borderWidth: 1, paddingRight: 20 }}
                            onPress={() => this.openOSM()}
                            imgSource={'osm'}
                        >OSM
                        </ButtonWithImage>
                        <Button
                            onPress={this.confirmUnsolvable.bind(this)}
                            style={unsolvableButtonStyle}
                        >
                            {I18n.t('mission_complete_unable_to_solve')}
                        </Button>
                        </View>
               </View>
               {this.renderModal()}
               {this.renderAchievementsModal()}
               {this.renderSending()}
            </View>
        );
    }
}

const styles = {
    headerStyle: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        paddingRight: 30,
        paddingBottom: 20,
        backgroundColor: 'transparent'
        
    },
    missionTextStyle: {
        color: 'white',
        marginLeft: 10,
        marginRight: 40,
    },
    containerStyle: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    bgColor: {
        backgroundColor: '#395971',
        alignItems: 'center',
        height: 300,
    },
    completeMissionButtonStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#657C8E',
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        width: 300,
    },
    unsolvableButtonStyle: {
        alignSelf: 'center',
        width: 150, 
    },
    additionalButtonsStyle: {
        flexDirection: 'row',
    }
};

const mapStateToProps = ({ answerReducer, missionReducer, 
    authReducer, mapReducer, settingsReducer, navigationReducer }) => {
    const { freetextType, answer, selectedOption, modalVisible, 
        modalConfirm, modalText, modalType, sending, 
        newAchievements, currentAchievementIndex, errorMsg, solutionSent } = answerReducer;
    const { activeMission, missionViewHeight } = missionReducer;
    const { user } = authReducer;
    const { updateHighscoreView, updateProfileView, updateAchievementsView } = navigationReducer;
    const { centerCoordinates, currentLocation } = mapReducer;
    const { stats } = settingsReducer;
    return { freetextType, 
        answer, 
        selectedOption,
        modalVisible, 
        modalConfirm, 
        modalText, 
        modalType, 
        sending,
        newAchievements,
        currentAchievementIndex,
        errorMsg,
        activeMission, 
        missionViewHeight,
        user,
        centerCoordinates,
        currentLocation,
        stats,
        updateHighscoreView,
        updateAchievementsView,
        updateProfileView,
        solutionSent };
};


export default connect(mapStateToProps, 
{ answerSet, 
    hideModal, 
    showModal, 
    setFreetextAvailable, 
    solveMission, 
    showAchievements,
    showMission,
    downloadMissions,
    forceViewUpdateAchievements,
    forceViewUpdateHighscore,
    forceViewUpdateProfile,
    resetSolutionSent })(MissionSolver);
