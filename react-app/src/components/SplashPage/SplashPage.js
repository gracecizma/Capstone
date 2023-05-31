import React from "react";
import { Link } from "react-router-dom";
import "./splashpage.css"

export default function SplashPage() {



  return (
    <>
      <h1>Welcome to Gracefully Baked!</h1>
      <h2>My name is Grace. By day I'm a software developer, by other day I'm a baker.</h2>
      <h3>Feel free to head over to <Link to="/products">Products
      </Link> for all my baked goods. Otherwise, stay here and read my story!</h3>
      <div>
        <img
          src="https://i.imgur.com/GFOV2xr.jpg" alt="Headshot" style={{ "height": 250, "width": 350 }}
        />
      </div>
      <div>
        <div>
          <h3>About Me</h3>
          <div>
            I grew up around technology thanks to my mom who worked as a database administrator. She built computers for fun and taught me how to troubleshoot my computer issues as well. As a result, computers were second nature to me. I loved tinkering with technology and figuring out how things worked. However, when it came time to choose a college major, I decided to pursue my passion for history. I loved getting my degree and still love history as a hobby, but I knew deep down that I wanted a career that would challenge and excite me.
          </div>
          <div>
            After graduating, I started working as IT support. I enjoyed helping people with their computer issues, but I felt like I could do more. That's when I started to explore the idea of a software development bootcamp. I wanted to learn how to code and build software from scratch. I found a great program that offered an immersive learning experience and decided to take the plunge. The bootcamp was intense, but I loved every minute of it. I learned how to code in multiple languages and frameworks, built real-world projects, and collaborated with other aspiring developers. Today, I'm proud to call myself a software developer, and I look forward to building innovative solutions that make people's lives easier.
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3>Tech specs</h3>
          <div>
            This website was built with Flask, SQLAlchemy, Python, React, and Redux.
          </div>
          <div>
            During my time at App Academy, I started with the basics of how to write a function and object-oriented programming. As I progressed, I moved on to learning about data structures and algorithms, which helped me to write more efficient and scalable code. I then delved into the basics of CSS and HTML styling, which allowed me to build more user-friendly interfaces.
          </div>
          <div>
            After that, I learned how to build a backend with SQL, Express, and Sequelize, which gave me a deeper understanding of how the server and client interacted with each other. Next, I learned about React and Redux, which taught me how to build complex web applications with ease. I also picked up Python and became familiar with Flask and SQLAlchemy, which helped me to develop a robust backend.
          </div>
        </div>
      </div>
      <div>
        <h3>My projects & other important links</h3>
        <div>
          <ul>
            <li>HeirBnB - my first solo project!</li>
            <li>Github</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
    </>
  )

}
