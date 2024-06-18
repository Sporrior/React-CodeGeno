import React from "react";
import { addDoc, Timestamp, collection } from "firebase/firestore";
import { db } from "../firbase-config/config";

const WriteDataToDb = () => {
    const handleButtonClick = async () => {
        try {
            await addDoc(collection(db, "posts"), {
                username: "gameenthusiast",
                timestamp: Timestamp.fromDate(new Date()),
                title: "The Future of Gaming Technology",
                content: "Gaming technology continues to evolve with advancements in virtual reality (VR), augmented reality (AR), and cloud gaming. From AAA titles to indie games, developers leverage Unreal Engine, Unity, and CryEngine for immersive experiences and realistic graphics. Online multiplayer gaming, esports, and streaming platforms like Twitch redefine social interaction and entertainment. Emerging technologies like AI and 5G promise faster rendering, smarter NPCs, and seamless gameplay experiences."
            });
            console.log("Document successfully written!");
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Write More Hardcoded Data to Firestore</button>
        </div>
    );
};

export default WriteDataToDb;
