import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, Timestamp, arrayUnion, addDoc } from "firebase/firestore";
import { db } from "../firbase-config/config";
import "../css/Form-data.css";

const generateDummyPosts = async () => {
    const postsCollection = collection(db, "posts");

    for (let i = 0; i < 10; i++) { 
        const dummyPost = {
            title: `Post ${i + 1}`,
            content: `This is the content of post ${i + 1}.`,
            username: `User${Math.floor(Math.random() * 1000)}`, 
            timestamp: Timestamp.fromDate(new Date()),
            likes: Math.floor(Math.random() * 10), 
            dislikes: Math.floor(Math.random() * 5), 
            comments: []
        };

        const numComments = Math.floor(Math.random() * 4); 
        for (let j = 0; j < numComments; j++) {
            dummyPost.comments.push({
                username: `User${Math.floor(Math.random() * 1000)}`,
                timestamp: Timestamp.fromDate(new Date()),
                content: `Comment ${j + 1} for post ${i + 1}.`
            });
        }

        try {
            await addDoc(postsCollection, dummyPost);
            console.log(`Dummy post ${i + 1} added successfully!`);

            await delay(10000); 
        } catch (error) {
            console.error("Error adding dummy post: ", error);
        }
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Formdata = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
            const postsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsList);
        });

        return () => unsubscribe();
    }, []);

    const handleGenerateDummyData = async () => {
        try {
            await generateDummyPosts();
            console.log("Dummy posts generated successfully!");
        } catch (error) {
            console.error("Error generating dummy posts: ", error);
        }
    };

    const handleLikeClick = async (postId) => {
        try {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
                likes: (posts.find(post => post.id === postId).likes || 0) + 1
            });
        } catch (error) {
            console.error("Error updating like: ", error);
        }
    };

    const handleDislikeClick = async (postId) => {
        try {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
                dislikes: (posts.find(post => post.id === postId).dislikes || 0) + 1
            });
        } catch (error) {
            console.error("Error updating dislike: ", error);
        }
    };

    const handleCommentSubmit = async (postId, commentInput) => {
        if (!commentInput.trim()) {
            return; 
        }

        try {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
                comments: arrayUnion({
                    username: "SampleUser",
                    timestamp: Timestamp.fromDate(new Date()),
                    content: commentInput
                })
            });
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    return (
        <div className="post-container">
            <button onClick={handleGenerateDummyData}>Generate Dummy Posts</button>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} className="post">
                        <div className="post-header">
                            <div className="username">@{post.username}</div>
                            <div className="timestamp">
                                {new Date(post.timestamp.seconds * 1000).toLocaleString()}
                            </div>
                        </div>
                        <div className="post-title">{post.title}</div>
                        <div className="post-content">{post.content}</div>
                        <div className="reaction-buttons">
                            <button className="reaction-button like-button" onClick={() => handleLikeClick(post.id)}>
                                Like
                            </button>
                            <button className="reaction-button dislike-button" onClick={() => handleDislikeClick(post.id)}>
                                Dislike
                            </button>
                        </div>
                        <div className="post-reactions">
                            Likes: {post.likes || 0} | Dislikes: {post.dislikes || 0}
                        </div>
                        <div className="comments-section">
                            <h3>Comments</h3>
                            {post.comments && post.comments.length > 0 ? (
                                post.comments.map((comment, index) => (
                                    <div key={index} className="comment">
                                        <div className="comment-username">{comment.username}</div>
                                        <div className="comment-timestamp">
                                            {new Date(comment.timestamp.seconds * 1000).toLocaleString()}
                                        </div>
                                        <div className="comment-content">{comment.content}</div>
                                    </div>
                                ))
                            ) : (
                                <div>No comments yet.</div>
                            )}
                            <form className="comment-form" onSubmit={(e) => {
                                e.preventDefault();
                                const commentInput = e.target.elements.comment.value;
                                handleCommentSubmit(post.id, commentInput);
                                e.target.elements.comment.value = "";
                            }}>
                                <input
                                    type="text"
                                    name="comment"
                                    placeholder="Add a comment..."
                                />
                                <button type="submit">Post Comment</button>
                            </form>
                        </div>
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Formdata;
