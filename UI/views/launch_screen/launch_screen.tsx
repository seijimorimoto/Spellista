import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient colors={['#e94057', '#ff1493', '#b000af', '#3f0081']} style={{flex: 1, width: '100%'}}>
      <Button
        onPress={() => console.log('Login')}
        title="Log-in using Spotify"
        accessibilityLabel="Log-in using Spotify" 
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

