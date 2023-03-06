import messaging from '@react-native-firebase/messaging';

const sendBackgroundNotification = async () => {
    try {
          const message = {
            token: "fyFIcy6xQ32rVWkm_U5CMA:APA91bHGWfRQNBE-hTmJkS5AwHx-ECPRfdUvSGtGdW0FNFl5jFo2pJYHLJ9FPIhdyWZ6ws8K-Q4AGsKOgl1WRkuCt3ZYZFqGc5TlZi0noCbFmqF8YJLr6vb51h7wQb7z4zN2xg7PapBs",
            notification: {
              title: 'Test notification',
              body: 'This is a test notification sent from the app',
            },
          };
          await messaging().sendMesssage(message);
        }
       catch (error) {
        console.log('Error sending background notification:', error);
        throw error;
      }
    
    }

    export {sendBackgroundNotification};