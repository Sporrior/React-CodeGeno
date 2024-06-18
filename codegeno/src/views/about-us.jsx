import '../css/about-us.css';
import foto from '../assets/foto.jpeg';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="title-about">
        <h2>Become Part of a Never-Ending Community</h2>
      </div>
      <div className="bio">
        <div className="leftbio">
          <p>At <strong>CodeGeno</strong>, we believe in the power of learning through doing. Whether you're a seasoned developer looking to expand your expertise or a curious beginner taking your first steps into the world of programming, you'll find a supportive and vibrant community eager to help you along the way.</p>
          <p>Our community is built on the foundation of knowledge sharing. From tutorials and coding challenges to project showcases and code reviews, there's always an opportunity to learn something new and share your own insights with others. We believe that by fostering an environment where knowledge flows freely, we can all grow together as developers.</p>
          <p>But <strong>CodeGeno</strong> isn't just about learning; it's also about creating. Whether you're building a web application, crafting a mobile app, or experimenting with machine learning, our community provides the platform for you to turn your ideas into reality. And with our collaborative projects and hackathons, you'll have the chance to work alongside like-minded individuals to bring those ideas to life.</p>
          <p>So whether you're here to sharpen your skills, explore new technologies, or simply connect with fellow coders, we're excited to have you join us on this journey of learning, coding, and sharing.</p>
        </div>
        <div className="rightbio">
          <img src={foto} alt="Community Image" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
