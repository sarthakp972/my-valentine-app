import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto' });
  const [hasMoved, setHasMoved] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleYes = () => {
    setIsAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ffffff']
    });
  };

  const moveNoButton = () => {
    const randomTop = Math.floor(Math.random() * 70 + 15) + '%';
    const randomLeft = Math.floor(Math.random() * 70 + 15) + '%';
    setNoButtonPos({ top: randomTop, left: randomLeft });
    setHasMoved(true);
  };

  return (
    // This parent container stays exactly the same for both views
    <div className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center" 
         style={{ 
           backgroundColor: isAccepted ? '#ffdee9' : '#ffeef2', 
           overflow: 'hidden', 
           position: 'relative', 
           width: '100vw',
           transition: 'background-color 0.5s ease'
         }}>
      
      {/* Background Stickers */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        style={{ position: 'absolute', top: '10%', left: '10%', fontSize: '3rem', zIndex: 1 }}>🌸</motion.div>
      
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ position: 'absolute', bottom: '10%', right: '10%', fontSize: '3rem', zIndex: 1 }}>💝</motion.div>

      {/* Main Card Wrapper */}
      <div className="d-flex align-items-center justify-content-center w-100 px-3">
        {isAccepted ? (
          // Success View
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="text-center p-4 p-md-5 bg-white shadow-lg rounded-5"
            style={{ maxWidth: '450px', width: '100%', border: '4px solid #ffc1cf' }}
          >
            <h1 className="display-4 text-danger fw-bold">Success! ❤️</h1>
            <p className="lead fw-bold">I knew you couldn't resist!</p>
            <img 
              src="/sona.gif" 
              alt="celebration" 
              className="img-fluid" 
              style={{ maxWidth: '250px', borderRadius: '15px' }} 
            />
          </motion.div>
        ) : (
          // Question View
          <div className="text-center p-4 p-md-5 shadow-lg rounded-5 bg-white" 
               style={{ maxWidth: '450px', width: '100%', zIndex: 5, border: '4px solid #ffc1cf' }}>
            
            <h2 className="mb-4 fw-bold text-dark display-5">Shruti !! Will you be my Valentine?</h2>
            
            <div className="mb-4">
                <img 
                  src="/before-yes.gif" 
                  alt="valentine request" 
                  className="img-fluid" 
                  style={{ maxHeight: '200px', borderRadius: '15px' }} 
                />
            </div>

            <div className="d-flex justify-content-center align-items-center gap-3 w-100" style={{ minHeight: '80px', position: 'relative' }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-danger btn-lg px-5 shadow-sm fw-bold"
                onClick={handleYes}
                style={{ zIndex: 6 }}
              >
                Yes!
              </motion.button>

              <motion.button
                animate={hasMoved ? { top: noButtonPos.top, left: noButtonPos.left } : {}}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="btn btn-outline-secondary btn-lg px-4 shadow-sm"
                style={{ 
                  position: hasMoved ? 'fixed' : 'static', 
                  zIndex: 10,
                  transition: hasMoved ? 'none' : 'all 0.3s ease' 
                }}
              >
                No 😢
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
