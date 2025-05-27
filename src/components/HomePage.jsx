import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';

export default function HomePage({ onLogout }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('auth'));

  const [posts, setPosts] = useState([
    {
      title: 'Welcome to the Forum',
      body: 'Introduce yourself and meet other members!',
      author: user.username || user.email,
      timestamp: new Date().toLocaleString(),
    },
    {
      title: 'Ideas & Suggestions',
      body: 'Drop your ideas for improving the platform!',
      author: 'Admin',
      timestamp: new Date().toLocaleString(),
    },
  ]);

  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const handleLogout = () => {
    localStorage.removeItem('auth');
    onLogout();
    navigate('/');
  };

  const handlePost = () => {
    if (newPost.title && newPost.body) {
      setPosts([
        {
          ...newPost,
          author: user.username || user.email,
          timestamp: new Date().toLocaleString(),
        },
        ...posts,
      ]);
      setNewPost({ title: '', body: '' });
      setOpen(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center">
          <Avatar src={user.avatar}>{user.username?.[0] || user.email[0]}</Avatar>
          <Typography variant="h6" ml={2}>Welcome, {user.username || user.email}</Typography>
        </Box>
        <Button variant="outlined" onClick={handleLogout}>Log Out</Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* New Post */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5"><ForumIcon sx={{ mr: 1 }} /> Community Forum</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>New Post</Button>
      </Box>

      {/* Posts */}
      {posts.map((post, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardContent>
            <ListItem disableGutters>
              <ListItemAvatar>
                <Avatar>{post.author[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6">{post.title}</Typography>
                }
                secondary={`By ${post.author} • ${post.timestamp}`}
              />
            </ListItem>
            <Typography variant="body1" mt={1}>{post.body}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* Post Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <TextField
            label="Body"
            multiline
            rows={4}
            fullWidth
            margin="dense"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handlePost} variant="contained">Post</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}