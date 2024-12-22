The original code lacked proper logging within the promise chain of the `set()` method. This made it impossible to know for certain if the data reached Firestore. The solution adds a `.then()` block to the `set()` promise to log the write result, ensuring the data is properly written.  If an error occurs, that too is logged.  Example:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.addData = functions.https.onCall(async (data, context) => {
  try {
    await db.collection('myCollection').doc().set(data).then(() => {
          console.log('Data written with ID: ', docRef.id);
    }).catch((error) => {
      console.error('Error writing document: ', error);
    });
    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
});
```