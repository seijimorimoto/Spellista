import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  addBtnContainer: {
    paddingHorizontal: 20
  },
  addBtnText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  },
  logOutBtnContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 14
  },
  logOutBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
