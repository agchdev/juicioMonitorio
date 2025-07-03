// server/index.js
const express = require('express');
const multer  = require('multer');
const nodemailer = require('nodemailer');
const app = express();
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal para archivos

app.post('/api/enviar-documentos', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'facturas', maxCount: 10 }
]), async (req, res) => {
  try {
    const pdfFile = req.files['pdf'][0];
    const facturas = req.files['facturas'] || [];

    // Enviar por correo (con nodemailer)
    // Construye attachments:
    const attachments = [
      {
        filename: pdfFile.originalname,
        path: pdfFile.path
      },
      ...facturas.map(f => ({
        filename: f.originalname,
        path: f.path
      }))
    ];

    // Configura tu transporter (ejemplo Gmail, cambiar a tu servidor real)
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'tu.email@gmail.com',
        pass: 'tu_contraseña'
      }
    });

    await transporter.sendMail({
      from: '"Web Monitorio" <tu.email@gmail.com>',
      to: 'destino@correo.com', // Cambia aquí a quien recibe
      subject: 'Documentos para petición monitorio',
      text: 'Adjuntamos PDF y facturas',
      attachments
    });

    // Limpia archivos si quieres (opcional)
    // fs.unlinkSync(pdfFile.path);
    // facturas.forEach(f => fs.unlinkSync(f.path));

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(3001, () => console.log('Servidor escuchando en puerto 3001'));
