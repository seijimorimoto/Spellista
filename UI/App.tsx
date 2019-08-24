import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LaunchScreen } from './views/launch_screen/launch_screen';

export default function App() {
  return (
    <View style={styles.container}>
      <LaunchScreen></LaunchScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
