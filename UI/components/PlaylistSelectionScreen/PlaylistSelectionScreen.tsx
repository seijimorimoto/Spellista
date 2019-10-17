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
    const { SPOTIFY_BASE_URI } = constants;
    const accessToken = await getUserData('accessToken');
    Axios.get(`${SPOTIFY_BASE_URI}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        const playlists = response.data.items
          .map((playlist: any) => {
            const url = playlist.images.length > 0 ? playlist.images[0].url : null;
            return {
              name: playlist.name,
              imageUrl: url
            };
          })
          .sort((pl1: any, pl2: any) => {
            return pl1.name <= pl2.name ? -1 : 1;
          });
        return playlists;
      })
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
