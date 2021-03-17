const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();



// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   console.log('sibin sss')
//   response.send("Hello from Firebase!");
// });

exports.sentEmail = functions.firestore.document('ClientSignUp/{id}').onCreate((snap, context) => {
      const newValue = snap.data();
        console.log(context)
});