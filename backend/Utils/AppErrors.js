class AppErrors extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = false;
  }
}
export default new AppErrors();
