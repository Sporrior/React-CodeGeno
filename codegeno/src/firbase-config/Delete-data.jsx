import React from "react";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firbase-config/config";

const DeleteAllDataFromDb = () => {
    const handleButtonClick = async () => {
        try {
            const collectionRef = collection(db, "posts");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);

            const batchSize = querySnapshot.size;
            if (batchSize === 0) {
                console.log("No documents found in the collection.");
                return;
            }

            const deletePromises = querySnapshot.docs.map((document) => deleteDoc(doc(db, "posts", document.id)));

            await Promise.all(deletePromises);
            console.log("All documents successfully deleted!");
        } catch (error) {
            console.error("Error deleting documents: ", error);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Delete All Documents from Firestore</button>
        </div>
    );
};

export default DeleteAllDataFromDb;
