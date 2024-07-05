import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Post } from './types';
import DepartmentList from './DepartmentList';

const SecondPage: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (!userDetails) {
            navigate('/', { replace: true, state: { message: 'You must enter your details before accessing this page.' } });
        }

        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Post[] = await response.json();
                setPosts(data);
            } catch (error) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [navigate]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'userId', headerName: 'User ID', width: 130 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'body', headerName: 'Body', width: 600 },
    ];

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Posts
            </Typography>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid rows={posts} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50]} />
            </div>
            <Typography variant="h4" component="h1" gutterBottom style={{ marginTop: '20px' }}>
                Departments
            </Typography>
            <DepartmentList />
        </Container>
    );
};

export default SecondPage;
