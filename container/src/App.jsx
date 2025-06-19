import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Login = lazy(() => import('remoteApp/Login'));
const Signup = lazy(() => import('remoteApp/Signup'));

function App() {
  return (
    <Router >
      <div style={{ height: '100vh', width: '100vw' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
