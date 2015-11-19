"use strict"

class Parser {
  constructor (data) {
    this.line = data
    this.space = 0;
    this.position = 0;
    
    this.message = {
        raw: null,
        prefix: null,
        command: null,
        params: [],
        trailing: null
    }
    
    this.message.raw = this.line;
  }
  
  parse() {
    this._trimWhitespace();
    this._parsePrefix();
    this._trimWhitespace();
    this._parseCommand();
    this._trimWhitespace();
    this._parseParams();
  
    return this.message;
  }
  _trimWhitespace() {
    while (this.line[this.position] === ' ') {
        this.position++;
    }
  }

  _parsePrefix() {
      if (this.line[this.position] === ':') {
          this.space = this.line.indexOf(' ', this.position);
          if (this.space === -1) { return null; }
  
          this.message.prefix = this.line.slice(this.position + 1, this.space).replace(':', '');
          this.position = this.space + 1;
      }
  }

  _parseCommand() {
      this.space = this.line.indexOf(' ', this.position);
  
      if (this.space === -1) {
          if (this.line.length > this.position) {
              this.message.command = this.line.slice(this.position);
          }
          return;
      }
  
      this.message.command = String(this.line.slice(this.position, this.space));
      this.position = this.space + 1;
  }

  _parseParams() {
      while (this.position < this.line.length) {
  
          this.space = this.line.indexOf(' ', this.position);
  
          // Trailing!
          if (this.line[this.position] === ':') {
              this.message.trailing = this.line.slice(this.position + 1);
              break;
          }
  
          // Keep looping!
          if (this.space !== -1) {
              this.message.params.push(this.line.slice(this.position, this.space));
              this.position = this.space + 1;
              
              this._trimWhitespace();
              continue;
          }
  
          // We hit the end.
          if (this.space === -1) {
              this.message.params.push(this.line.slice(this.position));
              
              break;
          }
      }
  
  }
}

module.exports = Parser;