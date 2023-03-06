const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {getMessaging} = require('firebase-admin/messaging');

admin.initializeApp();

exports.sendNotification = functions.https.onCall(
  async ({token, data}, context) => {
    try {
      const message = {
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
