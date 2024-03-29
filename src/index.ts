import { ExpressServer } from './expressServer';
import { UserController } from "./controllers/user.controller";
import { UserRepository } from "./database/repositories/user.repository";
import { GetUsersService } from "./useCases/get-users.service";
import { AddUsersService } from "./useCases/add-users.service";
import { ProcessCsvFileService } from "./useCases/process-csv-file.service";
import { AppController } from './controllers/app.controller';

const server = new ExpressServer();

const userRepository = new UserRepository();
const getUsersService = new GetUsersService(userRepository);
const addUserService = new AddUsersService(userRepository);
const processCsvFileService = new ProcessCsvFileService(addUserService);
const userController = new UserController(getUsersService, processCsvFileService);
const appController = new AppController();

server.setRoutes(userController.getRoutes(), '/api');
server.setRoutes(appController.getRoutes(), '/api');

server.setPort(3000)
server.start();
