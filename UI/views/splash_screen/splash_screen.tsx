import React from 'react';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function SplashScreen() {
  return (
    <LinearGradient colors={['#e94057', '#ff1493', '#b000af', '#3f0081']} style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{ width: 230, height: 72 }}
        source={require('../../assets/images/logo.png')}
      />
    </LinearGradient>
  );
}

export { SplashScreen }