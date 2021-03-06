import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import PageControl from 'react-native-page-control';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import ShowcaseItem from './ShowcaseItem';

class Showcase extends Component {

    state = { currentPage: 0 };

    onScroll(event) {
        const offsetX = event.nativeEvent.contentOffset.x;
        const pageWidth = deviceWidth - 10;
        this.setState({ 
            currentPage: Math.floor((offsetX - (pageWidth / 2)) / pageWidth) + 1 
        });
    }

    onPagePress(index) {
        this.scrollview.scrollTo({ x: deviceWidth * index, y: 0, animated: true });
    }

    hideShowcase() {
        Actions.pop();
    }

    showNextPage() {
        const newPageNumber = this.state.currentPage + 1;
        this.scrollview.scrollTo({ x: deviceWidth * newPageNumber, y: 0, animated: true });
    }

    scrollview = null;

    render() {
        return (
            <View 
                style={styles.bgColor}
            >
                <ScrollView
                ref={scrollview => { this.scrollview = scrollview; }}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={this.onScroll.bind(this)}
                scrollEventThrottle={16}
                >
                    <View style={[{ width: deviceWidth }, styles.pageStyle]}>
                        <ShowcaseItem 
                            title={I18n.t('showcase_1_title')}
                            description={I18n.t('showcase_1_desc')}
                            buttonText={I18n.t('showcase_button_next')}
                            buttonAction={this.showNextPage.bind(this)}
                        >
                            <IconFA 
                                style={{ color: '#657C8E', alignSelf: 'center' }}
                                size={200} 
                                name='map' 
                            />
                        </ShowcaseItem>
                    </View>
                    <View style={[{ width: deviceWidth }, styles.pageStyle]}>
                        <ShowcaseItem 
                            title={I18n.t('showcase_2_title')}
                            description={I18n.t('showcase_2_desc')}
                            buttonText={I18n.t('showcase_button_next')}
                            buttonAction={this.showNextPage.bind(this)}
                        >
                            <IconFA 
                                style={{ color: '#657C8E', alignSelf: 'center' }}
                                size={200} 
                                name='trophy' 
                            />
                        </ShowcaseItem>                    
                    </View>
                    <View style={[{ width: deviceWidth }, styles.pageStyle]}>
                        <ShowcaseItem 
                            title={I18n.t('showcase_3_title')}
                            description={I18n.t('showcase_3_desc')}
                            buttonText={I18n.t('showcase_button_next')}
                            buttonAction={this.showNextPage.bind(this)}
                        >
                            <IconFA 
                                style={{ color: '#657C8E', alignSelf: 'center' }}
                                size={200} 
                                name='list-ol' 
                            />
                        </ShowcaseItem>                    
                    </View>
                    <View style={[{ width: deviceWidth }, styles.pageStyle]}>
                        <ShowcaseItem 
                            title={I18n.t('showcase_4_title')}
                            description={I18n.t('showcase_4_desc')}
                            buttonText={I18n.t('showcase_button_start')}
                            buttonAction={this.hideShowcase.bind(this)}
                        >
                            <Icon 
                                style={{ color: '#657C8E', alignSelf: 'center' }}
                                size={200} 
                                name='google-maps' 
                            />
                        </ShowcaseItem>
                    </View>
                </ScrollView>
                <PageControl 
                    style={styles.pageControlStyle} 
                    numberOfPages={4} 
                    currentPage={this.state.currentPage} 
                    hidesForSinglePage
                    pageIndicatorTintColor='#657C8E' 
                    indicatorSize={{ width: 8, height: 8 }} 
                    currentPageIndicatorTintColor='white' 
                    onPageIndicatorPress={this.onPagePress.bind(this)}
                />
            </View>
        );
    }
}

const deviceWidth = Dimensions.get('window').width;

const styles = {
    pageControlStyle: {
        position: 'absolute',
        left: 0, 
        right: 0, 
        bottom: 20
    },
    pageStyle: {
        justifyContent: 'center',
    },
    bgColor: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#395971',
        flex: 1,
    }
};

export default (Showcase);
