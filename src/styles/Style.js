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
        borderColor: '#80808040'
      },
      loginButtonText: {
        color: '#F1600D',
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: 3
      },
      textColor: {
        color: '#1A265A',
      },
      heading: {
       
        fontWeight: "800",
        color: "#F1600D",
        fontSize: 18
        
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
      },
      containerHome: {
        flex: 1,
        backgroundColor: '#FEF6ED',
      },
      titleTextHome: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerHome: {
        backgroundColor: '#F5FCFF',
        padding: 20,
      },
      headerTextHome: {
        fontSize: 16,
        fontWeight: '500',
      },
      separatorHome: {
        height: 0.5,
        backgroundColor: '#808080',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
      },
      textHome: {
        fontSize: 16,
        color: '#606070',
        padding: 10,
      },
      contentHome: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
      },
      activeButtonHome: {
        color: '#007aff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      inactiveButtonHome: {
        colorScheme: 'red',
      },
      topNavigationHome: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEF6ED',
        borderWidth: 1,
        borderColor: '#FEF6ED',
        borderRadius: 5,
        overflow: 'hidden',
        paddingBottom: 15,
      },
      tabHome: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
      },
      activeTabHome: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F1600D',
      },
      activeTextHome: {
        color: '#F1600D',
        fontSize: 16,
        fontWeight: 'bold',
      },
      textTabHome: {
        color: '#50A5B1',
        fontSize: 16,
        fontWeight: 'bold',
      },
    
      plusIconHome: {
        position: 'absolute',
        left: '50%',
        transform: [{translateX: -32}],
        bottom: 0,
      },
      containerMap: {
        flex: 1,
        backgroundColor: '#FEF6ED',
      },
      sectionContainerMap: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
    
      colorOrangeMap: {
        color: '#F1600D',
      },
      sectionTitleMap: {
        fontSize: 24,
        fontWeight: '600',
      },
      buttonMap: {
        color: 'white',
        paddingHorizontal: 30,
        bottom: 0,
        borderRadius: 12,
      },
      buttonTextMap: {
        color: '#FEF6ED',
      },
    
      buttonStartTextMap: {
        fontSize: 40,
        color: 'white',
      },
      theButtonsMap: {
        marginTop: 20,
      },
      logoutButtonMap: {
        width: 150,
      },
      customTextMap: {
        color: '#1A265A',
        fontSize: 22,
        fontWeight: '600',
        paddingBottom: 20,
      },
      TextMiniWhiteMap: {
        color: 'white',
      },
      containerChallengeItem: {
        flex: 1,
      },
      titleTextChallengeItem: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerChallengeItem: {
        backgroundColor: '#FEF6ED',
        opacity: 0.8,
        borderColor: '#50A5B1',
        padding: 20,
        borderTopColor: '#50A5B1',
        borderTopWidth: 0.5,
      },
      headerTextChallengeItem: {
        fontSize: 25,
        fontWeight: '500',
      },
      separatorChallengeItem: {
        height: 1.5,
        backgroundColor: '#F1600D',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
      },
      textChallengeItem: {
        fontSize: 16,
        color: '#1A265A',
        padding: 10,
      },
      contentChallengeItem: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#50A5B130',
      },
    
      dateChallengeItem: {
        textAlign: 'right',
        fontSize: 12,
      },
    
      timeKmChallengeItem: {
        fontSize: 19,
      },
    
      // time and distance labels:
    
      colorBlueChallengeItem: {
        color: '#50A5B1',
      },
    
      fillBlueChallengeItem: {
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
        backgroundColor: '#50A5B1',
      },
    
      borderBlueChallengeItem: {
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
      },
    
      colorWhiteChallengeItem: {
        color: 'white',
      },
    
      colorOrangeChallengeItem: {
        color: '#F1600D',
      },
    
      buttonDeclineChallengeItem: {
        marginTop: 2,
        backgroundColor: 'transparent',
        padding: 7,
        borderColor: '#F1600D',
        borderWidth: 2,
        borderRadius: 7,
      },
    
      buttonAcceptChallengeItem: {
        marginTop: 2,
        backgroundColor: 'transparent',
        padding: 7,
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
      },
    
      colorWhiteChallengeItem: {
        color: 'white',
      },
    
      rejectedChallengeItem: {
        fontSize: 18,
        color: '#F1600D',
      },
      containerChallengeItemFinished: {
        flex: 1,
      },
      titleTextChallengeItemFinished: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerChallengeItemFinished: {
        backgroundColor: '#FEF6ED',
        opacity: 0.8,
        borderColor: '#50A5B1',
        padding: 20,
        borderTopColor: '#50A5B1',
        borderTopWidth: 0.5,
      },
      headerTextChallengeItemFinished: {
        fontSize: 25,
        fontWeight: '500',
      },
      separatorChallengeItemFinished: {
        height: 1.5,
        backgroundColor: '#F1600D',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
      },
      textChallengeItemFinished: {
        fontSize: 16,
        color: '#1A265A',
        padding: 10,
      },
      contentChallengeItemFinished: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#50A5B130',
      },
    
      dateChallengeItemFinished: {
        textAlign: 'right',
        fontSize: 12,
      },
    
      timeKmChallengeItemFinished: {
        fontSize: 19,
      },
    
      // time and distance labels:
    
      colorBlueChallengeItemFinished: {
        color: '#50A5B1',
      },
    
      fillBlueChallengeItemFinished: {
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
        backgroundColor: '#50A5B1',
      },
    
      borderBlueChallengeItemFinished: {
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
      },
    
      colorWhiteChallengeItemFinished: {
        color: 'white',
      },
    
      colorOrangeChallengeItemFinished: {
        color: '#F1600D',
      },
    
      buttonDeclineChallengeItemFinished: {
        marginTop: 2,
        backgroundColor: 'transparent',
        padding: 7,
        borderColor: '#F1600D',
        borderWidth: 2,
        borderRadius: 7,
      },
    
      buttonAcceptChallengeItemFinished: {
        marginTop: 2,
        backgroundColor: 'transparent',
        padding: 7,
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
      },
    
      colorWhiteChallengeItemFinished: {
        color: 'white',
      },
    
      rejectedChallengeItemFinished: {
        fontSize: 18,
        color: '#F1600D',
      },
      containerBigDistanceItem: {
        space: 5,
        paddingHorizontal: 3,
        paddingVertical: 1,
        marginHorizontal: 100,
        marginTop: 10,
        alignItems: 'center',
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderTopStartRadius: 7,
        borderTopEndRadius: 7,
        backgroundColor: '#50A5B1',
        width: '95%',
      },
      containerSmallDistanceItem: {
        paddingHorizontal: 3,
        paddingVertical: 1,
        marginVertical: 5,
        alignItems: 'center',
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
        width: '95%',
      },
    
      colorBlueDistanceItem: {
        color: '#50A5B1',
      },
    
      colorWhiteDistanceItem: {
        color: 'white',
      },
    
      textColorBlueDistanceItem: {
        fontSize: 50,
        color: '#50A5B1',
      },
    
      textColorWhiteDistanceItem: {
        fontSize: 50,
        color: 'white',
      },
      containerMapFinishedChallenges: {
        display: 'flex',
        //   ...StyleSheet.absoluteFillObject,
        height: 275,
        width: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      mapFinishedChallenges: {
        ...StyleSheet.absoluteFillObject,
      },
      containerFinishedChallenges: {
        flex: 1,
      },
      titleTextFinishedChallenges: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
      },
      headerFinishedChallenges: {
        backgroundColor: '#FEF6ED',
        opacity: 0.8,
        borderColor: '#50A5B1',
        padding: 20,
        borderTopColor: '#50A5B1',
        borderTopWidth: 0.5,
      },
      headerTextFinishedChallenges: {
        fontSize: 25,
        fontWeight: '500',
      },
      separatorFinishedChallenges: {
        height: 1.5,
        backgroundColor: '#F1600D',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
      },
      textFinishedChallenges: {
        fontSize: 16,
        color: '#1A265A',
        padding: 10,
      },
      myMapStyleFinishedChallenges: {
        borderWidth: 5,
        borderColor: "#blue",
        backgroundColor: '#FEF6ED',
      },
      opponentMapStyleFinishedChallenges: {
        backgroundColor: '#FEF6ED',
      },
    
      dateFinishedChallenges: {
        fontSize: 13,
        // color: '#50A5B1',
      },
    
      timeKmFinishedChallenges: {
        fontSize: 19,
      },
    
      // time and distance labels:
    
      colorBlueFinishedChallenges: {
        color: '#50A5B1',
      },
    
      fillBlueFinishedChallenges: {
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
        backgroundColor: '#50A5B1',
      },
    
      borderBlueFinishedChallenges: {
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
      },
    
      colorWhiteFinishedChallenges: {
        color: 'white',
      },
    
      colorOrangeFinishedChallenges: {
        color: '#F1600D',
      },
    
      buttonDeclineFinishedChallenges: {
        marginTop: 2,
        backgroundColor: 'transparent',
        padding: 7,
        borderColor: '#F1600D',
        borderWidth: 2,
        borderRadius: 7,
      },
    
      buttonAcceptFinishedChallenges: {
        marginTop: 2,
        backgroundColor: 'transparent',
        padding: 7,
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
      },
    
      colorWhiteFinishedChallenges: {
        color: 'white',
      },
    
      rejectedFinishedChallenges: {
        fontSize: 18,
        color: '#F1600D',
      },
      userBorderLeaderboardItem: {
        backgroundColor: '#50A5B1CC',
        color: 'white',
      },
      rankTextLeaderboardItem: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingRight: 2,
      },
      username: {
        fontSize: 25,
      },
      pointsLeaderboardItem: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 'auto',
        color: 'black',
        opacity: 0.6,
      },
      statsLeaderboardItem: {
        fontSize: 22,
      },
      borderStatsLeaderboardItem: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
      },
    
      colorOrangeLeaderboardItem: {
        color: '#F1600D',
      },
      containerMapMapContainer: {
        display: 'flex',
        //   ...StyleSheet.absoluteFillObject,
        height: 175,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      mapMapContainer: {
        ...StyleSheet.absoluteFillObject,
      },
      containerBigTimerItem: {
        space: 5,
        paddingHorizontal: 3,
        paddingVertical: 1,
        marginHorizontal: 10,
        marginTop: 10,
        alignItems: 'center',
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderTopEndRadius: 7,
        borderTopStartRadius: 7,
        backgroundColor: '#50A5B1',
        width: '95%',
      },
    
      containerSmallTimerItem: {
        paddingHorizontal: 3,
        paddingVertical: 1,
        marginVertical: 10,
        alignItems: 'center',
        borderColor: '#50A5B1',
        borderWidth: 2,
        borderRadius: 7,
        width: '95%',
      },
    
      colorBlueTimerItem: {
        color: '#50A5B1',
      },
    
      colorWhiteTimerItem: {
        color: 'white',
      },
    
      textColorBlueTimerItem: {
        fontSize: 50,
        color: '#50A5B1',
      },
    
      textColorWhiteTimerItem: {
        fontSize: 50,
        color: 'white',
      },
      
      
})

export {styles};
