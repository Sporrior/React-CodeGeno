// import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../css/footer.css'; // Import your CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>We are a team of passionate developers making the web a better place.</p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h2>Follow Us</h2>
                    <div className="social-links">
                        <a href="https://www.facebook.com" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://www.twitter.com" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://www.instagram.com" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://www.linkedin.com" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Your Company | All Rights Reserved
            </div>
        </footer>
    );
}

export default Footer;
