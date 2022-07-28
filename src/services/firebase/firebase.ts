import firebase from 'firebase';
import 'firebase/auth';
import analytics from '@react-native-firebase/analytics';
import * as RootNavigation from '../../RootNavigation';

import {
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_EMAIL,
  FIREBASE_PASSWORD,
  FIREBASE_API_KEY,
} from '../../env-files/env';
import { NavigationState } from '@react-navigation/native';

const config = {
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
  apiKey: FIREBASE_API_KEY || 'AIzaSyD6cmZbJTUNcTFGh3ZvshgpWUigASMzFl0',
};

const Firebase = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

const auth = {
  email: FIREBASE_EMAIL,
  password: FIREBASE_PASSWORD,
};

Firebase.auth()
  .signInWithEmailAndPassword(auth.email, auth.password)
  .catch((err) => {
    console.warn(err.message);
  });

function recursiveScreenName(rootState: NavigationState): string {
  if (rootState?.routes[rootState.index]?.state?.routes?.length > 1) {
    return recursiveScreenName(rootState?.routes[rootState.index]?.state);
  }
  return rootState?.routes[rootState.index]?.name;
}

async function logCustomEvent(eventId: string) {
  const { store } = require('../../store');
  const rootState = RootNavigation?.navigationRef?.current?.getRootState();
  const routeName = recursiveScreenName(rootState);

  analytics().logScreenView({
    screen_class: routeName,
    screen_name: routeName,
  });

  analytics().setUserId(
    store?.getState()?.user?.user?.paciente?.email?.replace(/ /g, '') ||
      store
        ?.getState()
        ?.user?.user?.paciente?.telefoneCelularSemFormatacao?.replace(/ /g, '')
  );
  if (eventId !== undefined && eventId !== null && eventId !== '' && eventId) {
    await analytics().logEvent(eventId, {
      id: eventId,
    });
  }
}

export default Firebase;
export { logCustomEvent };

export const slugify = (string: string) => {
  if (string !== undefined && string !== null && string !== '' && string) {
    string = splitWordsGroup(string, 1, 6);
    const a =
      'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const b =
      'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-e-') // Replace & with 'and'
      .replace(/[^\w-]+/g, '') // Remove all non-word characters
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/-+/g, '_') // Replace - with _
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
  return false;
};

let splitWordsGroup = (string: string, eqLength = 3, wordLength = 3) =>
  string
    .replace('_', ' ')
    .split(' ')
    .reduce((str, word) => {
      if (word.length >= eqLength) {
        str = str.concat(`${word.slice(0, wordLength)}`);
      }
      return `${str}-`;
    }, '')
    .slice(0, -1);
