import React, { useEffect, useState } from 'react';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    Timestamp,
    arrayUnion,
    addDoc,
    getDoc
} from 'firebase/firestore';
import { auth, db, onAuthStateChanged } from '../firbase-config/config';
import '../css/Form-data.css';

const sampleNames = [
    "Alice", "Bob", "Charlie", "David", "Eva",
    "Frank", "Grace", "Hannah", "Ivy", "Jack",
    "Klara", "Lucas", "Mila", "Noah", "Olivia",
    "Pieter", "Quincy", "Rosa", "Sven", "Tessa"
];

const sampleTitles = [
    "De Basisprincipes van Softwareontwikkeling",
    "De Toekomst van Kunstmatige Intelligentie",
    "Versiebeheer met Git",
    "Tips voor Effectief Debuggen",
    "Beste Praktijken voor Code Review",
    "Agile Methodologie Uitgelegd",
    "Inleiding tot DevOps",
    "Het Belang van Unit Testing",
    "Continuous Integration en Continuous Deployment",
    "Hoe een RESTful API te Ontwerpen",
    "Veiligheid in Webontwikkeling",
    "De Opkomst van Microservices",
    "JavaScript Frameworks Vergelijken",
    "Optimalisatie van Databaseprestaties",
    "Introductie tot Machine Learning",
    "Best Practices voor UX/UI Design",
    "Het Schrijven van Schone Code",
    "Automatisering met Scripttalen",
    "Begrip van Cloud Computing",
    "Effectief Werken in Remote Teams"
];

const sampleComments = [
    "Geweldige post!",
    "Zeer informatief, dank je wel!",
    "Ik heb hier veel van geleerd.",
    "Ik ben het niet eens met je punt.",
    "Kun je meer details geven?",
    "Bedankt voor het delen!",
    "Dit is zeer nuttig.",
    "Ik hou hiervan!",
    "Interessant perspectief.",
    "Goed geschreven!",
    "Dit helpt echt.",
    "Fantastisch artikel.",
    "Meer van dit graag!",
    "Geweldige inzichten.",
    "Ik waardeer dit.",
    "Uitstekend werk!",
    "Dit is precies wat ik zocht.",
    "Zeer behulpzaam.",
    "Leuk om te lezen.",
    "Bedankt voor de tips!"
];

