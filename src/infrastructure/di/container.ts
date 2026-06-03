import { LocalTokenStorage } from '../storage/LocalTokenStorage';
import { LocalUserSessionStorage } from '../storage/LocalUserSessionStorage';
import { HttpAuthRepository } from '../repositories/HttpAuthRepository';
import { HttpRouteRepository } from '../repositories/HttpRouteRepository';
import { HttpSubscriptionRepository } from '../repositories/HttpSubscriptionRepository';
import { LoginUser } from '../../application/usecases/LoginUser';
import { RegisterUser } from '../../application/usecases/RegisterUser';
import { LogoutUser } from '../../application/usecases/LogoutUser';
import { GetCurrentSession } from '../../application/usecases/GetCurrentSession';
import { ListRoutes } from '../../application/usecases/ListRoutes';
import { GetMySubscriptions } from '../../application/usecases/GetMySubscriptions';
import { SubscribeToRoute } from '../../application/usecases/SubscribeToRoute';
import { UnsubscribeFromRoute } from '../../application/usecases/UnsubscribeFromRoute';

// Storage
const tokenStorage = new LocalTokenStorage();
const userSessionStorage = new LocalUserSessionStorage();

// Repositories
const authRepository = new HttpAuthRepository();
const routeRepository = new HttpRouteRepository();
const subscriptionRepository = new HttpSubscriptionRepository();

// Auth usecases
export const loginUser = new LoginUser(authRepository, tokenStorage, userSessionStorage);
export const registerUser = new RegisterUser(authRepository);
export const logoutUser = new LogoutUser(tokenStorage, userSessionStorage);
export const getCurrentSession = new GetCurrentSession(tokenStorage, userSessionStorage);

// Route usecases
export const listRoutes = new ListRoutes(routeRepository);

// Subscription usecases
export const getMySubscriptions = new GetMySubscriptions(subscriptionRepository);
export const subscribeToRoute = new SubscribeToRoute(subscriptionRepository);
export const unsubscribeFromRoute = new UnsubscribeFromRoute(subscriptionRepository);
