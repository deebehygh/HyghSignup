import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (mode === 'signup') {
      const exists = users.find((u) => u.email === email);
      if (exists) {
        setMessage('User already exists.');
        return;
      }
      const newUser = { email, password, username, avatar };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('Sign-up successful!');
      setMode('signin');
      return;
    }

    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('auth', JSON.stringify(found));
      onAuth(found);
      navigate('/home');
    } else {
      setMessage('Invalid credentials.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5">{mode === 'signup' ? 'Sign Up' : 'Sign In'}</Typography>

        {mode === 'signup' && (
          <>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Avatar URL"
              fullWidth
              margin="normal"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://i.pravatar.cc/150?u=you"
            />
          </>
        )}

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {mode === 'signup' ? 'Sign Up' : 'Sign In'}
        </Button>
        <Button onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setMessage(''); }} fullWidth sx={{ mt: 1 }}>
          Switch to {mode === 'signup' ? 'Sign In' : 'Sign Up'}
        </Button>

        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
      </form>
    </Container>
  );
}