class FailedResponseException extends Error {
  constructor(message, data = {}) {
    super(message);
    this.name = 'FailedResponseException';
    this.message = message;
    this.data = data;
  }
}

export default FailedResponseException;
