class StatusError extends Error {
  status;

  constructor(status: number, error: Error) {
    super();
    this.status = status;
    this.name = 'StatusError';
    this.message = error.message ? error.message : 'Verifique o código do erro na documentação';
  }
}

export { StatusError };
