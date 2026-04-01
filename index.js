const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    user: 'userapi',
    password: 'Api12345',
    server: 'proyecto_api.mssql.somee.com',
    database: 'proyecto_api',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

app.get('/pacientes', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM pacientes');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.post('/pacientes', async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono } = req.body;

        await sql.connect(config);

        await sql.query(`
            INSERT INTO pacientes (nombre, apellido, correo, telefono)
            VALUES ('${nombre}', '${apellido}', '${correo}', '${telefono}')
        `);

        res.send('Paciente agregado');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});