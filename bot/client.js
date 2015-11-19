"use strict"

const net = require("net");

class Client {
  constructor (conn, enconding) {
    this._conn = conn;
    this.client = new net.Socket()
    this.client.setEncoding(enconding);
  }
  
  connect(callback) {
    this.client.connect(this._conn, function () {
      callback();
    });
  }
  
  write(line) {
    //console.log(line);
    this.client.write(line + '\r\n');
  }
  
  data(callback) {
    this.client.on('data', callback);
  }
}

module.exports = exports = Client;