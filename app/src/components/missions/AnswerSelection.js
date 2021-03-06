import React, { Component } from 'react';
import {} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { answerModalVisible, 
         selectedAnswer, 
         setFreetextAvailable, 
         answerSet } from '../../actions/AnswerSelectionActions';
import { CustomSelectionView } from '../common';

class AnswerSelection extends Component {

    answerSelected(answer) {
        this.props.selectedAnswer(answer);
        if (answer.value === -1) {
            this.props.setFreetextAvailable(this.props.activeMission.inputType.name);
            this.props.answerSet('', '');
        } else {
            this.props.setFreetextAvailable('');
            this.props.answerSet(answer.name, this.props.activeMission.inputType.values[answer.value]);
        }
    }

    isOpen(v) {
        this.props.answerModalVisible(v);
    }

    render() {
        return (
            <CustomSelectionView 
                title={I18n.t('mission_answer_choose_your_answer')}
                options={this.props.options} 
                onSelection={(answer) => this.answerSelected(answer)}
                style={styles.selectionViewStyle}
                isOpen={(v) => this.isOpen(v)}
                missionHeight={this.props.missionViewHeight}
            />
        );
    }
}

const styles = {
    bgColor: {
        backgroundColor: '#202931',
        flex: 1
    },
    selectionViewStyle: {
        body: null,
        option: null,
        alignText: 'center'
    },
};

const mapStateToProps = ({ missionReducer }) => {
    const { activeMission, missionViewHeight } = missionReducer;
    return { activeMission, missionViewHeight };
};

export default connect(mapStateToProps, 
{ answerModalVisible, selectedAnswer, setFreetextAvailable, answerSet })(AnswerSelection);

