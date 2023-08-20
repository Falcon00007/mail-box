import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.aboutSection}>
      <h2>About Our Email Application</h2>
      <p>
        Welcome to our email application, where you can send and receive emails just like any other mailbox client.
        With a user-friendly interface and powerful features, managing your emails has never been easier.
      </p>
      <p>
        Our application allows you to:
      </p>
      <ul>
        <li>Compose and send emails to anyone in your contact list.</li>
        <li>Receive and read emails from your contacts.</li>
        <li>Organize your emails with folders and labels.</li>
        <li>Search for specific emails using our advanced search functionality.</li>
        <li>Customize your email settings to suit your preferences.</li>
      </ul>
      <p>
        Whether you're a business professional or simply want to stay connected with friends and family,
        our email application has you covered.
      </p>
    </section>
  );
};

export default About;
