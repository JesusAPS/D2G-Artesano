//Codigo para Controlador de Usuario

const pool= require('../config/db');
const getZodiacSignId = require('../utils/zodiacUtils');

// Funcion para testear la conexion a la base de datos
async function testConnection(req, res) {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        res.json({ message: 'Conexión exitosa a la base de datos', solution: rows[0].solution });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        res.status(500).json({ message: 'Error Interno', error: error.message });
    }
}

//Funcion para registrar un nuevo usuario
async function registerUser(req, res) {
    // Extraer los datos del cuerpo de la solicitud
    const { name, email, password,role , dateOfBirth, gender } = req.body;
    // variable para almacenar el ID del signo zodiacal
    let zodiacSignId = null;
    // Validar que todos los campos requeridos estén presentes
    if (!name || !email || !password || !dateOfBirth || !gender) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    // Validar el formato de la fecha de nacimiento
    try {
        if (date_of_birth) {
            // Obtener el ID del signo zodiacal basado en la fecha de nacimiento
            const zodiacSign = getZodiacSignId(dateOfBirth);
            const [rows] = await pool.query('SELECT id FROM zodiac_signs WHERE name = ?', [zodiacSign]);
            zodiacSignId = rows.length > 0 ? rows[0].id : null;// Si no se encuentra el signo zodiacal, se asigna null
            if (!zodiacSignId) {
                return res.status(400).json({ error: 'Fecha de nacimiento inválida' });
            }
        }

        // Insertar el nuevo usuario en la base de datos
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role, date_of_birth, zodiac_sign,gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, password, role, date_of_birth, zodiacSign_id,gender]
        );

    } catch (error) {
        console.error('Error al Crear el usuario:', error);
        res.status(500).json({ message: 'Error Interno', error: error.message });
    }
}

// Funcion para obtener un Usuario por su ID
async function getUser(req, res) {
    const userId = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error Interno', error: error.message });
    }
}

// Funcion para Actualizar los usuario por su ID
async function updateUser(req, res) {
    const {name, email, password, role, dateOfBirth,gender } = req.body;
    let zodiacSignId = null;

    try {
        if (dateOfBirth) {
            const zodiacSign = getZodiacSignId(date_of_birth);
            const [rows] = await pool.query('SELECT id FROM zodiac_signs WHERE name = ?', [zodiacSign]);
            zodiacSignId = rows.length > 0 ? rows[0].id : null; // Si no se encuentra el signo zodiacal, se asigna null
        }

        const [result] = await pool.query('UPDATE users SET name = ?, email = ?, password = ?, role = ?, date_of_birth = ?, zodiac_sign_id = ?, gender = ? WHERE id = ?',
            [name, email, password, role, dateOfBirth, zodiacSign,gender, req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
            res.json({ message: 'Usuario actualizado correctamente' }); 
        }
    }catch (error) {
        res.status(500).json({ message: 'Error Interno', error: error.message });
    }
}

//Funcion para eliminar un usuario por su ID
async function deleteUser(req, res) {
    try {
        const [result] = await pool.query('UPDATE users SET deleted_at = NOW() WERE id = ? AND deleted_at IS NULL', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado o ya eliminado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error Interno', error: error.message });
    }
}

// Exportar las funciones del controlador
module.exports = {
    testConnection,
    registerUser,
    getUser,
    updateUser,
    deleteUser
};

