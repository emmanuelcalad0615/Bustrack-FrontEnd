import type { AxiosError } from 'axios';
import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  NetworkError,
  AppError,
} from '../../domain/errors';

export function mapApiError(err: AxiosError<{ error?: string }>): Error {
  if (!err.response) return new NetworkError();

  const message = err.response.data?.error ?? err.message;
  const status = err.response.status;

  if (status === 401) return new UnauthorizedError(message);
  if (status === 403) return new ForbiddenError(message);
  if (status === 404) return new NotFoundError(message);
  if (status === 409) return new ConflictError(message);
  if (status === 400) return new ValidationError(message);

  return new AppError(message, 'SERVER_ERROR', status);
}
