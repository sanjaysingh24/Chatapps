import React, { useEffect } from 'react';
import { FaRocket, FaLock, FaComments, FaMobileAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { authuser } from '../../utils/Api/userapi';

const LandingPage = () => {
  const navigate = useNavigate();
  const checkauth = async()=>{
    try{
       let res = await authuser();
       if(res.isSuccess){
        navigate('/dashboard')
        
       }
       if(!res.isSuccess){
        navigate('/')
       }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    checkauth()
  },[])
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center justify-content-center text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Welcome to <span className="text-highlight">ChatX</span></h1>
          <p className="lead mb-4">Secure. Fast. Real-Time Messaging for Everyone.</p>
          <Link to="/login" className="btn btn-warning btn-lg shadow-sm">Start Chatting</Link>
        </div>
      </section>

      {/* Features */}
      <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why ChatX?</h2>
            <p className="text-muted">Built with simplicity and performance in mind.</p>
          </div>
          <div className="row g-4">
            <Feature icon={<FaComments />} title="Real-Time Messaging" text="Instant communication across the globe." />
            <Feature icon={<FaLock />} title="Private & Secure" text="End-to-end encryption keeps you safe." />
            <Feature icon={<FaRocket />} title="Fast & Lightweight" text="Blazing fast experience with zero delay." />
            <Feature icon={<FaMobileAlt />} title="Mobile Optimized" text="Chat smoothly across all devices." />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3 text-white">Start Your Journey with ChatX</h2>
          <p className="text-light mb-4">Sign up now and enjoy a smooth and secure chat experience.</p>
          <Link to="/register" className="btn btn-light btn-lg shadow-sm">Join Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} ChatX — Made with ❤️ by Sanjay</p>
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, text }) => (
  <div className="col-md-3 text-center">
    <div className="feature-box bg-white p-4 rounded shadow-sm h-100">
      <div className="icon mb-3 fs-2 text-primary">{icon}</div>
      <h5 className="fw-semibold mb-2">{title}</h5>
      <p className="text-muted">{text}</p>
    </div>
  </div>
);

export default LandingPage;
