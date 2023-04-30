class HttpError extends Error {
  constructor(statusCode, message) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = {
  HttpError,
};
