const EventEmitter = require('events'); //importar EventEmitter
const { eventNames } = require('process');
const emisor = new EventEmitter();// crear una instancia de EventEmitter

//vamos a definir un oyente para el evento "saludo"
// emisor.on('saludo', (nombre) => {
//     console.log(`¡Hola, ${nombre}!`);
// });
// emisor.on('inicio', () => console.log("El proceso ha comenzado..."));
// emisor.on('progreso', (porcentaje) => console.log(`Progreso: ${porcentaje}%`));
// emisor.on('fin', () => console.log("El proceso ha finalizado."));

//emito
// emisor.emit('inicio');
// emisor.emit('progreso', 10);
// emisor.emit('progreso', 20);
// emisor.emit('progreso', 40);
// emisor.emit('progreso', 60);
// emisor.emit('progreso', 80);
// emisor.emit('progreso', 100);
// emisor.emit('fin');

//emitir el evento "saludo" con el argumento Mundo
// emisor.emit('saludo', 'Mundo');
//escuchar el evento una sola vez
// emisor.once('conectar', () => {
//     console.log("Conexion establecida");
// })
//Emitir el evento conectar varias veces
//emisor.emit('conectar'); //se ejecuta
//emisor.emit('conectar'); //no se ejecuta

// emisor.on('mensaje', (usuario, contenido) => {
//     console.log(`[${usuario}] : \n${contenido}`);
// });

class Descarga extends EventEmitter{
    iniciar(){
        console.log("iniciando descarga...");
        this.emit('inicio')
    }
    progreso(porcentaje){
        console.log('Descarga: '+ porcentaje + '%');
        this.emit('progreso', porcentaje);
    }
    finalizar(){
        console.log('Descarga completa');
        this.emit('fin');
    }
}

const descarga = new Descarga();
descarga.on('inicio', () => console.log("La descarga ha comenzado"))
descarga.on('progreso', (porcentaje) => console.log(`Progreso: ${porcentaje}%`))
descarga.on('fin', () => console.log("La descarga ha terminado"))

descarga.iniciar();

descarga.progreso(25);
descarga.progreso(50);
descarga.progreso(75);

descarga.finalizar();

