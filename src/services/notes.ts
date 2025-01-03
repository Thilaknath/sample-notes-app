import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Note } from '../types';
import { trackNoteEvent } from '../utils/analytics';
import { AnalyticsEvent } from '../utils/analytics';

const NOTES_COLLECTION = 'notes';

export const createNote = async (userId: string, content: string) => {
  const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
    content,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  
  trackNoteEvent(AnalyticsEvent.NOTE_CREATE);
  return docRef.id;
};

export const updateNote = async (noteId: string, content: string) => {
  const noteRef = doc(db, NOTES_COLLECTION, noteId);
  await updateDoc(noteRef, {
    content,
    updatedAt: serverTimestamp()
  });
  
  trackNoteEvent(AnalyticsEvent.NOTE_EDIT);
};

export const deleteNote = async (noteId: string) => {
  const noteRef = doc(db, NOTES_COLLECTION, noteId);
  await deleteDoc(noteRef);
  
  trackNoteEvent(AnalyticsEvent.NOTE_DELETE);
};

export const getUserNotes = async (userId: string): Promise<Note[]> => {
  const q = query(
    collection(db, NOTES_COLLECTION),
    where('userId', '==', userId)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Note[];
};