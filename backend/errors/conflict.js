class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'Conflict';
  }
}

module.exports = Conflict;
