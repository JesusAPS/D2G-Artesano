-- Crear tipos ENUM primero
CREATE TYPE user_role AS ENUM ('Student', 'Instructor', 'Admin');
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other', 'Prefer not to say');
CREATE TYPE schedule_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

-- Tabla de Signos Zodiacales
CREATE TABLE zodiac_signs (
    id SERIAL PRIMARY KEY,
    name_zodiac VARCHAR(50) NOT NULL UNIQUE,
    img_url VARCHAR(255),
    description_zodiac TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name_user VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    roles user_role NOT NULL DEFAULT 'Student',
    date_of_birth DATE NOT NULL,
    zodiac_sign_id INT,
    gender gender_type,
    img_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (zodiac_sign_id) REFERENCES zodiac_signs(id)
);

-- Tabla de Categorias
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name_category VARCHAR(100) NOT NULL UNIQUE,
    description_category TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Cursos
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name_course VARCHAR(255) NOT NULL,
    description_course TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    duration INT,
    instructor_id INT NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);

-- Tabla de cursos a Calendarios
CREATE TABLE course_schedule (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    location VARCHAR(255),
    status schedule_status DEFAULT 'scheduled',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Tabla de Modulos
CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description_module TEXT,
    orden INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Tabla de Leccion
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    module_id INT NOT NULL,
    title VARCHAR(255),
    content TEXT,
    type VARCHAR(50),
    orden INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES modules(id)
);

-- Tabla de Curso-Categoria
CREATE TABLE curso_categories (
    course_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY(course_id, category_id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla de Inscripciones
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notification_sent BOOLEAN DEFAULT FALSE,
    last_notification TIMESTAMP,
    UNIQUE (user_id, course_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(course_id) REFERENCES courses(id)
);

-- Tabla de Progreso de Usuario
CREATE TABLE user_lesson_progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    status progress_status NOT NULL DEFAULT 'not_started',
    completed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(lesson_id) REFERENCES lessons(id)
);

-- Tabla Usuario-Curso-Progreso
CREATE TABLE user_course_progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    completion_percentage DECIMAL(5,2) NOT NULL DEFAULT 00.0,
    last_accessed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(course_id) REFERENCES courses(id)
);

-- Tabla de Productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name_product VARCHAR(255) NOT NULL,
    description_product TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    img_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Tabla Productos-Categorias
CREATE TABLE product_categories (
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

-- Tabla Ordenes
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 00.0,
    status order_status NOT NULL DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    billing_address TEXT NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 00.0,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 00.0,
    payment_method VARCHAR(50) NOT NULL,
    payment_status payment_status NOT NULL DEFAULT 'pending',
    transaction_id VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla Items-Orden
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabla Vista de Cursos
CREATE TABLE course_reviews (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- tabla Vista de Productos
CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Crear función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers para las tablas que necesitan actualización automática de updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_schedule_updated_at
BEFORE UPDATE ON course_schedule
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at
BEFORE UPDATE ON modules
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
BEFORE UPDATE ON lessons
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at
BEFORE UPDATE ON enrollments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_lesson_progress_updated_at
BEFORE UPDATE ON user_lesson_progress
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_course_progress_updated_at
BEFORE UPDATE ON user_course_progress
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at
BEFORE UPDATE ON order_items
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_reviews_updated_at
BEFORE UPDATE ON course_reviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at
BEFORE UPDATE ON product_reviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