const sampleContent = [
    "Dit artikel behandelt de basisprincipes van softwareontwikkeling, inclusief het ontwerpen, coderen, testen en onderhouden van softwaretoepassingen. Ontdek hoe je gestructureerde code kunt schrijven en waarom dit belangrijk is voor lange termijn projecten.",
    "Kunstmatige intelligentie (AI) heeft de potentie om de manier waarop we leven en werken drastisch te veranderen. In dit artikel duiken we in de toekomst van AI en verkennen we de mogelijkheden en uitdagingen die het met zich meebrengt.",
    "Versiebeheer is cruciaal voor elke ontwikkelaar. Git is een van de populairste tools hiervoor. Leer hoe je Git kunt gebruiken om je projecten te beheren, wijzigingen bij te houden en samen te werken met andere ontwikkelaars.",
    "Debuggen is een essentieel onderdeel van het ontwikkelingsproces. Dit artikel biedt tips en technieken voor effectief debuggen, zodat je sneller problemen kunt identificeren en oplossen in je code.",
    "Code reviews zijn een belangrijk onderdeel van de softwareontwikkeling. Ontdek de beste praktijken voor het uitvoeren van code reviews om de kwaliteit van je code te verbeteren en kennis te delen binnen je team.",
    "Agile methodologieën zijn populair in de softwareontwikkeling vanwege hun flexibiliteit en iteratieve benadering. Leer de basisprincipes van Agile en hoe je deze kunt toepassen op je projecten.",
    "DevOps combineert ontwikkeling en operaties om snellere en efficiëntere softwarelevering mogelijk te maken. In dit artikel bespreken we de belangrijkste concepten en voordelen van DevOps.",
    "Unit testing helpt bij het verzekeren van de kwaliteit en betrouwbaarheid van je code. Ontdek waarom unit tests belangrijk zijn en hoe je ze effectief kunt schrijven en onderhouden.",
    "Continuous Integration (CI) en Continuous Deployment (CD) automatiseren veel van de taken in de softwareontwikkeling. Leer hoe je CI/CD pipelines kunt opzetten om je ontwikkelingsproces te verbeteren.",
    "RESTful APIs zijn essentieel voor het bouwen van moderne webapplicaties. Dit artikel legt uit hoe je een RESTful API kunt ontwerpen en implementeren, inclusief best practices en veelvoorkomende valkuilen.",
    "Veiligheid is een topprioriteit in webontwikkeling. Ontdek de belangrijkste beveiligingsmaatregelen die je kunt nemen om je webapplicaties te beschermen tegen bedreigingen en aanvallen.",
    "Microservices zijn een populaire architectuurstijl voor het bouwen van schaalbare en flexibele applicaties. Leer wat microservices zijn en hoe je ze kunt toepassen in je eigen projecten.",
    "JavaScript heeft veel frameworks die ontwikkelaars kunnen gebruiken. Dit artikel vergelijkt enkele van de populairste JavaScript frameworks en helpt je te beslissen welke het beste bij je project past.",
    "Databaseprestaties kunnen een groot verschil maken in de snelheid en efficiëntie van je applicaties. Ontdek technieken voor het optimaliseren van databaseprestaties en het vermijden van veelvoorkomende problemen.",
    "Machine learning opent nieuwe mogelijkheden voor gegevensanalyse en automatisering. Leer de basisprincipes van machine learning en hoe je het kunt toepassen in je eigen projecten.",
    "UX/UI design is cruciaal voor het succes van een softwaretoepassing. Dit artikel behandelt best practices voor het ontwerpen van gebruiksvriendelijke en visueel aantrekkelijke interfaces.",
    "Schone code is gemakkelijker te begrijpen, te onderhouden en te testen. Ontdek de principes van het schrijven van schone code en hoe je je vaardigheden hierin kunt verbeteren.",
    "Automatisering kan veel tijd besparen in de softwareontwikkeling. Leer hoe je scripttalen kunt gebruiken om repetitieve taken te automatiseren en je workflow te verbeteren.",
    "Cloud computing biedt schaalbare en flexibele infrastructuur voor je applicaties. Ontdek de basisprincipes van cloud computing en hoe je het kunt gebruiken om je projecten te schalen.",
    "Remote teams zijn steeds gebruikelijker in de softwareontwikkeling. Leer hoe je effectief kunt samenwerken en communiceren binnen een remote team om succesvolle projecten te realiseren."
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateDummyPosts = async () => {
    const postsCollection = collection(db, "posts");

    for (let i = 0; i < 10; i++) {
        const title = getRandomElement(sampleTitles);
        const content = getRandomElement(sampleContent);

        const dummyPost = {
            title,
            content,
            username: getRandomElement(sampleNames),
            timestamp: Timestamp.fromDate(new Date()),
            likes: Math.floor(Math.random() * 10),
            dislikes: Math.floor(Math.random() * 5),
            comments: []
        };

        const numComments = Math.floor(Math.random() * 4);
        for (let j = 0; j < numComments; j++) {
            dummyPost.comments.push({
                username: getRandomElement(sampleNames),
                timestamp: Timestamp.fromDate(new Date()),
                content: getRandomElement(sampleComments)
            });
        }

        try {
            await addDoc(postsCollection, dummyPost);
            console.log(`Dummy post ${i + 1} added successfully!`);

            await delay(12000);
        } catch (error) {
            console.error("Error adding dummy post: ", error);
        }
    }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Formdata = () => {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "posts"), orderBy("timestamp", "desc")),
            (snapshot) => {
                const postsList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(postsList);
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUsername(userData.username || '');
                }
            }
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
                likes: (posts.find((post) => post.id === postId).likes || 0) + 1
            });
        } catch (error) {
            console.error("Error updating like: ", error);
        }
    };

    const handleDislikeClick = async (postId) => {
        try {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
                dislikes: (posts.find((post) => post.id === postId).dislikes || 0) + 1
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
                    username: username,
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
                posts.map((post) => (
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
                            <button
                                className="reaction-button like-button"
                                onClick={() => handleLikeClick(post.id)}
                            >
                                Like
                            </button>
                            <button
                                className="reaction-button dislike-button"
                                onClick={() => handleDislikeClick(post.id)}
                            >
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
                            <form
                                className="comment-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const commentInput = e.target.elements.comment.value;
                                    handleCommentSubmit(post.id, commentInput);
                                    e.target.elements.comment.value = "";
                                }}
                            >
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
