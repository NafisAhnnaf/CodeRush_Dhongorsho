import React, { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import "./login.css";

const punchlines = [
  "Your Style, Your Story",
  "Where Fashion Meets Fun",
  "Shop. Smile. Repeat"
];

const backend =  import.meta.env.VITE_BACKEND;

function LoginPage() {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const canvasRef = useRef(null);
  //nafis
  const [remember, setRemember]= useState(false);
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const navigate = useNavigate();
  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${backend}/login`, { em: email, ps: password });
      alert("Logged in successfully");
      localStorage.setItem("userID", res.data.id);
      onLogin(res.data.id); // <-- call parent callback
      navigate(`/profile/${res.data.id}`);
    }catch(err){
      if(err.response){
        const status = err.response.status;
        if(status===401){
          alert("Invalid Credential. "+ err.response.data.msg);
        }
        else if(status===500){
          alert("Internal Server Error. "+ err.response.data.msg);
        }
        else{
          alert("Something went wrong. "+err.response.data.msg);
        }
      }
      else{
        alert("Unknown error");
      }
    }
  }

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % punchlines.length;
      const fullText = punchlines[i];

      setDisplayedText(
        isDeleting
          ? fullText.substring(0, displayedText.length - 1)
          : fullText.substring(0, displayedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth / 2;
    let height = canvas.height = window.innerHeight;

    const particlesArray = [];
    const maxParticles = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(255,255,255,${Math.random()})`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particlesArray.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    initParticles();
    animate();
  }, []);

  return (
    <div className="login-container">
      <div className="left-panel">
        <canvas ref={canvasRef} className="particles"></canvas>
        <div className="overlay">
          <div className="company-name">Dhongorsho</div>
          <div className="punchline-type">{displayedText}&nbsp;</div>
        </div>
      </div>
      <div className="right-panel">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required onChange={e=>setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required  onChange={e=>setPassword(e.target.value)}/>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button onClick={handleLogin} type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage