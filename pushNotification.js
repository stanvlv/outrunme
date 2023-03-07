import functions from '@react-native-firebase/functions';
import firebase from '@react-native-firebase/app';

const pushNotification = async fcmToken => {
  try {
    const sendNotification = firebase
      .functions()
      .httpsCallable('sendNotification');
    const response = await sendNotification({
      token: `${fcmToken}`,
      data: {
        title: 'Someone challenged you',
        body: 'Put your running shoes on, it is time to prove yourself',
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export {pushNotification};
