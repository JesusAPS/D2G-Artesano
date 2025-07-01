import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Paper, Button, CircularProgress, Alert, Grid, Box, Chip } from '@mui/material';

// Datos de ejemplo para instructores y categorías (simulando llamadas a API)
const mockInstructors = {
    1: { name_user: 'Instructor Alpha' },
    2: { name_user: 'Instructor Beta' },
};

const mockCategories = {
    1: { name_category: 'Astrología' },
    2: { name_category: 'Tarot' },
    3: { name_category: 'Numerología' },
};

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [instructor, setInstructor] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // TODO: Reemplazar con la llamada real al API backend para obtener detalles del curso
                // const response = await fetch(`/api/courses/${id}`);
                // if (!response.ok) {
                //     throw new Error('Error al cargar el curso');
                // }
                // const data = await response.json();
                // setCourse(data);

                // Datos de ejemplo mientras se desarrolla el backend
                const mockCoursesData = {
                    1: { id: 1, name_course: 'Curso de Introducción a la Astrología', description_course: 'Aprende los fundamentos de la astrología y cómo interpretar cartas natales. Este curso cubre los planetas, signos, casas y aspectos principales.', price: 49.99, duration: '4 semanas', instructor_id: 1, img_url: 'https://via.placeholder.com/600x400.png?text=Astrologia', category_ids: [1] },
                    2: { id: 2, name_course: 'Taller de Tarot Avanzado', description_course: 'Profundiza en tus conocimientos de tarot, explorando tiradas complejas y el simbolismo de los arcanos mayores y menores.', price: 79.99, duration: '6 semanas', instructor_id: 2, img_url: 'https://via.placeholder.com/600x400.png?text=Tarot', category_ids: [2] },
                    3: { id: 3, name_course: 'Curso de Numerología Esencial', description_course: 'Descubre el poder de los números y cómo influyen en tu vida. Aprende a calcular tu número de vida y destino.', price: 59.99, duration: '3 semanas', instructor_id: 1, img_url: 'https://via.placeholder.com/600x400.png?text=Numerologia', category_ids: [3] },
                };

                await new Promise(resolve => setTimeout(resolve, 1000)); // Simular retraso de red
                const foundCourse = mockCoursesData[id];

                if (foundCourse) {
                    setCourse(foundCourse);
                    // Simular carga de datos relacionados (instructor, categorías)
                    setInstructor(mockInstructors[foundCourse.instructor_id] || { name_user: 'Desconocido' });
                    setCategories(foundCourse.category_ids.map(catId => mockCategories[catId] || { name_category: 'Desconocida' }));
                } else {
                    throw new Error('Curso no encontrado');
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

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
                <Button component={Link} to="/courses" variant="outlined" style={{ marginTop: '1rem' }}>
                    Volver a la lista de cursos
                </Button>
            </Container>
        );
    }

    if (!course) {
        return (
            <Container style={{ marginTop: '2rem' }}>
                <Alert severity="warning">Curso no disponible.</Alert>
                 <Button component={Link} to="/courses" variant="outlined" style={{ marginTop: '1rem' }}>
                    Volver a la lista de cursos
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    {course.name_course}
                </Typography>

                {course.img_url && (
                    <Box sx={{ my: 2, textAlign: 'center' }}>
                        <img src={course.img_url} alt={course.name_course} style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px', borderRadius: '8px' }} />
                    </Box>
                )}

                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Precio: ${course.price} | Duración: {course.duration}
                </Typography>

                {instructor && (
                    <Typography variant="subtitle1" gutterBottom>
                        Instructor: {instructor.name_user}
                    </Typography>
                )}

                {categories.length > 0 && (
                    <Box sx={{ my: 2 }}>
                        <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold' }}>Categorías: </Typography>
                        {categories.map(cat => (
                            <Chip label={cat.name_category} key={cat.name_category} sx={{ mr: 1, mb: 1 }} />
                        ))}
                    </Box>
                )}

                <Typography variant="body1" paragraph style={{ marginTop: '1rem' }}>
                    {course.description_course}
                </Typography>

                {/* TODO: Aquí se podrían listar módulos y lecciones del curso */}

                <Grid container spacing={2} style={{ marginTop: '2rem' }}>
                    <Grid item>
                        <Button component={Link} to="/courses" variant="outlined">
                            Volver a la lista de cursos
                        </Button>
                    </Grid>
                    <Grid item>
                        {/* TODO: Lógica para inscripción / edición */}
                        {/* Ejemplo: <Button variant="contained" color="primary">Inscribirse</Button> */}
                        {/* Ejemplo Admin: <Button component={Link} to={`/courses/${course.id}/edit`} variant="contained" color="secondary">Editar Curso</Button> */}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CourseDetail;
