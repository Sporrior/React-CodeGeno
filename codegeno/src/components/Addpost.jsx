import React, { useEffect, useState } from "react";
import { doc, setDoc, Timestamp, getDoc } from "firebase/firestore";
import { auth, db, onAuthStateChanged } from "../firbase-config/config";
import "../css/Addpost.css";

const AddPost = () => {
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUsername(userData.username || '');
                }
            } else {
                setUsername(`Guest#${Math.floor(1000 + Math.random() * 9000)}`);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const uniqueId = `${username}-${Date.now()}`;
        try {
            await setDoc(doc(db, "posts", uniqueId), {
                username: username,
                timestamp: Timestamp.fromDate(new Date()),
                title: title,
                content: content
            });
            setMessage("Post successfully added!");
            setTitle("");
            setContent("");
            togglePopup();
        } catch (error) {
            console.error("Error adding document: ", error);
            setMessage("Error adding post.");
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
            <button className="add-post-button" onClick={togglePopup}>Add New Post</button>
            <div className={`add-post-popup ${showPopup ? 'active' : ''}`}>
                <div className="add-post-form">
                    <h2>Add a New Post</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    readOnly
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Content:
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                ></textarea>
                            </label>
                        </div>
                        <button type="submit">Add Post</button>
                    </form>
                    {message && <p className="add-post-message">{message}</p>}
                </div>
            </div>
        </>
    );
};

export default AddPost;
