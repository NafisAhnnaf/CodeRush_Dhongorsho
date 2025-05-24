import React, { useEffect, useRef, useState } from "react";
import "./signup.css";

const punchlines = [
  "Join Us, Join the Future",
  "Your Journey Begins Here",
  "Be a Part of Dhongorsho"
];

export default function SignupPage() {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const canvasRef = useRef(null);

  const totalSteps = 3; // e.g. 4 steps
  const [visibility, setVisibility] = useState(Array(totalSteps).fill('hidden'));
  const [count, setCount] = useState(0);
  const [nextBtn, setNextBtn] = useState('');
  const [backBtn, setBackBtn] = useState('hidden');
  const [submitBtn, setSubmitBtn] = useState('hidden');

  const handleNext = () => {
    if (count < totalSteps - 1) {
      setCount(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  useEffect(() => {
    // Set visibility for current step only
    const updatedVisibility = Array(totalSteps).fill('hidden');
    updatedVisibility[count] = 'flex';
    setVisibility(updatedVisibility);

    // Handle button visibility
    setBackBtn(count === 0 ? 'hidden' : '');
    setNextBtn(count >= totalSteps - 1 ? 'hidden' : '');
    setSubmitBtn(count === totalSteps - 1 ? '' : 'hidden');
  }, [count]);



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

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send this data to your backend API here
    const formData = new FormData(e.target);

    const userData = Object.fromEntries(formData.entries());
    console.log("Submitted Signup Data:", userData);

    // Placeholder: Implement your backend call (e.g., Axios or fetch)
  };

  return (
    <div className="signup-container ">
      <div className="left-panel flex flex-col justify-center items-center">
        <form className="signup-form bg-amber-50 rounded-4xl" onSubmit={handleSubmit}>
          <h2>Signup</h2>

          <div className={`flex-col text-2xl h-[400px] ${visibility[0]}`}> 
            <label>Name</label>
            <input name="name" type="text" required />

            <label>Email</label>
            <input name="email" type="email" required />

            <label>Password</label>
            <input name="password" type="password" required />

            <label>Password</label>
            <input name="confirm-password" type="password" required />
          </div>


          <div className={`flex-col text-2xl h-[400px] ${visibility[1]}`}>
            <label>Phone</label>
            <input name="phone" type="tel" required />

            <label>Date of Birth</label>
            <input name="dob" type="date" required />
          </div>


          <div className={`flex-col ${visibility[2]}`}>
            <label>University</label>
            <input name="university" type="text" required />

            <label>Department</label>
            <input name="department" type="text" required />

            <label>Program</label>
            <input name="program" type="text" required />

            <label>Year</label>
            <input name="year" type="number" required />
          </div>
          <div>

          </div>
          <div className="flex justify-between">
            <button className={backBtn} type="button" onClick={handleBack}>Back</button>
            <button className={nextBtn} type="button" onClick={handleNext}>Next</button>
            <button className ={submitBtn} type="submit">Sign Up</button>
          </div>
        </form>
      </div>

      <div className="right-panel">
        <canvas ref={canvasRef} className="particles"></canvas>
        <div className="overlay">
          <div className="company-name">Dhongorsho</div>
          <div className="punchline-type">{displayedText}&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
