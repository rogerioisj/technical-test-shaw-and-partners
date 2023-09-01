import { ExpressServer } from './expressServer';
import { AppController } from "./controllers/app.controller";
import { UserController } from "./controllers/user.controller";
import { UserRepository } from "./database/repositories/user.repository";
import { GetUsersService } from "./useCases/get-users.service";
import { AddUsersService } from "./useCases/add-users.service";

const server = new ExpressServer();
const appController = new AppController();

const userRepository = new UserRepository();
const getUsersService = new GetUsersService(userRepository);
const addUserService = new AddUsersService(userRepository);
const userController = new UserController(getUsersService, addUserService);

server.setRoutes(appController.getRoutes(), '/api');
server.setRoutes(userController.getRoutes(), '/api');

server.setPort(3000)
server.start();
