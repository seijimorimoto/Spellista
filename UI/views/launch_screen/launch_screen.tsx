import React from 'react';
import { Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginWithSpotify } from '../../util/auth';

function LaunchScreen() {
  return (
    <LinearGradient colors={['#e94057', '#ff1493', '#b000af', '#3f0081']} style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{ width: 230, height: 72 }}
        source={require('./logo.png')}
      />
      <Button
        onPress={() => loginWithSpotify()}
        title="Log-in using Spotify"
        accessibilityLabel="Log-in using Spotify"
      />
    </LinearGradient>
  );
}

export { LaunchScreen }