import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./splashpage.css";

export default function SplashPage() {
  return (
    <Container>
      <div className="header-card">
        <div className="logo-container">
          <img src="https://i.imgur.com/ef9wJEQ.png" alt="Logo" className="logo-image" />
        </div>
        <h1>Welcome to Gracefully Baked!</h1>
        <h2>My name is Grace. By day I'm a software developer, by other day I'm a baker.</h2>
        <h3>
          Feel free to head over to <Link to="/products">Products</Link> for all my baked goods. Otherwise, stay here and read my story!
        </h3>
      </div>

      <Row>
        <Col md={6} className="about-me-section">
          <h3>About Me</h3>
          <div>
            <Image src="https://i.imgur.com/GFOV2xr.jpg" alt="Headshot" fluid />
          </div>
          <div>
            I grew up around technology thanks to my mom who worked as a database administrator. She built computers for fun and taught me how to troubleshoot my computer issues as well. As a result, computers were second nature to me. I loved tinkering with technology and figuring out how things worked. However, when it came time to choose a college major, I decided to pursue my passion for history. I loved getting my degree and still love history as a hobby, but I knew deep down that I wanted a career that would challenge and excite me.
          </div>
          <div>
            After graduating, I started working as IT support. I enjoyed helping people with their computer issues, but I felt like I could do more. That's when I started to explore the idea of a software development bootcamp. I wanted to learn how to code and build software from scratch. I found a great program that offered an immersive learning experience and decided to take the plunge. The bootcamp was intense, but I loved every minute of it. I learned how to code in multiple languages and frameworks, built real-world projects, and collaborated with other aspiring developers. Today, I'm proud to call myself a software developer, and I look forward to building innovative solutions that make people's lives easier.
          </div>
        </Col>
        <Col md={6} className="tech-specs-section">
          <h3>Tech specs</h3>
          <div>
            This website was built with Flask, SQLAlchemy, Python, React, and Redux. It is a work in progress and updates are being made all the time. If you have any problems, please reach out to me with details.
          </div>
          <div>
            During my time at App Academy, I started with the basics of how to write a function and object-oriented programming. As I progressed, I moved on to learning about data structures and algorithms, which helped me to write more efficient and scalable code. I then delved into the basics of CSS and HTML styling, which allowed me to build more user-friendly interfaces.
          </div>
          <div>
            After that, I learned how to build a backend with SQL, Express, and Sequelize, which gave me a deeper understanding of how the server and client interacted with each other. Next, I learned about React and Redux, which taught me how to build complex web applications with ease. I also picked up Python and became familiar with Flask and SQLAlchemy, which helped me to develop a robust backend.
          </div>
          <div className="projects-sections">
            <h3>My projects & other important links</h3>
            <ul>
              <li>
                <a href="https://github.com/gracecizma/HeirBnB" target="_blank">
                  HeirBnB - my first solo project!
                </a>
              </li>

              <li>
                <a href="https://github.com/gracecizma" target="_blank">
                  Github
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/in/gracescizma/" target="_blank">
                  LinkedIn
                </a>
              </li>

              <li>
                I'm doing all this on my own. If you like the site and want to support my work, consider buying me a
                <a href="https://www.buymeacoffee.com/gracefullybaked" target="_blank">
                  coffee!
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
