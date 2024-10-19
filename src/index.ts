import type { CollectionReference } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useDocumentDataOnce<T>(
  collectionRef: CollectionReference,
  documentId?: string
) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const fetchData = async () => {
      if (!documentId) {
        return;
      }

      console.log("+++ Fetching data for", collectionRef.path, documentId);

      /**
       * Despite the log above printing the correct path, the following line
       * claims that collectionRef is not a reference.
       */
      const ref = doc(collectionRef, documentId);

      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setData(snapshot.data() as T);
      } else {
        throw new Error(`No document at ${collectionRef.path}/${documentId}`);
      }
    };

    fetchData().catch(console.error);
  }, [collectionRef, documentId]); // Add ref to the dependency array

  return data;
}

export function useDocumentDataOnceMaybe<T>(
  collectionRef: CollectionReference,
  documentId?: string
) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const fetchData = async () => {
      if (!documentId) {
        return;
      }

      const ref = doc(collectionRef, documentId);

      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setData(snapshot.data() as T);
      } else {
        setData(undefined);
      }
    };

    fetchData().catch(console.error);
  }, [collectionRef, documentId]); // Add ref to the dependency array

  return data;
}
