import { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/users/1')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleCreateUser = () => {
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name_user: name, email: 'test@example.com', password_hash: 'hashed', role: 'Student', date_of_birth: '1995-04-01', gender: 'Female' }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        D2G-Artesano
      </Typography>
      <TextField label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <Button variant="contained" onClick={handleCreateUser}>
        Crear Usuario
      </Button>
      {user && <Typography>Usuario: {user.name_user}</Typography>}
    </Container>
  );
}

export default App;