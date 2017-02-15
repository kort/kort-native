// customized sliding view with isOpen listener, es6 compatible
// credits to olegdizus --> https://github.com/olegdizus/react-native-sliding-view

import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Animated
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const BASE_CONTAINER_HEIGHT = 48;

const orderAsc = (a, b) => a - b;

class CustomSlidingView extends Component {

  static defaultProps = {
    threshold: 64,
    tension: 50,
    friction: 10,
    heights: [
      BASE_CONTAINER_HEIGHT,
      deviceHeight
    ],
    onChange() { return; }
  }

  static propTypes = {
    threshold: PropTypes.number,
    tension: PropTypes.number,
    friction: PropTypes.number,
    onChange: PropTypes.func
  }


  constructor(props) {
    super(props);
    const { heights } = props;

    this.oldY = 0;
    this.prevHeight = heights[0];
    this.heights = heights.sort(orderAsc);

    this.state.containerHeight.setValue(this.prevHeight);
  }

  state = {
    containerHeight: new Animated.Value(this.props.heights[0]),
    clickEvent: ''
  }

  componentWillReceiveProps({ heights, clickEvent }) {
    if (this.props.heights.toString() !== heights.toString()) {
      this.animate(this.heights[0]);
    }

    if (clickEvent === 'open') {
      this.openView();
    } else if (clickEvent === 'close') {
      this.closeView();
    }
  }

  openView() {
    // this.state.containerHeight.setValue(this.props.heights[1]);
    this.animate(this.heights[1]);
    this.setState({ clickEvent: 'open' });
    this.props.isOpen(true);
  }

  closeView() {
    // this.state.containerHeight.setValue(this.props.heights[0]);
    this.animate(this.heights[0]);
    this.setState({ clickEvent: 'close' });
    this.props.isOpen(false);
  }

  prevHeight;
  heights;
  oldY;

  handleTouchStart = ({ nativeEvent }) => {
    this.oldY = nativeEvent.pageY;
  }

  handleTouchMove = ({ nativeEvent }) => {
    if (this.props.lockSlider) {
      return;
    }
    const newHeight = this.prevHeight + (this.oldY - nativeEvent.pageY);

    const minHeight = this.heights[0];
    const maxHeight = this.heights.slice(-1)[0];

    if (newHeight > minHeight && newHeight < maxHeight) {
      this.state.containerHeight.setValue(newHeight);
    }
  }

  animate = (height, callback) => {
    Animated.spring(this.state.containerHeight, {
      toValue: height,
      tension: this.props.tension,
      friction: this.props.friction
    }).start(callback);
    this.props.onChange(height);
    this.prevHeight = height;
  }

  handleTouchEnd = () => {
    const { heights, prevHeight, animate } = this;
    const currentHeight = this.state.containerHeight._value;
    const prevIndex = heights.indexOf(prevHeight);

    if (this.state.clickEvent !== '') {
      this.setState({ clickEvent: '' });
      return;
    }

    if (currentHeight - prevHeight >= this.props.threshold) {
      this.props.isOpen(true);
      return animate(heights[prevIndex + 1]);
    }
    if (prevHeight - currentHeight >= this.props.threshold) {
      this.props.isOpen(false);
      return animate(heights[prevIndex - 1]);
    }

    return animate(prevHeight);
  }

  render() {
    return (<Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        height: this.state.containerHeight,
        width: deviceWidth
      }}
      onTouchStart={this.handleTouchStart}
      onTouchMove={this.handleTouchMove}
      onTouchEnd={this.handleTouchEnd}
    >
      {this.props.children}
    </Animated.View>
    );
  }

}

export { CustomSlidingView };
