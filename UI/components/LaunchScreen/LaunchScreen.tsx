import React from 'react';
import { Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginWithSpotify } from '../../util/auth';
import { LaunchScreenProps } from './LaunchScreen.types';
import { NavigationScreenOptions, StackActions, NavigationActions } from 'react-navigation';

class LaunchScreen extends React.Component<LaunchScreenProps, any> {
  static navigationOptions: NavigationScreenOptions = {
    headerStyle: {
      display: 'none'
    }
  };

  render(): JSX.Element {
    return (
      <LinearGradient
        colors={['#e94057', '#ff1493', '#b000af', '#3f0081']}
        style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
        <Image
          style={{ width: 230, height: 72 }}
          source={require('../../assets/images/logo.png')}
        />
        <Button
          onPress={this._onLogin}
          title="Log-in using Spotify"
          accessibilityLabel="Log-in using Spotify"
        />
      </LinearGradient>
    );
  }

  _onLogin = async () => {
    await loginWithSpotify();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })]
    });
    this.props.navigation.dispatch(resetAction);
  };
}

export { LaunchScreen };
