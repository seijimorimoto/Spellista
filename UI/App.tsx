import React from 'react';
import { LaunchScreen } from './components/LaunchScreen/LaunchScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './components/HomeScreen/HomeScreen';
import { isLoggedIn, loginWithSpotify } from './util/auth';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import { PlaylistSelectionScreen } from './components/PlaylistSelectionScreen/PlaylistSelectionScreen';

const routes = {
  Launch: LaunchScreen,
  Home: HomeScreen,
  PlaylistSelection: PlaylistSelectionScreen
};

export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: undefined
    };
  }

  async componentDidMount() {
    const isLogged = await isLoggedIn();
    if (isLogged) {
      await loginWithSpotify();
    }
    this.setState({ isLoggedIn: isLogged });
  }

  render(): JSX.Element {
    const { isLoggedIn } = this.state;
    if (isLoggedIn !== undefined) {
      const appNavigator = createStackNavigator(routes, {
        defaultNavigationOptions: {
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 28
          },
          headerStyle: { marginTop: 10 },
          headerTransparent: true
        },
        headerLayoutPreset: 'center',
        initialRouteName: isLoggedIn ? 'Home' : 'Launch'
      });
      const AppContainer = createAppContainer(appNavigator);
      return <AppContainer />;
    } else {
      return <SplashScreen />;
    }
  }
}
