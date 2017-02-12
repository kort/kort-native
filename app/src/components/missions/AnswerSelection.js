import React, { Component } from 'react';
import {} from 'react-native';
import { connect } from 'react-redux';
import { answerModalVisible } from '../../actions/AnswerSelectionActions';
import { CustomSelectionView } from '../common';

class AnswerSelection extends Component {

    returnDataOnSelection(e){
        console.log('Value : ' + e.value + ' Name : ' + e.name);
  }

    state = {
        modalVisible: false
    }

    isOpen(v) {
        console.log('is open', v);
        this.props.answerModalVisible(v);
    }

    render() {
        const options = [
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
        onSelection={(e) => this.returnDataOnSelection(e)}
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

export default connect(null, { answerModalVisible })(AnswerSelection);

