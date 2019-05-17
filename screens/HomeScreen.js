import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { ImagePicker, Permissions, Video } from 'expo';



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  static srcOptions = {
    mediaTypes: 'Videos',
    allowsEditing: true,
  };

    useCameraHandler = async () => {

    await this.askPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes:ImagePicker.MediaTypeOptions.Videos,
        base64: false,
    });
    console.log(result);
    if (!result.cancelled) {
      this.props.navigation.navigate('Edit', {videoSrc: result.uri,});
    }

};

askPermissionsAsync = async () => {
      await Permissions.askAsync(Permissions.CAMERA);
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      };



  render() {
    return (
      <View style={styles.buttonContainer}>
          <View style={{justifyContent: 'center', alignItems:'center', flex:2}} >
            <TouchableOpacity onPress={() => {this._pickImage()}}>
              <Text>Select Video</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }

  _pickImage = async () => {
     this.useCameraHandler();
  };
}


const styles = StyleSheet.create({
  buttonContainer: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
