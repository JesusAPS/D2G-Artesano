import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CircularProgress, Alert } from '@mui/material';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simular la carga de datos
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);
            try {
                // TODO: Reemplazar con la llamada real al API backend
                // const response = await fetch('/api/courses');
                // if (!response.ok) {
                //     throw new Error('Error al cargar los cursos');
                // }
                // const data = await response.json();
                // setCourses(data);

                // Datos de ejemplo mientras se desarrolla el backend
                const mockCourses = [
                    { id: 1, name_course: 'Curso de Introducción a la Astrología', description_course: 'Aprende los fundamentos de la astrología.', price: 49.99, instructor_id: 1 },
                    { id: 2, name_course: 'Taller de Tarot Avanzado', description_course: 'Profundiza en tus conocimientos de tarot.', price: 79.99, instructor_id: 2 },
                    { id: 3, name_course: 'Curso de Numerología Esencial', description_course: 'Descubre el poder de los números.', price: 59.99, instructor_id: 1 },
                ];
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simular retraso de red
                setCourses(mockCourses);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container style={{ marginTop: '2rem' }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Nuestros Cursos
            </Typography>
            <Grid container spacing={4}>
                {courses.length === 0 && !loading ? (
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">No hay cursos disponibles en este momento.</Typography>
                    </Grid>
                ) : (
                    courses.map((course) => (
                        <Grid item key={course.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {course.name_course}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Precio: ${course.price}
                                    </Typography>
                                    <Typography variant="body2">
                                        {course.description_course}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button component={Link} to={`/courses/${course.id}`} size="small">Ver Detalles</Button>
                                    {/* TODO: Agregar botón para inscribirse o editar si es admin/instructor */}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
            {/* TODO: Agregar botón para crear nuevo curso si es admin/instructor */}
            {/* <Button component={Link} to="/courses/new" variant="contained" color="primary" style={{ marginTop: '2rem' }}>
                Crear Nuevo Curso
            </Button> */}
        </Container>
    );
};

export default CourseList;
