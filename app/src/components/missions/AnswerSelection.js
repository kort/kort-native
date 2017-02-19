import React, { Component } from 'react';
import {} from 'react-native';
import { connect } from 'react-redux';
import { answerModalVisible, selectedAnswer, freetextAvailable, answerSet } from '../../actions/AnswerSelectionActions';
import { CustomSelectionView } from '../common';

class AnswerSelection extends Component {

    answerSelected(answer) {
        this.props.selectedAnswer(answer);
        if (answer.value === 0) {
            this.props.freetextAvailable(true);
            this.props.answerSet('');
        } else {
            this.props.freetextAvailable(false);
            this.props.answerSet(answer.name);
        }
    }

    isOpen(v) {
        this.props.answerModalVisible(v);
    }

    render() {
        return (
            <CustomSelectionView 
                title='Choose your answer'
                options={this.props.options} 
                onSelection={(answer) => this.answerSelected(answer)}
                style={styles.selectionViewStyle}
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
{ answerModalVisible, selectedAnswer, freetextAvailable, answerSet })(AnswerSelection);

