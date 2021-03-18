const functions = require("firebase-functions");
const admin = require('firebase-admin');
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

admin.initializeApp({
  storageBucket: "alpha-media-dev.appspot.com"
});

exports.sentEmail = functions.firestore.document('ClientSignUp/{id}').onCreate(async (snap, context) => {
      
      const newValue = snap.data();
      const id = context.params.id;
      //let id = 'p0idBa2nmu3rIip7eri5'
      
      const adharUrl = await admin.storage().bucket().file(`ClientSignUp/${id}/${newValue.Adhar}`).getSignedUrl({action: 'read', expires: '03-09-3000'})
      const panUrl = await admin.storage().bucket().file(`ClientSignUp/${id}/${newValue.Pan}`).getSignedUrl({action: 'read', expires: '03-09-3000'})
      const chequeUrl = await admin.storage().bucket().file(`ClientSignUp/${id}/${newValue.CancelledCheque}`).getSignedUrl({action: 'read', expires: '03-09-3000'})
      const gstUrl = await admin.storage().bucket().file(`ClientSignUp/${id}/${newValue.Gst}`).getSignedUrl({action: 'read', expires: '03-09-3000'})

      let emailObj = {
        Name: `Name: ${newValue.Name}`,
        CompanyName: `Company Name: ${newValue.CompanyName}`,
        Mobile: `Mobile: ${newValue.Mobile}`,
        Email: `Email: ${newValue.Email}`,
        AccNo: `Account No: ${newValue.AccNo}`,
        AccName: `Account Name: ${newValue.AccName}`,
        Branch: `Branch: ${newValue.Branch}`,
        Ifsc: `IFSC: ${newValue.Ifsc}`,
        Adhar: `Adhar: ${newValue.Adhar}`,
        Pan: `Pan: ${newValue.Pan}`,
        CancelledCheque: `Cancelled Cheque: ${newValue.CancelledCheque}`,
        Gst: `Gst: ${newValue.Gst}`,
        AdharDwldUrl: adharUrl[0],
        PanDwldUrl: panUrl[0],
        CancelledChequeDwldUrl: chequeUrl[0],
        GstDwldUrl: gstUrl[0],
      }

      await firestore.collection('ClientSignUp').doc(id).update({
        AdharDwldUrl: adharUrl[0],
        PanDwldUrl: panUrl[0],
        CancelledChequeDwldUrl: chequeUrl[0],
        GstDwldUrl: gstUrl[0],
      })
});

// {
//   Name: 'Sibin',
//   CompanyName: 'ONVI',
//   Mobile: '9562571150',
//   Email: 'ss@ss.com',
//   AccNo: '9562588552',
//   AccName: 'Test',
//   Branch: 'Chennai',
//   Ifsc: 'LOLOL',
//   Adhar: 'adhar.jpg',
//   Pan: 'pan.jpg',
//   CancelledCheque: 'chequ.jpg',
//   Gst: 'gst.jpg'
// }
