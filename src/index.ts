import type { CollectionReference } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useDocumentData<T>(
  collectionRef: CollectionReference,
  documentId: string
) {
  const ref = doc(collectionRef, documentId);

  const [data, setData] = useState<T>();

  useEffect(() => {
    getDoc(ref)
      .then((snapshot) => {
        setData(snapshot.data() as T);
      })
      .catch((error) => console.error(error));
  });

  return data;
}
