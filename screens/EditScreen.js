import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { Video } from 'expo';

import { ExpoLinksView } from '@expo/samples';

export default class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit',
  };

  state = {
    isVideoPaused: true,
    videoDuration: null,
  };



_onPlaybackStatusUpdate = (playbackStatus) => {
    if(this.state.videoDuration==null&&playbackStatus.isLoaded)
    {
      this.setState(
        {
          videoDuration:playbackStatus.durationMillis,
        });
    }
};

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

  render() {
    const { navigation } = this.props;
    const videoSrc = navigation.getParam('videoSrc', null);
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
            <TouchableOpacity style={{justifyContent: 'center', flex:1}} onPress={() => {this._pauseVideo()}}>
              <Video
                source={{ uri: videoSrc}}
                onPlaybackStatusUpdate = {(playbackStatus) => (this._onPlaybackStatusUpdate(playbackStatus))}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay={this.state.isVideoPaused}
                isLooping
                style={{flex:1}}
              />
            </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <Text>{this.state.videoDuration}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  optionContainer: {
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
