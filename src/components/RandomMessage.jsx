import React, { useState, useEffect } from 'react';

const messages = [
  "Welcome back, friend!",
  "You’re just one click away from access.",
  "Secure and simple—just how you like it.",
  "Tip: Use a strong password.",
  "Privacy matters. We don’t track.",
  "Accounts are free—always will be.",
  "Need help? We’re one click away.",
  "Authentication made friendly.",
];

export default function RandomMessage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, []);

  return <p style={{textAlign: "center"}}>{messages[index]}</p>;
}