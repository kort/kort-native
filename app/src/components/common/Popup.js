import React from 'react';
import { 
    Text,
    View,
    Modal,
    Image
 } from 'react-native';
 import { Button } from './Button';

 const Popup = ({ children, imageURI, visible, onAccept }) => {
    const { boxStyle,
            imageBoxStyle,
            textBoxStyle, 
            buttonBoxStyle, 
            containerStyle, 
            imageStyle,
            textStyle } = styles;

     return (
         <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={() => {}}
         >
             <View style={containerStyle}>
                 <View style={boxStyle}>
                     <View style={imageBoxStyle}>
                         <Image
                             source={{ uri: imageURI }}
                             style={imageStyle}
                             defaultSource={{ uri: 'placeholderBadge' }}
                         />
                     </View>
                     <View style={textBoxStyle}>

                         <Text style={textStyle}>{children}</Text>
                     </View>
                     <View style={buttonBoxStyle}>
                         <Button onPress={onAccept}>
                             OK
                    </Button>
                     </View>
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
     imageBoxStyle: {
         justifyContent: 'center',
         borderWidth: 0,
         borderBottomWidth: 1,
         borderColor: '#657C8E',
         paddingTop: 10,
         paddingBottom: 10
     },
     textBoxStyle: {
         justifyContent: 'center',
         alignSelf: 'center',
         paddingRight: 10,
         paddingLeft: 10,
         paddingTop: 10,
         paddingBottom: 10,
     },
     textStyle: {
         color: '#202931'
     },
     buttonBoxStyle: {
         height: 70,
         paddingTop: 10,
         paddingBottom: 10
     },
     boxStyle: {
         backgroundColor: '#FFFFFF',
         alignSelf: 'center',
         borderRadius: 10,
         borderWidth: 1,
         borderColor: '#657C8E',
         marginLeft: 50,
         marginRight: 50,
     },
     containerStyle: {
         backgroundColor: 'rgba(0, 0, 0, 0.5)',
         position: 'relative',
         flex: 1,
         justifyContent: 'center'
     }
 };

 export { Popup };
