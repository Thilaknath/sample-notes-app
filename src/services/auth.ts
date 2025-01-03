import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { trackUserEvent } from '../utils/analytics';
import { AnalyticsEvent } from '../utils/analytics';

export const signIn = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  trackUserEvent(AnalyticsEvent.LOGIN);
  return result;
};

export const signUp = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  trackUserEvent(AnalyticsEvent.SIGN_UP);
  return result;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  trackUserEvent(AnalyticsEvent.LOGIN, { method: 'google' });
  return result;
};

export const signOut = async () => {
  await firebaseSignOut(auth);
  trackUserEvent(AnalyticsEvent.LOGOUT);
};