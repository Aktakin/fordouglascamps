import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PlayfulProgramming() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to programming adventure
    navigate('/activities/programming-adventure', { replace: true });
  }, [navigate]);

  return null;
}

export default PlayfulProgramming;

