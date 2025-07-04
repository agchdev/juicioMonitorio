import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory path where this file is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root directory
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// Debug: log loaded environment variables
console.log('Loading .env from:', path.join(__dirname, '..', '..', '.env'));
console.log('Environment variables:', {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURE: process.env.SMTP_SECURE,
  SMTP_USER: process.env.SMTP_USER ? '***' : 'undefined',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ? '***' : 'undefined'
});

const app = express();

// Usa memoria, NO disco (NO crea carpeta uploads)
const upload = multer({ storage: multer.memoryStorage() });

// --- CORS ---
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true
}));

app.post('/api/enviar-documentos', upload.fields([
  { name: 'facturas', maxCount: 10 }
]), async (req, res) => {
  try {
    const jsonData = req.body.data ? JSON.parse(req.body.data) : {};
    const facturas = req.files['facturas'] || [];

    // Los adjuntos ahora salen de la RAM, no del disco
    const attachments = facturas.map(f => ({
      filename: f.originalname,
      content: f.buffer // OJO aquí: es el buffer en RAM
    }));

    // SMTP settings usando variables de entorno
    const smtpSettings = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'alejandroo.agch@gmail.com',
        pass: process.env.SMTP_PASS || 'wykf qloj xsub ddya'
      }
    };

    console.log('Using SMTP Settings:', {
      host: smtpSettings.host,
      port: smtpSettings.port,
      secure: smtpSettings.secure,
      user: smtpSettings.auth.user
    });

    let transporter = nodemailer.createTransport(smtpSettings);

    // Email 1: Para el administrador (tú) con todos los documentos
    await transporter.sendMail({
      from: `"Juicio Monitorio" <${smtpSettings.auth.user}>`,
      to: process.env.ADMIN_EMAIL || 'alejandroo.agch@gmail.com',
      subject: ' Nueva Petición Monitoria - Documentos Recibidos',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;"> Nueva Petición Monitoria</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;"> Datos Personales</h3>
            <p><strong>Nombre:</strong> ${jsonData.personalData?.nombre || 'N/A'} ${jsonData.personalData?.apellidos || ''}</p>
            <p><strong>Email:</strong> ${jsonData.personalData?.email || 'N/A'}</p>
            <p><strong>Teléfono:</strong> ${jsonData.personalData?.telefono || 'N/A'}</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;"> Datos del Caso</h3>
            <p><strong>Importe Total:</strong> ${jsonData.formData?.importeTotal || 'N/A'}€</p>
            <p><strong>Fecha Factura:</strong> ${jsonData.formData?.fechaFactura || 'N/A'}</p>
            <p><strong>Descripción:</strong> ${jsonData.formData?.descripcionDeuda || 'N/A'}</p>
            
            <h4 style="color: #374151;"> Datos del Deudor</h4>
            <p><strong>Nombre:</strong> ${jsonData.formData?.datosDeudor?.nombre || 'N/A'} ${jsonData.formData?.datosDeudor?.apellidos || ''}</p>
            <p><strong>Dirección:</strong> ${jsonData.formData?.datosDeudor?.direccion || 'N/A'}</p>
            <p><strong>Ciudad:</strong> ${jsonData.formData?.datosDeudor?.ciudad || 'N/A'}, ${jsonData.formData?.datosDeudor?.codigoPostal || 'N/A'}</p>
            <p><strong>Provincia:</strong> ${jsonData.formData?.datosDeudor?.provincia || 'N/A'}</p>
          </div>
          
          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; color: #1e40af;"><strong> Documentos adjuntos:</strong> ${facturas.length} archivos</p>
          </div>
        </div>
      `,
      attachments
    });

    // Email 2: Confirmación para el cliente
    const clientEmail = jsonData.personalData?.email;
    if (clientEmail) {
      await transporter.sendMail({
        from: `"Juicio Monitorio" <${smtpSettings.auth.user}>`,
        to: clientEmail,
        subject: ' Confirmación - Su petición monitoria ha sido recibida',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px; background-color: #1e40af; color: white; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;"> Petición Recibida</h1>
            </div>
            
            <div style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; color: #374151;">Estimado/a <strong>${jsonData.personalData?.nombre || 'Cliente'}</strong>,</p>
              
              <p style="color: #374151;">Hemos recibido correctamente su petición para iniciar un proceso monitorio.</p>
              
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af;">
                <h3 style="color: #1e40af; margin-top: 0;"> Resumen de su petición:</h3>
                <p><strong>Importe reclamado:</strong> ${jsonData.formData?.importeTotal || 'N/A'}€</p>
                <p><strong>Deudor:</strong> ${jsonData.formData?.datosDeudor?.nombre || 'N/A'} ${jsonData.formData?.datosDeudor?.apellidos || ''}</p>
                <p><strong>Documentos adjuntos:</strong> ${facturas.length} archivos</p>
              </div>
              
              <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e;"><strong> Próximos pasos:</strong><br>
                Revisaremos su documentación y nos pondremos en contacto con usted en un plazo máximo de 48 horas para confirmar todos los detalles y proceder con la tramitación.</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #6b7280; font-size: 14px;">Si tiene alguna duda, puede contactarnos respondiendo a este correo.</p>
              </div>
              
              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; margin-top: 30px;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">Juicio Monitorio - Asesoría Legal</p>
              </div>
            </div>
          </div>
        `
      });
      
      console.log(` Emails enviados - Admin: ${process.env.ADMIN_EMAIL}, Cliente: ${clientEmail}`);
    } else {
      console.log(' No se pudo enviar confirmación al cliente: email no proporcionado');
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(3001, () => console.log('Servidor escuchando en puerto 3001'));
