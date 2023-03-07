const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {getMessaging} = require('firebase-admin/messaging');

admin.initializeApp();

exports.sendNotification = functions.https.onCall(
  async ({token, data}, context) => {
    try {
      const message = {
        notification: {
          title: `You have been challenged!`,
          body: `Put your running shoes on, it is time to prove yourself`,
        },
        data,
        token,
       
      };
      const messaging = getMessaging();
      const response = await messaging.send(message);
      return `Notification sent to user`;
    } catch (error) {
      return error;
    }
  },
);
