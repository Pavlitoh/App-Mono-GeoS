import { envs as env } from "../../config/env.plugin";

export function generateEmailTemplate(genre: string, age: number, lat: number, lng: number) {
    const mapboxURL = generateMapboxStaticImageURL(lat, lng);
    
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detalles del Incidente</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                background: linear-gradient(135deg, #e09, #d0e);
                color: #333;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 40px auto;
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                color: #fff;
                padding: 30px;
                text-align: center;
                border-bottom: 5px solid #fff;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                letter-spacing: 1px;
                text-transform: uppercase;
            }
            .content {
                padding: 25px 40px;
                text-align: left;
                line-height: 1.6;
                color: #555;
            }
            .content p {
                margin: 14px 0;
                font-size: 16px;
            }
            .content p strong {
                font-weight: 600;
                color: #333;
            }
            .footer {
                background-color: #f7f7f7;
                color: #999;
                padding: 15px;
                text-align: center;
                font-size: 12px;
                border-top: 1px solid #ddd;
            }
            .map-img {
                width: 100%;
                max-width: 550px;
                height: auto;
                border-radius: 10px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Detalles del Caso</h1>
            </div>
            <div class="content">
                <p><strong>Género del Paciente:</strong> ${genre}</p>
                <p><strong>Edad del Paciente:</strong> ${age} años</p>
                <p><strong>Latitud:</strong> ${lat}</p>
                <p><strong>Longitud:</strong> ${lng}</p>
                <img src="${mapboxURL}" alt="Mapa de ubicación" class="map-img">
            </div>
            <div class="footer">
                <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export function generateMapboxStaticImageURL(lat: number, lng: number) {
    const zoom = 15;
    const width = 600;
    const height = 400;
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${env.MAPBOX_TOKEN}`;
}