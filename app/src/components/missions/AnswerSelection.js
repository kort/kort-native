import React, { Component } from 'react';
import {} from 'react-native';
import { connect } from 'react-redux';
import { answerModalVisible, selectedAnswer, freetextAvailable } from '../../actions/AnswerSelectionActions';
import { CustomSelectionView } from '../common';

class AnswerSelection extends Component {

    answerSelected(answer) {
        this.props.selectedAnswer(answer);
        if (answer.value === 0) {
            this.props.freetextAvailable(true);
        } else {
            this.props.freetextAvailable(false);
        }
    }

    isOpen(v) {
        this.props.answerModalVisible(v);
    }

    render() {
        const options = [
      {
        name: 'other:',
        value: 0,
      },
      {
        name: 'Italian',
        value: 1,
      },
      {
        name: 'Chinese',
        value: 2,
      },
      {
        name: 'Thai',
        value: 3,
      },
    ];
        return (
            <CustomSelectionView 
                title='Choose your answer'
                options={options} 
                onSelection={(answer) => this.answerSelected(answer)}
                style={styles.selectionViewStyle}
                iconSize={20}
                iconColor="#eee"
                isOpen={(v) => this.isOpen(v)}
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

export default connect(null, 
{ answerModalVisible, selectedAnswer, freetextAvailable })(AnswerSelection);

