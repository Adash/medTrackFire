import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './config';

class Firebase {
  constructor() {
    app.initializeApp(config);

    console.log('initialising Firebase');
    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  fbSignIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  fbSignOut = () => {
    console.log('signed out');
    return this.auth.signOut();
  };

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** User API ***
  fbCreateUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // *** Meditation API ***
  meditation = (uid) => this.db.ref(`meditations/${uid}`);

  meditations = () => this.db.ref('meditations');

  getReps = (uid) => this.db.ref(`meditations/${uid}/repetitions`);

  historyElement = (uid) => this.db.ref(`history/${uid}`);

  history = () => this.db.ref('history');

  // *** Merge Auth and DB User API * **

  fbAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then((snapshot) => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and dbUser
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
