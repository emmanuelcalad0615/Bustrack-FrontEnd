import { LocalTokenStorage } from '../storage/LocalTokenStorage';
import { LocalUserSessionStorage } from '../storage/LocalUserSessionStorage';
import { HttpAuthRepository } from '../repositories/HttpAuthRepository';
import { HttpRouteRepository } from '../repositories/HttpRouteRepository';
import { HttpSubscriptionRepository } from '../repositories/HttpSubscriptionRepository';
import { HttpBusRepository } from '../repositories/HttpBusRepository';
import { HttpLocationRepository } from '../repositories/HttpLocationRepository';
import { HttpAlertRepository } from '../repositories/HttpAlertRepository';
import { HttpSyncRepository } from '../repositories/HttpSyncRepository';
import { LoginUser } from '../../application/usecases/LoginUser';
import { RegisterUser } from '../../application/usecases/RegisterUser';
import { LogoutUser } from '../../application/usecases/LogoutUser';
import { GetCurrentSession } from '../../application/usecases/GetCurrentSession';
import { ListRoutes } from '../../application/usecases/ListRoutes';
import { GetMySubscriptions } from '../../application/usecases/GetMySubscriptions';
import { SubscribeToRoute } from '../../application/usecases/SubscribeToRoute';
import { UnsubscribeFromRoute } from '../../application/usecases/UnsubscribeFromRoute';
import { ListBuses } from '../../application/usecases/ListBuses';
import { GetBusLocation } from '../../application/usecases/GetBusLocation';
import { GetMyAlerts } from '../../application/usecases/GetMyAlerts';
import { MarkAlertRead } from '../../application/usecases/MarkAlertRead';
import { DeleteAlert } from '../../application/usecases/DeleteAlert';
import { CheckProximity } from '../../application/usecases/CheckProximity';
import { CreateRoute } from '../../application/usecases/CreateRoute';
import { UpdateRoute } from '../../application/usecases/UpdateRoute';
import { DeleteRoute } from '../../application/usecases/DeleteRoute';
import { CreateBus } from '../../application/usecases/CreateBus';
import { UpdateBus } from '../../application/usecases/UpdateBus';
import { DeleteBus } from '../../application/usecases/DeleteBus';
import { SyncRoutes } from '../../application/usecases/SyncRoutes';
import { SeedBuses } from '../../application/usecases/SeedBuses';

// Storage
const tokenStorage = new LocalTokenStorage();
const userSessionStorage = new LocalUserSessionStorage();

// Repositories
const authRepository = new HttpAuthRepository();
const routeRepository = new HttpRouteRepository();
const subscriptionRepository = new HttpSubscriptionRepository();
const busRepository = new HttpBusRepository();
const locationRepository = new HttpLocationRepository();
const alertRepository = new HttpAlertRepository();
const syncRepository = new HttpSyncRepository();

// Auth
export const loginUser = new LoginUser(authRepository, tokenStorage, userSessionStorage);
export const registerUser = new RegisterUser(authRepository);
export const logoutUser = new LogoutUser(tokenStorage, userSessionStorage);
export const getCurrentSession = new GetCurrentSession(tokenStorage, userSessionStorage);

// Routes
export const listRoutes = new ListRoutes(routeRepository);
export const createRoute = new CreateRoute(routeRepository);
export const updateRoute = new UpdateRoute(routeRepository);
export const deleteRoute = new DeleteRoute(routeRepository);

// Subscriptions
export const getMySubscriptions = new GetMySubscriptions(subscriptionRepository);
export const subscribeToRoute = new SubscribeToRoute(subscriptionRepository);
export const unsubscribeFromRoute = new UnsubscribeFromRoute(subscriptionRepository);

// Buses + Locations
export const listBuses = new ListBuses(busRepository);
export const getBusLocation = new GetBusLocation(locationRepository);
export const createBus = new CreateBus(busRepository);
export const updateBus = new UpdateBus(busRepository);
export const deleteBus = new DeleteBus(busRepository);

// Alerts
export const getMyAlerts = new GetMyAlerts(alertRepository);
export const markAlertRead = new MarkAlertRead(alertRepository);
export const deleteAlert = new DeleteAlert(alertRepository);
export const checkProximity = new CheckProximity(alertRepository);

// Sync (ADMIN only)
export const syncRoutes = new SyncRoutes(syncRepository);
export const seedBuses = new SeedBuses(syncRepository);
