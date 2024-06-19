// Dashboard/Settings.jsx
import React, { useState } from 'react';
import { db } from '../firbase-config/config';
import '../tests/hoofd.css';

const Settings = ({ user }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSaveUsername = async () => {
    try {
      const userRef = db.collection('users').doc(user.uid);
      await userRef.set({ username }, { merge: true });
      console.log('Username updated successfully!');
    } catch (error) {
      console.error('Error updating username: ', error);
    }
  };

  return (
    <div className="settings">
      <h3>Settings</h3>
      <form onSubmit={handleSaveUsername}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <button type="submit">Save Username</button>
      </form>
    </div>
  );
};

export default Settings;
