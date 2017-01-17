import React from 'react';
import { 
    Text,
    View,
    Modal,
    Image
 } from 'react-native';
 import { Button } from './Button';

 const Popup = ({ children, imageURI, visible, onAccept, onDecline }) => {
    const { boxStyle, containerStyle, imageStyle } = styles;

     return (
         <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={() => {}}
         >
        <View style={containerStyle}>
                <View style={boxStyle}>
                    <Image 
                        source={{ uri: imageURI }}
                        style={imageStyle}
                    />
                    <Text>{children}</Text>
                    <Button onPress={onAccept}>
                        OK
                    </Button>    
                </View>        
            </View>
         </Modal>
     );
 };

 const styles = {
     imageStyle: {
         height: 80,
         width: 80,
         alignSelf: 'center',
     },
     boxStyle: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 400,
        width: 250
     },
     containerStyle: {
         backgroundColor: 'rgba(0, 0, 0, 0.5)',
         position: 'relative',
         flex: 1,
         justifyContent: 'center'
     }
 };

 export { Popup };
