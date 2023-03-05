import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  appColor: {
    lightBlue: '#50A5B1',
    orange: '#F1600D',
    lightOrange: '#FEF6ED',
    blue: '#1A265A',
  },
  loginButton: {
    backgroundColor: '#FEF6ED',
    borderWidth: 1,
    borderColor: '#80808040',
    marginTop: 10,
  },
  googleButton: {
    marginTop: 25,
    backgroundColor: '#FEF6ED',
    width: '47%',
    borderWidth: 1,
    borderColor: '#80808040',
  },
  loginButtonText: {
    color: '#F1600D',
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 3,
  },
  textColor: {
    color: '#1A265A',
  },
  heading: {
    fontWeight: '800',
    color: '#F1600D',
    fontSize: 18,
  },
  screenColor: {
    flex: 1,
    backgroundColor: '#FEF6ED',
  },
  logoutButton: {
    backgroundColor: '#50A5B1',
    width: 120,
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#FEF6ED',
  },
  challengeButton: {
    backgroundColor: '#50A5B1',
    maxHeight: 55,
  },
  HeaderText: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
  },
});

export {styles};
