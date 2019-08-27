import React from 'react';
import { LaunchScreen } from './components/LaunchScreen/LaunchScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './components/HomeScreen/HomeScreen';
import { isLoggedIn } from './util/auth';
import { SplashScreen } from './components/SplashScreen/SplashScreen';

const routes = {
  Launch: LaunchScreen,
  Home: HomeScreen
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
    this.setState({ isLoggedIn: isLogged });
  }

  render(): JSX.Element {
    const { isLoggedIn } = this.state;
    if (isLoggedIn !== undefined) {
      const appNavigator = createStackNavigator(routes, {
        initialRouteName: isLoggedIn ? 'Home' : 'Launch'
      });
      const AppContainer = createAppContainer(appNavigator);
      return <AppContainer />;
    } else {
      return <SplashScreen />;
    }
  }
}
