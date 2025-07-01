import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import CourseList from './components/course/CourseList';
import CourseDetail from './components/course/CourseDetail';
import CourseForm from './components/course/CourseForm';
// Import other components as needed (e.g., Home, UserProfile, etc.)

function App() {
  // TODO: Add state for user authentication, roles, etc.
  // const [currentUser, setCurrentUser] = useState(null);
  // const isAdminOrInstructor = currentUser && (currentUser.role === 'Admin' || currentUser.role === 'Instructor');

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={RouterLink} to="/">D2G-Artesano</Button>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/courses">Cursos</Button>
          {/* TODO: Add more navigation links based on user role and authentication status */}
          {/* Example:
          {isAdminOrInstructor && (
            <Button color="inherit" component={RouterLink} to="/courses/new">Crear Curso</Button>
          )}
          {currentUser ? (
            <>
              <Button color="inherit" component={RouterLink} to="/profile">Mi Perfil</Button>
              <Button color="inherit" onClick={() => setCurrentUser(null) Handle logout}>Salir</Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">Ingresar</Button>
          )}
          */}
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '2rem' }}>
        <Routes>
          {/* TODO: Replace with a proper Home component */}
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
          {/* <Route path="/login" element={<LoginPage onLogin={setCurrentUser} />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          {/* <Route path="/profile" element={<UserProfile user={currentUser} />} /> */}

          {/* TODO: Add a 404 Not Found component/route */}
          <Route path="*" element={<Typography variant="h4">404 - Página No Encontrada</Typography>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
