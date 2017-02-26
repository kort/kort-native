import React, { Component } from 'react';
import {
    Platform,
    View,
    Image,
    Text,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KortCoin } from '../common';

class ProfileOverview extends Component {
    render() {
        return (
            <ScrollView style={styles.bgColor}>
            
                <View style={styles.userViewStyle}>
                    <View style={styles.headerBoxStyle}>
                        <Image
                            source={{ uri: this.props.user.pic_url }}
                            style={styles.imageStyle}
                            defaultSource={{ uri: 'placeholderBadge' }}
                        >
                        <Image 
                            source={require('../../../assets/images/login/osm.png')}
                            style={styles.providerImageStyle}
                        />
                        </Image>
                        <View style={styles.usernameBoxStyle}>
                            <Text style={styles.textHeaderStyle}>user1024</Text>
                        </View>
                    </View>

                <View style={styles.bodyStyle}>
                    <View style={styles.categoryStyle}>
                        <KortCoin>K</KortCoin>
                        <Text style={styles.textStyle}>122 koins</Text>
                    </View>
                    <View style={styles.categoryStyle}>
                        <Icon 
                            style={{ color: '#90201E' }}
                            size={60} 
                            name='map-marker-multiple' 
                        />
                        <Text style={styles.textStyle}>122 missions</Text>
                    </View>
                    <View style={styles.categoryStyle}>
                        <FontAwesome 
                            style={{ color: '#a1a336' }}
                            size={66} 
                            name='star-half-o' 
                        />
                        <Text style={styles.textStyle}>2 missions today</Text>
                    </View>
                </View>
            </View>

            </ScrollView>
        );
    }
}

const styles = {
    categoryStyle: {
        flexDirection: 'row',
                paddingBottom: 20,
    },
    bodyStyle: {
        borderColor: 'white',
        borderWidth: 1,
        paddingLeft: 30,
        paddingRight: 20,
        paddingTop: 20,
    },
    usernameBoxStyle: {
        flex: 1,
        alignSelf: 'center',
    },
    headerBoxStyle: {
        marginTop: 20,
        marginBottom: 20,
        height: 100,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1
    },
    imageStyle: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        marginRight: 20,
        alignItems: 'flex-end',
    },
    providerImageStyle: {
        height: 15,
        width: 15,
    },
    textHeaderStyle: {
        color: 'white',
        textAlign: 'left',
        fontSize: 20,
    },
    textStyle: {
        marginLeft: 30,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'left',
        fontSize: 20,
    },
    userViewStyle: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 30,
        marginRight: 30,
    },
    bgColor: {
        backgroundColor: '#202931',
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        marginBottom: 50
    }
};

const mapStateToProps = ({ authReducer }) => {
    console.log(authReducer);
    const { user } = authReducer;
    return { user };
};


export default connect(mapStateToProps, { })(ProfileOverview);
