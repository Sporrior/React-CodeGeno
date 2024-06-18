const generateDummyPosts = async () => {
    const batch = db.batch();
    const postsCollection = collection(db, "posts");

    for (let i = 0; i < 10; i++) { // Generate 10 dummy posts
        const postRef = doc(postsCollection);
        const dummyPost = {
            title: `Post ${i + 1}`,
            content: `This is the content of post ${i + 1}.`,
            username: `User${Math.floor(Math.random() * 1000)}`, // Random username
            timestamp: Timestamp.fromDate(new Date()),
            likes: Math.floor(Math.random() * 10), // Random number of likes (0-9)
            dislikes: Math.floor(Math.random() * 5), // Random number of dislikes (0-4)
            comments: []
        };

        // Generate random number of comments (0-3) for each post
        const numComments = Math.floor(Math.random() * 4); // Maximum of 3 comments
        for (let j = 0; j < numComments; j++) {
            dummyPost.comments.push({
                username: `User${Math.floor(Math.random() * 1000)}`, // Random username
                timestamp: Timestamp.fromDate(new Date()),
                content: `Comment ${j + 1} for post ${i + 1}.`
            });
        }

        batch.set(postRef, dummyPost);
    }

    // Commit the batch
    await batch.commit();
};
