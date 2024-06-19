// Dashboard/LatestPosts.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firbase-config/config';
import '../tests/hoofd.css';


const LatestPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = db.collection('posts').where('authorId', '==', user.uid).orderBy('createdAt', 'desc').limit(5);
        const snapshot = await postsRef.get();
        const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    fetchPosts();
  }, [user.uid]);

  return (
    <div className="latest-posts">
      <h3>Latest Posts</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestPosts;
