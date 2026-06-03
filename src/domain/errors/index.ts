export { AppError } from './AppError';

export class UnauthorizedError extends Error {
  readonly code = 'UNAUTHORIZED';
  readonly statusCode = 401;
  constructor(message = 'No autorizado') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  readonly code = 'FORBIDDEN';
  readonly statusCode = 403;
  constructor(message = 'Acceso denegado') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  readonly code = 'NOT_FOUND';
  readonly statusCode = 404;
  constructor(message = 'Recurso no encontrado') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  readonly code = 'CONFLICT';
  readonly statusCode = 409;
  constructor(message = 'Conflicto con el estado actual') {
    super(message);
    this.name = 'ConflictError';
  }
}

export class ValidationError extends Error {
  readonly code = 'VALIDATION';
  readonly statusCode = 400;
  constructor(message = 'Datos inválidos') {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error {
  readonly code = 'NETWORK';
  constructor(message = 'Error de red') {
    super(message);
    this.name = 'NetworkError';
  }
}
