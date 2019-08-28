import React from 'react';
import Axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationScreenOptions } from 'react-navigation';
import { ImageList } from '../ImageList/ImageList';
import { Dimensions, View } from 'react-native';
import { constants } from '../../util/constants';
import { getUserData } from '../../util/asyncStorage';
import { IPlaylistSelectionScreenState } from './PlaylistSelectionScreen.types';

class PlaylistSelectionScreen extends React.Component<any, IPlaylistSelectionScreenState> {
  static navigationOptions: NavigationScreenOptions = {
    title: 'Select a playlist'
  };

  constructor(props: any) {
    super(props);

    this.state = {
      playlists: []
    };
  }

  async componentDidMount() {
    const { API_URL } = constants;
    const accessToken = await getUserData('accessToken');
    Axios.get(`${API_URL}/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(result => result.data)
      .then(playlists => this.setState({ playlists: playlists }))
      .catch(error => console.error(error));
  }

  render(): JSX.Element {
    const { style } = constants;
    const { width } = Dimensions.get('window');
    const { playlists } = this.state;
    return (
      <LinearGradient
        colors={['#e94057', '#ff1493', '#b000af', '#3f0081']}
        style={{ flex: 1, width: '100%' }}
      >
        <View style={{ height: style.HEADER_HEIGHT }} />
        <ImageList
          data={playlists}
          defaultImage={require('../../assets/images/empty_playlist_logo.jpg')}
          columnSpacing={20}
          rowSpacing={20}
          width={width}
        />
      </LinearGradient>
    );
  }
}

export { PlaylistSelectionScreen };
