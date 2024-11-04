//Importa la clase eventEmitter del modulo events de node.js
const eventEmitter = require("events");
//Define una clase procesarPedido que extiene de eventEmitter
class ProcesarPedido extends eventEmitter {
  constructor(pedido) {
    super(); //Llama al constructor de EventEmitter para inicializar eventos
    this.pedido = pedido; //guarda el pedido recibido
  }
  //metodo que inicia el proceso
  iniciar() {
    console.log("Iniciando el procesamiento del pedido...", this.pedido);
    //simula una situacion asincronica con settimeout
    setTimeout(() => {
      console.log("Pedido recibido...");
      this.emit("procesar");
    }, 5000);
  }
  procesar() {
    setTimeout(() => {
        console.log("Procesando pedido...");
        this.emit("enviar");
      }, 5000);
  }
  enviar() {
    setTimeout(() => {
        console.log("Enviando pedido...");
        this.emit("completado");
      }, 5000);
  }
  onCompletar(callback){
    this.on('completado', callback);
  }
}
//exporta el modulo
module.exports = ProcesarPedido;
