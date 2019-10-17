import React from 'react';
import { View, TouchableOpacity, Text, TouchableHighlight, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  NavigationScreenOptions,
  StackActions,
  NavigationActions,
  NavigationScreenProp,
  NavigationParams,
  NavigationState
} from 'react-navigation';
import { constants } from '../../util/constants';
import { homeScreenStyles } from './HomeScreen.styles';
import { clearUserData, getUserData } from '../../util/asyncStorage';
import { IHomeScreenProps, IHomeScreenState, IDictionary } from './HomeScreen.types';
import Axios from 'axios';
import { ImageList } from '../ImageList/ImageList';
import { axiosConfigBuilder } from '../../util/axiosHelper';

class HomeScreen extends React.Component<IHomeScreenProps, IHomeScreenState> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }): NavigationScreenOptions => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.push('PlaylistSelection');
          }}
          style={homeScreenStyles.addBtnContainer}
        >
          <Text style={homeScreenStyles.addBtnText}>+</Text>
        </TouchableOpacity>
      ),
      title: 'Your Spellistas'
    };
  };

  _playlistToImageMapping: IDictionary<string>;

  constructor(props: IHomeScreenProps) {
    super(props);

    this._onLogout = this._onLogout.bind(this);
    this._loadSpellistasImages = this._loadSpellistasImages.bind(this);

    this._playlistToImageMapping = {};

    this.state = {
      spellistas: []
    };
  }

  async componentDidMount() {
    const { API_URL } = constants;
    try {
      const userId = await getUserData('userId');
      const response = await Axios.get(`${API_URL}/spellistas?userId=${userId}`);
      const spellistas = response.data;

      this.setState({ spellistas: spellistas }, () => {
        this._loadSpellistasImages(spellistas);
      });
    } catch (err) {
      console.error(err);
    }
  }

  render(): JSX.Element {
    const { style } = constants;
    const { logOutBtnContainer, logOutBtnText } = homeScreenStyles;
    const { spellistas } = this.state;
    const { width } = Dimensions.get('window');
    return (
      <LinearGradient
        colors={['#e94057', '#ff1493', '#b000af', '#3f0081']}
        style={{ flex: 1, width: '100%' }}
      >
        <View style={{ height: style.HEADER_HEIGHT }} />
        <ImageList
          columnSpacing={20}
          data={spellistas}
          defaultImage={require('../../assets/images/empty_playlist_logo.jpg')}
          rowSpacing={20}
          width={width}
        />
        <TouchableHighlight
          onPress={this._onLogout}
          style={logOutBtnContainer}
          underlayColor="#D1D1D1"
        >
          <Text style={logOutBtnText}>Log Out</Text>
        </TouchableHighlight>
      </LinearGradient>
    );
  }

  async _loadSpellistasImages(spellistas: any[]) {
    const accessToken = await getUserData('accessToken');
    const { SPOTIFY_BASE_URI } = constants;
    spellistas.forEach(async (spellista, index) => {
      try {
        const { playlistId } = spellista;
        if (!(playlistId in this._playlistToImageMapping)) {
          const config = axiosConfigBuilder(`Bearer ${accessToken}`, { fields: 'images' });
          const response = await Axios.get(`${SPOTIFY_BASE_URI}/playlists/${playlistId}`, config);
          const imageUrl = response.data.images.length > 0 ? response.data.images[0].url : null;
          this._playlistToImageMapping[playlistId] = imageUrl;
        }

        this.setState(prevState => {
          prevState.spellistas[index].imageUrl = this._playlistToImageMapping[playlistId];
          return prevState;
        });
      } catch (err) {
        console.error(err);
      }
    });
  }

  async _onLogout() {
    await clearUserData();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Launch' })]
    });
    this.props.navigation.dispatch(resetAction);
  }
}

export { HomeScreen };
