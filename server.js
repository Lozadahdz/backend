const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbMongo');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const subTaskRouter = require('./routes/subTaskRoutes');

dotenv.config(); // Cargar variables de entorno

const app = express(); // Definir la constante 'app' como instancia de Express

connectDB(); // Conectar a MongoDB

app.use(express.json());
app.use(cors());


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRouter);
app.use('/api/subtasks', subTaskRouter);

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
