import React from 'react';
import { LaunchScreen } from './views/launch_screen/launch_screen';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen } from './views/home_screen/home_screen';
import { isLoggedIn } from './util/auth';
import { SplashScreen } from './views/splash_screen/splash_screen';

const routes = {
  Launch: LaunchScreen,
  Home: HomeScreen
}

export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: undefined
    }
  }

  async componentDidMount() {
    const isLogged = await isLoggedIn();
    this.setState({ isLoggedIn: isLogged });
  }

  render(): JSX.Element {
    const { isLoggedIn } = this.state;
    if (isLoggedIn !== undefined) {
      const appNavigator = createStackNavigator(routes, { initialRouteName: isLoggedIn ? 'Home' : 'Launch' });
      const AppContainer = createAppContainer(appNavigator);
      return <AppContainer />
    } else {
      return <SplashScreen />
    }
  }
}