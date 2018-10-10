import { auth, db } from './firebase';
import * as actions from '../redux/actions';

export default {
  start: (dispatch) => {
    let userMetaUnsubscribe;
    let profileUnsubscribe;

    auth.onAuthStateChanged((user) => {
      dispatch(actions.authLoaded());
      if (user) {
        dispatch(actions.authSuccess(user));
        userMetaUnsubscribe = db.collection('users').doc(user.uid)
          .onSnapshot((userMeta) => {
            dispatch(actions.userMetaUpdated(userMeta.data()));
          });
        profileUnsubscribe = db.collection('profiles').doc(user.uid)
          .onSnapshot((profile) => {
            dispatch(actions.profileUpdated(profile.exists ? profile.data() : {}));
          });
      } else {
        if (typeof userMetaUnsubscribe === 'function') {
          userMetaUnsubscribe();
        }
        if (typeof profileUnsubscribe === 'function') {
          profileUnsubscribe();
        }
        dispatch(actions.logout());
      }
    });
  },
};
