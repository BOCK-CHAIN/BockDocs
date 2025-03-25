import { 
  collection, doc, getDoc, setDoc, 
  query, where, getDocs, deleteDoc, addDoc, orderBy 
} from 'firebase/firestore';
import { db } from '../config';

export const saveDocument = async (id, data) => {
  try {
    await setDoc(doc(db, 'documents', id), data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
};

export const getDocument = async (id) => {
  try {
    const docRef = doc(db, 'documents', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export const getUserDocuments = async (userId) => {
  try {
    const q = query(
      collection(db, 'documents'),
      where('userId', '==', userId),
      orderBy('lastModified', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

export const deleteDocument = async (docId) => {
  try {
    const docRef = doc(db, 'documents', docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const createDocument = async (userId, documentData) => {
  try {
    const docRef = await addDoc(collection(db, 'documents'), {
      ...documentData,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      userId
    });
    return { id: docRef.id, ...documentData };
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
}; 