const fs = require('fs');

class Ticket {

    constructor(numero, modulo) {
        this.numero = numero;
        this.modulo = modulo;
    }

}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }

    siguienteTicket() {

        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(modulo) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); // Elimina la primera posicion del arreglo

        let atenderTicket = new Ticket(numeroTicket, modulo);
        this.ultimos4.unshift(atenderTicket); // Agrega el dato a el inicio del arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1) // Borra el ultimo dato de en un arreglo
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicialiazado el sistema');

        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}

module.exports = {
    TicketControl
}