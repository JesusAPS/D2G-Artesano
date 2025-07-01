import React, { useState, useEffect } from 'react'; // Agregado useState y useEffect
import { BrowserRouter as Router, Route, Routes, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box, TextField } from '@mui/material'; // Agregado TextField
import CourseList from './components/course/CourseList';
import CourseDetail from './components/course/CourseDetail';
import CourseForm from './components/course/CourseForm';
// Import other components as needed (e.g., Home, UserProfile, etc.)

function App() {
  // TODO: Add state for user authentication, roles, etc.
  // const [currentUser, setCurrentUser] = useState(null);
  // const isAdminOrInstructor = currentUser && (currentUser.role === 'Admin' || currentUser.role === 'Instructor');

  // === Lógica de usuario de la rama 'main' ===
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/users/1')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user:', error)); // Modificado el mensaje de error
  }, []);

  const handleCreateUser = () => {
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name_user: name, email: 'test@example.com', password_hash: 'hashed', role: 'Student', date_of_birth: '1995-04-01', gender: 'Female' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('User created:', data);
        // Opcional: podrías querer refrescar el usuario o hacer algo más aquí
      })
      .catch((error) => console.error('Error creating user:', error)); // Modificado el mensaje de error
  };
  // ===========================================

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={RouterLink} to="/">D2G-Artesano</Button>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/courses">Cursos</Button>
          {/* TODO: Add more navigation links based on user role and authentication status */}
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '2rem' }}>
        <Routes>
          {/* Home component - puedes integrar la lógica de usuario aquí o en un componente separado */}
          <Route path="/" element={
            <div>
              <Typography variant="h3" gutterBottom>Bienvenido a D2G-Artesano</Typography>
              <Typography variant="body1">
                Explora nuestros cursos y encuentra tu camino espiritual.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" component={RouterLink} to="/courses">
                  Ver Cursos Disponibles
                </Button>

                {/* === UI de usuario de la rama 'main' integrada aquí === */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h5" gutterBottom>
                    Gestión de Usuarios (Desde Main)
                  </Typography>
                  <TextField
                    label="Nombre de Usuario"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" onClick={handleCreateUser}>
                    Crear Usuario de Prueba
                  </Button>
                  {user && <Typography sx={{ mt: 2 }}>Usuario Obtenido (ID 1): {user.name_user}</Typography>}
                </Box>
                {/* ==================================================== */}

              </Box>
            </div>
          } />

          {/* Course Routes */}
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          {/* TODO: Protect these routes based on user role (Admin/Instructor) */}
          <Route path="/courses/new" element={<CourseForm />} />
          <Route path="/courses/:id/edit" element={<CourseForm />} />

          {/* TODO: Add routes for user authentication (login, register), profile, etc. */}
          <Route path="*" element={<Typography variant="h4">404 - Página No Encontrada</Typography>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
