import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, CircularProgress, Alert, Grid, Box, MenuItem, Select, InputLabel, FormControl, Chip, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Mock data (simulando datos que vendrían del backend)
const mockInstructors = [
    { id: 1, name_user: 'Instructor Alpha' },
    { id: 2, name_user: 'Instructor Beta' },
    { id: 3, name_user: 'Profesor Gamma' },
];

const mockCategories = [
    { id: 1, name_category: 'Astrología' },
    { id: 2, name_category: 'Tarot' },
    { id: 3, name_category: 'Numerología' },
    { id: 4, name_category: 'Cristales' },
    { id: 5, name_category: 'Hierbas Medicinales' },
];

// Para el selector múltiple de categorías
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedCategories, theme) {
  return {
    fontWeight:
      selectedCategories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CourseForm = () => {
    const { id } = useParams(); // Para saber si estamos editando (id presente) o creando
    const navigate = useNavigate();
    const theme = useTheme();

    const isEditMode = Boolean(id);
    const [courseData, setCourseData] = useState({
        name_course: '',
        description_course: '',
        price: '',
        duration: '',
        instructor_id: '',
        img_url: '',
        category_ids: [], // Almacenará los IDs de las categorías seleccionadas
    });
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Estados para los selectores
    const [availableInstructors, setAvailableInstructors] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);


    useEffect(() => {
        // Cargar instructores y categorías (simulado)
        setAvailableInstructors(mockInstructors);
        setAvailableCategories(mockCategories);

        if (isEditMode) {
            setLoading(true);
            // TODO: Reemplazar con la llamada real al API backend para obtener datos del curso a editar
            // fetch(`/api/courses/${id}`)
            // .then(res => res.json())
            // .then(data => {
            //     setCourseData({
            //         name_course: data.name_course || '',
            //         description_course: data.description_course || '',
            //         price: data.price || '',
            //         duration: data.duration || '',
            //         instructor_id: data.instructor_id || '',
            //         img_url: data.img_url || '',
            //         category_ids: data.category_ids || [],
            //     });
            //     // Poblar nombres de categorías seleccionadas para el Chip
            //     const selectedNames = (data.category_ids || []).map(catId => {
            //         const foundCat = mockCategories.find(c => c.id === catId);
            //         return foundCat ? foundCat.name_category : '';
            //     }).filter(name => name);
            //     setSelectedCategoryNames(selectedNames);
            //     setLoading(false);
            // })
            // .catch(err => {
            //     setFormError('Error al cargar datos del curso para editar.');
            //     setLoading(false);
            // });

            // Datos de ejemplo para edición
            const mockCourseToEdit = {
                id: 1, name_course: 'Curso de Introducción a la Astrología', description_course: 'Aprende los fundamentos...', price: 49.99, duration: '4 semanas', instructor_id: 1, img_url: 'https://via.placeholder.com/300x200.png?text=Astrologia', category_ids: [1, 3]
            };
            setTimeout(() => { // Simular carga
                if (parseInt(id) === mockCourseToEdit.id) {
                    setCourseData(mockCourseToEdit);
                    const selectedNames = mockCourseToEdit.category_ids.map(catId => {
                         const foundCat = mockCategories.find(c => c.id === catId);
                         return foundCat ? foundCat.name_category : '';
                     }).filter(name => name);
                    setSelectedCategoryNames(selectedNames);
                } else {
                    setFormError('Curso no encontrado para editar.');
                }
                setLoading(false);
            }, 1000);
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (event) => {
        const {
          target: { value },
        } = event;
        // value es un array de nombres de categoría en este punto
        setSelectedCategoryNames(
          typeof value === 'string' ? value.split(',') : value,
        );
        // Convertir nombres de nuevo a IDs para guardar en courseData
        const selectedIds = value.map(name => {
            const foundCat = availableCategories.find(cat => cat.name_category === name);
            return foundCat ? foundCat.id : null;
        }).filter(catId => catId !== null);
        setCourseData(prev => ({ ...prev, category_ids: selectedIds }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormError(null);
        setSuccessMessage(null);

        // Validación simple
        if (!courseData.name_course || !courseData.price || !courseData.instructor_id || courseData.category_ids.length === 0) {
            setFormError('Por favor, completa los campos obligatorios: Nombre, Precio, Instructor y al menos una Categoría.');
            setLoading(false);
            return;
        }

        try {
            // TODO: Implementar la lógica de envío al backend
            // const method = isEditMode ? 'PUT' : 'POST';
            // const endpoint = isEditMode ? `/api/courses/${id}` : '/api/courses';
            // const response = await fetch(endpoint, {
            //     method,
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(courseData),
            // });
            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || (isEditMode ? 'Error al actualizar el curso' : 'Error al crear el curso'));
            // }
            // const result = await response.json();

            await new Promise(resolve => setTimeout(resolve, 1500)); // Simular llamada a API

            setSuccessMessage(`Curso ${isEditMode ? 'actualizado' : 'creado'} con éxito! Redirigiendo...`);
            setTimeout(() => {
                navigate(isEditMode ? `/courses/${id}` : '/courses'); // O a la lista de cursos o al detalle del curso nuevo/editado
            }, 2000);

        } catch (err) {
            setFormError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !courseData.name_course) { // Muestra cargando solo si está cargando datos para editar
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {isEditMode ? 'Editar Curso' : 'Crear Nuevo Curso'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre del Curso"
                                name="name_course"
                                value={courseData.name_course}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descripción del Curso"
                                name="description_course"
                                value={courseData.description_course}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Precio"
                                name="price"
                                type="number"
                                value={courseData.price}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                                InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Duración (ej: 4 semanas, 10 horas)"
                                name="duration"
                                value={courseData.duration}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel id="instructor-select-label">Instructor</InputLabel>
                                <Select
                                    labelId="instructor-select-label"
                                    id="instructor_id"
                                    name="instructor_id"
                                    value={courseData.instructor_id}
                                    label="Instructor"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Selecciona un instructor</em>
                                    </MenuItem>
                                    {availableInstructors.map(instructor => (
                                        <MenuItem key={instructor.id} value={instructor.id}>
                                            {instructor.name_user}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                             <FormControl fullWidth margin="normal" required>
                                <InputLabel id="category-multiple-chip-label">Categorías</InputLabel>
                                <Select
                                labelId="category-multiple-chip-label"
                                id="category_ids"
                                multiple
                                value={selectedCategoryNames} // Usar nombres para el valor del Select
                                onChange={handleCategoryChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Categorías" />}
                                renderValue={(selected) => ( // selected es un array de nombres
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {availableCategories.map((category) => (
                                    <MenuItem
                                    key={category.id}
                                    value={category.name_category} // Usar nombre de categoría como valor
                                    style={getStyles(category.name_category, selectedCategoryNames, theme)}
                                    >
                                    {category.name_category}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="URL de la Imagen del Curso"
                                name="img_url"
                                value={courseData.img_url}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                helperText="URL completa de la imagen (ej: https://ejemplo.com/imagen.jpg)"
                            />
                        </Grid>
                    </Grid>

                    {formError && <Alert severity="error" style={{ marginTop: '1rem' }}>{formError}</Alert>}
                    {successMessage && <Alert severity="success" style={{ marginTop: '1rem' }}>{successMessage}</Alert>}

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button component={Link} to="/courses" variant="outlined" disabled={loading}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Actualizar Curso' : 'Crear Curso')}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default CourseForm;
