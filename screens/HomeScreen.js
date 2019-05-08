import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
// import ImagePicker from 'react-native-image-picker';
import { ImagePicker, Permissions, Video } from 'expo';
// import Video from 'react-native-video';




export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static srcOptions = {
    mediaTypes: 'Videos',
    allowsEditing: true,
  };

  constructor(props) {
    super(props);
    this.state = { videoSrc: null,
        isSourceSelect: false,
        isVideoPaused: true, };
    }

  componentWillMount()
    {

      this.setState({
        videoSrc: null,
        isSourceSelect: false,
        isVideoPaused: true,
      });

    }

    useCameraHandler = async () => {

    await this.askPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes:ImagePicker.MediaTypeOptions.Videos,
        base64: false,
    });
    console.log(result);
    if (!result.cancelled) {
        this.setState({
        videoSrc: result.uri,
        isSourceSelect: true,
      });

    }

};

askPermissionsAsync = async () => {
      await Permissions.askAsync(Permissions.CAMERA);
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      };



  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={{justifyContent: 'center'}}>
            <Text>Title</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={{justifyContent: 'center', flex:1}} disabled={!this.state.isSourceSelect} onPress={() => {this._pauseVideo()}}>
            {this._displayVideo()}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <View style={{justifyContent: 'center', alignItems:'center', flex:2}} >
            <TouchableOpacity onPress={() => {this._pickImage()}}>
              <Text>Select Video</Text>
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', flex:1, flexDirection:'row'}} >
            <View style={{justifyContent: 'center', flex:5,}}>
              
            </View>
            <TouchableOpacity style={{justifyContent: 'center', flex:1}} onPress={() => {this._pickImage()}} disabled={!this.state.isSourceSelect}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }


  _displayVideo()
  {
    if (this.state.isSourceSelect)
    {
      return(
            <Video
              source={{ uri: this.state.videoSrc}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay={this.state.isVideoPaused}
              isLooping
              style={{flex:1}}
            />
      );
    }
  }

  _pauseVideo = async () =>
  {
      if(this.state.isVideoPaused)
      {
        this.setState({isVideoPaused:false});
      }else
      {
        this.setState({isVideoPaused:true});
      }
  }

  _pickImage = async () => {
     this.useCameraHandler();

    console.log(result);

    if (!result.cancelled) {
      this.setState({ avatarSource: result.uri });
    }
  };
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
