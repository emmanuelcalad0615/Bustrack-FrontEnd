import { LocalTokenStorage } from '../storage/LocalTokenStorage';
import { LocalUserSessionStorage } from '../storage/LocalUserSessionStorage';
import { HttpAuthRepository } from '../repositories/HttpAuthRepository';
import { LoginUser } from '../../application/usecases/LoginUser';
import { RegisterUser } from '../../application/usecases/RegisterUser';
import { LogoutUser } from '../../application/usecases/LogoutUser';
import { GetCurrentSession } from '../../application/usecases/GetCurrentSession';

const tokenStorage = new LocalTokenStorage();
const userSessionStorage = new LocalUserSessionStorage();
const authRepository = new HttpAuthRepository();

export const loginUser = new LoginUser(authRepository, tokenStorage, userSessionStorage);
export const registerUser = new RegisterUser(authRepository);
export const logoutUser = new LogoutUser(tokenStorage, userSessionStorage);
export const getCurrentSession = new GetCurrentSession(tokenStorage, userSessionStorage);
