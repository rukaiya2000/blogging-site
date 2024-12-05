import { Timestamp } from "firebase/firestore";

export const formatDateFromFirebase = (firebaseTimestamp: Timestamp) => {
      const fbTimestamp = new Timestamp(firebaseTimestamp.seconds, firebaseTimestamp.nanoseconds);
      const date = fbTimestamp.toDate();
      const formatted = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric' 
      });

      return formatted
}