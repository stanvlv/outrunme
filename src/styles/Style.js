import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    appColor: {
        lightBlue: '#50A5B1',
        orange: '#F1600D',
        lightOrange: '#FEF6ED',
        blue: '#1A265A',
      },
      loginButton: {
        marginTop: 2,
        backgroundColor: '#FEF6ED',
        width: 115,
        marginLeft: 15,
      },
      loginButtonText: {
        color: '#50A5B1',
        fontSize: 18
      },
      textColor: {
        color: '#fff',
      },
      heading: {
       
        fontWeight: "600",
        color: "#fff",
        fontSize: 16
        
      },
      screenColor: {
        flex: 1,
        backgroundColor: '#FEF6ED',
      },
      logoutButton: {
        backgroundColor: "#50A5B1",
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
        color: '#FEF6ED'
      },
      challengeButton: {
        backgroundColor: "#50A5B1",
        maxHeight: 55,
      }
      
})

export { styles }