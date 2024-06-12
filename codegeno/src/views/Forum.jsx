import { useState } from 'react';
import '../css/Forum.css';

const Forum = () => {
  const [topics, setTopics] = useState([
    { id: 1, title: 'React Basics', posts: [{ id: 1, content: 'What is React?' }] },
    { id: 2, title: 'Advanced React', posts: [{ id: 1, content: 'React Hooks' }] },
  ]);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newPostContent, setNewPostContent] = useState('');

  const selectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const addPost = () => {
    if (newPostContent.trim() && selectedTopic) {
      const updatedTopics = topics.map(topic =>
        topic.id === selectedTopic.id
          ? { ...topic, posts: [...topic.posts, { id: topic.posts.length + 1, content: newPostContent }] }
          : topic
      );
      setTopics(updatedTopics);
      setNewPostContent('');
    }
  };

  return (
    <div>
      <h1>Forum</h1>
      <div className="forum-container">
        <div className="topic-list">
          <h2>Topics</h2>
          <ul>
            {topics.map(topic => (
              <li key={topic.id} onClick={() => selectTopic(topic)}>
                {topic.title}
              </li>
            ))}
          </ul>
        </div>
        {selectedTopic && (
          <div className="post-list">
            <h2>{selectedTopic.title}</h2>
            <ul>
              {selectedTopic.posts.map(post => (
                <li key={post.id}>{post.content}</li>
              ))}
            </ul>
            <div className="new-post">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Write your post..."
              />
              <button onClick={addPost}>Add Post</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
