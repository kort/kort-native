// customized  SelectionView
// credits to thinnakrit --> https://github.com/thinnakrit/React-Native-Selection

import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Modal
} from 'react-native';

import _ from 'lodash';

import Icon from 'react-native-vector-icons/FontAwesome';

class CustomSelectionView extends Component {
	static propTypes = {
		onSelection: React.PropTypes.func,
		isOpen: React.PropTypes.func,
		options: React.PropTypes.array,
		title: React.PropTypes.string,
		mode: React.PropTypes.func,
		style: React.PropTypes.object,
		iconColor: React.PropTypes.string,
		iconSize: React.PropTypes.number,
		titleCustomize: React.PropTypes.bool,
	}
	constructor(props) {
		super(props);
	
	this.state = {
		modalVisible: false,
		title: props.title,
		value: 0,
		};
	}

	openOption() {
        if (!_.isEmpty(this.props.options)) {
			this.setState({ modalVisible: !this.state.modalVisible });
        }
		this.checkIfOpen();
	}

	checkIfOpen() {
		if (this.state.modalVisible) {
			this.props.isOpen(false);
		} else {
			this.props.isOpen(true);
		}
	}

	onSelected(name, value) {
		if (!_.isEmpty(this.props.options)) {
			const data = {
				value,
				name,
			};
			this.props.onSelection(data);
			this.setState({
				modalVisible: false,
				title: name,
				value,
			});
        }
		this.checkIfOpen();
	}

    checkIcon(icon) {
        return (
            <View 
				style={{
                marginRight: 10 }}
			>
				<Icon name={icon} size={this.props.iconSize} color={this.props.iconColor} /></View>
        );
    }
  render() {
  	const ScreenHeight = Dimensions.get('window').height;
    const ScreenWidth = Dimensions.get('window').width;

    let { style, options, title, mode, iconColor, iconSize } = this.props;

    if (_.isEmpty(options)) {
        options = [];
    }

    const styles = {
		main: {
			width: ScreenWidth - 80,
			marginLeft: 40,
			marginTop: 5,
			marginBottom: 5,
			borderColor: '#657C8E',
			borderWidth: 1,
			padding: 10,
			backgroundColor: '#ffffff',
		},
        body: {
            width: ScreenWidth - 80,
            backgroundColor: '#ffffff',
            maxHeight: ScreenHeight - 300,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: '#657C8E',
		    overflow: 'hidden',
        },
        option: {
            width: ScreenWidth - 80,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#657C8E',
            flexDirection: 'row',
            margin: 0,
			backgroundColor: '#ffffff'
        },
		optionText: {
			fontSize: 20,
			color: '#657C8E'
		},
        text: {
			fontSize: 20,
            color: 'white',
			textAlign: 'center'
        }

    };
    if (style.body!== null) {
        styles.body = style.body;
    }
    if (style.option!== null) {
        styles.option = style.option;
    }
    if (style.main!== null) {
        styles.main = style.main;
    }

    let titleSet = '';

    if (this.props.titleCustomize === true) {
        titleSet = this.props.title;
    } else {
        titleSet = this.state.title;
    }
    return (
		<View>

			<Modal
				visible={this.state.modalVisible}
				onRequestClose={() =>{alert("Modal has been closed.")}}
				transparent={true}
			>
				<TouchableOpacity onPress={()=> this.openOption()}>
					<View 
						style={{
							width: ScreenWidth,
							height: ScreenHeight,
							backgroundColor: 'rgba(0,0,0,0.5)',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
					<View style={styles.body}>
    						<ScrollView>
    							{_.map(options, (data, k)=>{
                                    let icon = <View />;
                                    if(!_.isEmpty(data.icon)){
                                        icon = this.checkIcon(data.icon)
                                    }
	    							return(
	    								<TouchableOpacity key={k} onPress={()=> this.onSelected(data.name, data.value)}>
			    							<View style={styles.option}>
                                                {icon}
			    								<Text style={styles.optionText} >{data.name}</Text>
			    							</View>
		    							</TouchableOpacity>
			    					)
	    						})}
    						</ScrollView>
    					</View>
    				</View>
    			</TouchableOpacity>
    		</Modal>
    		
    		<TouchableOpacity onPress={()=>this.openOption()}>
				<View style={styles.main}>
					<Text style={styles.text}>{titleSet}</Text>
				</View>
			</TouchableOpacity>
		</View>
    );
  }
}


export { CustomSelectionView } ;

