import React, { useEffect, useRef, useState } from "react";
import "./signup.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const punchlines = [
  "Join Us, Join the Future",
  "Your Journey Begins Here",
  "Be a Part of Dhongorsho"
];

const UniDomains = [
  'du.ac.bd', 'ru.ac.bd', 'cu.ac.bd', 'ju.edu.bd', 'iut-dhaka.edu',
  'buet.ac.bd', 'ku.ac.bd', 'kuet.ac.bd', 'ruet.ac.bd', 'cuet.ac.bd',
  'sust.edu', 'just.edu.bd', 'hstu.ac.bd', 'mbstu.ac.bd', 'pust.ac.bd',
  'brur.ac.bd', 'nsu.edu.bd', 'bracu.ac.bd', 'iub.edu.bd', 'aiub.edu',
  'eastwest.edu', 'uiu.ac.bd', 'ulab.edu.bd', 'daffodilvarsity.edu.bd',
  'green.edu.bd', 'diu.edu.bd', 'ewubd.edu', 'seu.edu.bd', 'presidency.edu.bd',
  'uap-bd.edu', 'manarat.ac.bd', 'bup.edu.bd', 'sub.edu.bd', 'nstu.edu.bd',
  'pu.ac.bd', 'uits.edu.bd'
];

const backend = import.meta.env.VITE_BACKEND;

export default function SignupPage() {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const totalSteps = 3;
  const [visibility, setVisibility] = useState(Array(totalSteps).fill('hidden'));
  const [count, setCount] = useState(0);
  const [nextBtn, setNextBtn] = useState('');
  const [backBtn, setBackBtn] = useState('hidden');
  const [submitBtn, setSubmitBtn] = useState('hidden');

  const handleNext = () => {
    if (count < totalSteps - 1) setCount(prev => prev + 1);
  };

  const handleBack = () => {
    if (count > 0) setCount(prev => prev - 1);
  };

  useEffect(() => {
    const updatedVisibility = Array(totalSteps).fill('hidden');
    updatedVisibility[count] = 'flex';
    setVisibility(updatedVisibility);
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

  const [role, setRole] = useState('student');
  const [form, setForm] = useState({
    nm: "", em: "", ps: "", confirm: "", ph: "", db: "",
    un: "", dp: "", pr: "", yr: "", profile: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile") {
      setForm({ ...form, profile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = form.em;
    const domain = email.split('@')[1];
    if (domain && !UniDomains.includes(domain)) {
      alert("Please use your university-issued email address.");
    }
    if (form.ps !== form.confirm) {
      return alert("Passwords do not match.");
    }

    const formData = new FormData();
    for (const key in form) {
      if (key !== "confirm") formData.append(key, form[key]);
    }
    formData.append("role", role);

    try {
      const res = await axios.post(`${backend}/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Signup successful!");
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Signup failed!");
    }
  };

  return (
    <div className="signup-container">
      <canvas ref={canvasRef} className="background-canvas"></canvas>

      <div className="left-panel flex flex-col justify-center items-center">
        <form className="signup-form bg-amber-50 rounded-4xl"
              onSubmit={handleSubmit} encType="multipart/form-data">
          <h2>Signup</h2>

          <div className={`flex-col text-2xl h-[400px] ${visibility[0]}`}>
            <label>Name</label>
            <input name="nm" type="text" required onChange={handleChange} />

            <label>Email</label>
            <input name="em" type="email" required onChange={handleChange}  />

            <label>Password</label>
            <input name="ps" type="password" required onChange={handleChange} />

            <label>Confirm Password</label>
            <input name="confirm" type="password" required onChange={handleChange} />
          </div>

          <div className={`flex-col text-2xl h-[400px] ${visibility[1]}`}>
            <label>Phone</label>
            <input name="ph" type="tel" required onChange={handleChange} />

            <label>Date of Birth</label>
            <input name="db" type="date" required onChange={handleChange} />

            <label>Upload Profile Picture</label>
            <input type="file" name="profile" accept="image/*" onChange={handleChange} />
          </div>

          <div className={`flex-col text-2xl h-[400px] ${visibility[2]}`}>
            <label>University</label>
            <input name="un" type="text" required onChange={handleChange} />

            <label>Department</label>
            <input name="dp" type="text" required onChange={handleChange} />

            <label>Program</label>
            <input name="pr" type="text" required onChange={handleChange} />

            <label>Year</label>
            <input name="yr" type="number" required onChange={handleChange} />
          </div>

          <div className="flex justify-between mt-4">
            <button className={backBtn} type="button" onClick={handleBack}>Back</button>
            <button className={nextBtn} type="button" onClick={handleNext}>Next</button>
            <button className={submitBtn} type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}