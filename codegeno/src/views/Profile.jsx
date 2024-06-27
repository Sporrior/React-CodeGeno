import React, { useState, useEffect } from 'react';
import {
    auth,
    db,
    storage,
    onAuthStateChanged,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    setDoc,
    getDoc,
    ref,
    uploadBytes,
    getDownloadURL,
    arrayUnion,
    arrayRemove,
    addDoc,
    deleteDoc,
    Timestamp
} from '../firbase-config/config';
import { signOut } from 'firebase/auth';
import '../css/Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [profilePicURL, setProfilePicURL] = useState('');
    const [posts, setPosts] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendUsername, setFriendUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDoc);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setUsername(userData.username || '');
                    setProfilePicURL(userData.profilePicURL || '');
                    await fetchPosts(userData.username || currentUser.displayName);
                    await fetchFriendRequests(userData.username || currentUser.displayName);
                } else {
                    setUsername(currentUser.displayName || '');
                    await setDoc(userDoc, { username: currentUser.displayName || '' });
                    await fetchPosts(currentUser.displayName || '');
                }
            } else {
                setUser(null);
                setPosts([]);
                setFriendRequests([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const fetchPosts = async (username) => {
        try {
            const q = query(collection(db, 'posts'), where('username', '==', username));
            const querySnapshot = await getDocs(q);
            const userPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(userPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const fetchFriendRequests = async (username) => {
        try {
            const q = query(collection(db, 'friendRequests'), where('to', '==', username));
            const querySnapshot = await getDocs(q);
            const requests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFriendRequests(requests);
        } catch (error) {
            console.error("Error fetching friend requests:", error);
        }
    };

    const handleUsernameChange = async () => {
        if (!newUsername.trim()) {
            setError('Username cannot be empty');
            return;
        }

        setUpdating(true);
        setError('');
        try {
            const q = query(collection(db, 'users'), where('username', '==', newUsername));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setError('Username already taken');
                setUpdating(false);
                return;
            }

            const userDoc = doc(db, 'users', user.uid);
            await setDoc(userDoc, { username: newUsername }, { merge: true });
            setUsername(newUsername);
            setNewUsername('');
            await fetchPosts(newUsername);
            await fetchFriendRequests(newUsername);
        } catch (error) {
            setError('Error updating username: ' + error.message);
        }
        setUpdating(false);
    };

    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `profilePics/${user.uid}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setProfilePicURL(downloadURL);
            await updateDoc(doc(db, 'users', user.uid), { profilePicURL: downloadURL });
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
    };

    const handleSendFriendRequest = async () => {
        if (!friendUsername.trim()) {
            setError('Friend username cannot be empty');
            return;
        }

        try {
            const q = query(collection(db, 'users'), where('username', '==', friendUsername));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setError('Username not found');
                return;
            }

            await addDoc(collection(db, 'friendRequests'), {
                from: username,
                to: friendUsername,
                timestamp: Timestamp.fromDate(new Date())
            });
            setFriendUsername('');
            setError('');
            alert('Friend request sent!');
        } catch (error) {
            setError('Error sending friend request: ' + error.message);
        }
    };

    const handleAcceptFriendRequest = async (requestId) => {
        try {
            const requestDoc = doc(db, 'friendRequests', requestId);
            const request = (await getDoc(requestDoc)).data();
            await updateDoc(doc(db, 'users', user.uid), {
                friends: arrayUnion(request.from)
            });
            await updateDoc(doc(db, 'users', request.from), {
                friends: arrayUnion(username)
            });
            await deleteDoc(requestDoc);
            setFriendRequests(friendRequests.filter(request => request.id !== requestId));
            alert('Friend request accepted!');
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    const handleRejectFriendRequest = async (requestId) => {
        try {
            await deleteDoc(doc(db, 'friendRequests', requestId));
            setFriendRequests(friendRequests.filter(request => request.id !== requestId));
            alert('Friend request rejected!');
        } catch (error) {
            console.error("Error rejecting friend request:", error);
        }
    };

    const convertTimestamp = (timestamp) => {
        const date = timestamp.toDate();
        return date.toDateString() + ' ' + date.toLocaleTimeString();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Profile</h2>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="profile-info">
                <div className="profile-pic">
                    <img src={profilePicURL || 'default-profile.png'} alt="Profile" />
                    <label htmlFor="profilePicUpload" className="change-pic-label">Change Profile Picture</label>
                    <input id="profilePicUpload" type="file" accept="image/*" onChange={handleProfilePicChange} />
                </div>
                <div className="profile-details">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {username}</p>
                </div>
            </div>
            <div className="username-update">
                <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={handleUsernameChange} disabled={updating}>
                    {updating ? 'Updating...' : 'Update Username'}
                </button>
                {error && <div className="error">{error}</div>}
            </div>
            <div className="friend-requests">
                <h3>Friend Requests</h3>
                <input
                    type="text"
                    placeholder="Friend's Username"
                    value={friendUsername}
                    onChange={(e) => setFriendUsername(e.target.value)}
                />
                <button onClick={handleSendFriendRequest}>Send Friend Request</button>
                <ul>
                    {friendRequests.map(request => (
                        <li key={request.id}>
                            {request.from}
                            <button onClick={() => handleAcceptFriendRequest(request.id)}>Accept</button>
                            <button onClick={() => handleRejectFriendRequest(request.id)}>Reject</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="recent-posts">
                <h3>Recent Posts</h3>
                {posts.length > 0 ? (
                    <div className="posts-list">
                        {posts.map(post => (
                            <div key={post.id} className="post">
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                                <small>{convertTimestamp(post.timestamp)}</small>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No recent posts</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
