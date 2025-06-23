import React from 'react';
import { FaRocket, FaLock, FaComments, FaMobileAlt } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div>

      {/* Hero Section */}
      <section className="hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="container animate__animated animate__fadeInDown">
          <h1 className="display-3 fw-bold text-glow">Welcome to <span className="highlight">ChatX</span></h1>
          <p className="lead mt-3 text-light">Fast. Secure. Real-Time Conversations.</p>
          <a href="/login" className="btn btn-warning btn-lg mt-4 shadow-sm hover-grow">Start Chatting</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary">Why Choose ChatX?</h2>
            <p className="text-muted">Features built for your modern chat needs.</p>
          </div>
          <div className="row g-4">
            <Feature icon={<FaComments />} title="Real-Time Messaging" text="Communicate instantly with lightning speed." delay="1s" />
            <Feature icon={<FaLock />} title="Secure & Private" text="End-to-end encrypted conversations." delay="2s" />
            <Feature icon={<FaRocket />} title="Blazing Fast" text="Optimized for speed & scale." delay="3s" />
            <Feature icon={<FaMobileAlt />} title="Responsive UI" text="Seamless across devices." delay="4s" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center py-5">
        <div className="container animate__animated animate__pulse">
          <h2 className="fw-bold text-white mb-3">Ready to start your journey?</h2>
          <p className="text-light mb-4">Private, secure, and intuitive – All yours for free.</p>
          <a href="/signup" className="btn btn-light btn-lg hover-grow shadow">Get Started</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} ChatX. Built with ❤️ by Sanjay.</p>
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, text, delay }) => (
  <div className={`col-md-3 text-center animate__animated animate__fadeInUp`} style={{ animationDelay: delay }}>
    <div className="feature-card p-4 bg-white rounded shadow-sm h-100">
      <div className="icon-circle mb-3">{icon}</div>
      <h5 className="fw-bold">{title}</h5>
      <p className="text-muted">{text}</p>
    </div>
  </div>
);

export default LandingPage;
