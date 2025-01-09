import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Account from './pages/Account';
import Reviews from './pages/Reviews';
import Settings from './pages/Settings';
import LoginForm from './components/LoginForm';
import ReviewForm from './components/ReviewForm';
import ActivityCard from './components/ActivityCard';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/account" element={<Account />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/reviewform" element={<ReviewForm />} />
        <Route path="/ActivityCard" element={<ActivityCard />} />
        <Route path="/registerform" element={<RegisterForm />} />
      </Routes>
      <Footer /> {/*2025 - review kegiatan kampus uadeh*/}
    </Router>
  );
}

export default App;
