const express = require("express");
const fs = require("fs");
const path = require("path");
const ProcesarPedido = require("./controllers/ProcesarPedido"); // asegúrate de que el archivo esté en la ruta correcta

// instancia de la aplicación express
const app = express();
// puerto
const port = 3000;

// usa el middleware de express para interpretar las solicitudes JSON
app.use(express.json());

// Ruta POST para recibir y procesar pedidos
app.post("/pedido", (req, res) => {
  const pedido = req.body;
  const procesador = new ProcesarPedido(pedido);
  procesador.iniciar();
  procesador.on("procesar", () => procesador.procesar());
  procesador.on("enviar", () => procesador.enviar());
  procesador.onCompletar(() => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedido completado</title>
</head>
<body>
    <h1>Resumen del pedido</h1>
    <pre>${JSON.stringify(pedido, null, 2)}</pre>
</body>
</html>`;

    fs.writeFile(path.join(__dirname, "public", "pedido_completo.html"), htmlContent, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al generar el pedido");
      } else {
        res.sendFile(path.join(__dirname, "public", "pedido_completo.html"));
        console.log("HTML generado");
      }
    });
  });
});

// Ruta GET para la página de inicio
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Procesamiento de Pedidos"); // Mensaje de bienvenida
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
