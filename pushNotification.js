import functions from '@react-native-firebase/functions'


const pushNotification = async (fcmToken) => {
    try {
      const sendNotification = firebase
        .functions()
        .httpsCallable('sendNotification');
      const response = await sendNotification({
        token:
          `${fcmToken}`,
        data: {
          title: 'Someone challenged you',
          text: 'Put your running shoes on - You have been challenged',
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

export { pushNotification}