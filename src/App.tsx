import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import SecondPage from './SecondPage';

const FirstPage: React.FC = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (location.state?.message) {
            setInfo(location.state.message);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !phone || !email) {
            setError('All fields are required.');
            return;
        }
        setError('');
        const userDetails = { name, phone, email };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        navigate('/second');
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                User Information Form
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {info && <Alert severity="info">{info}</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/second" element={<SecondPage />} />
            </Routes>
        </Router>
    );
};

export default App;
