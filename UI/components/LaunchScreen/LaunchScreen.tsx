import React from 'react';
import { Image, TouchableHighlight, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginWithSpotify } from '../../util/auth';
import { LaunchScreenProps } from './LaunchScreen.types';
import { StackActions, NavigationActions } from 'react-navigation';
import { launchScreenStyles } from './LaunchScreen.styles';

class LaunchScreen extends React.Component<LaunchScreenProps, any> {
  render(): JSX.Element {
    const { logInBtnContainer, logInBtnText } = launchScreenStyles;
    return (
      <LinearGradient
        colors={['#e94057', '#ff1493', '#b000af', '#3f0081']}
        style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
        <Image
          style={{ width: 230, height: 72 }}
          source={require('../../assets/images/logo.png')}
        />
        <TouchableHighlight
          onPress={this._onLogin}
          style={logInBtnContainer}
          underlayColor="#D1D1D1"
        >
          <Text style={logInBtnText}>Login with Spotify</Text>
        </TouchableHighlight>
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
