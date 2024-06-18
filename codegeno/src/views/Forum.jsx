import React from 'react';
import FormData from "../components/Form-data"
import "../css/forum.css";
import AddPost from '../components/Addpost';

const Forum = () => {
    return (
        <div className="forum-container">
            <h1>Welcome to the Forum</h1>
            <AddPost />
            <FormData />
        </div>
    );
};

export default Forum;
