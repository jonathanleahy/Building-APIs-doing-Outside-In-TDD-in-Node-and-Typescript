import {Application} from "./infastructure/rest/Application";
import {Route} from "./infastructure/rest/Route";
import {SecretsByIdController} from "./infastructure/rest/SecretsByIdController";
import {SecretsByIdRoute} from "./infastructure/rest/SecretsByIdRoute";
import {OneTimeSecretRetriever} from "./services/OneTimeSecretRetriever";
import {MongoSecretRepository} from "./infastructure/repositories/MongoSecretRepository";

const secretRepository = new MongoSecretRepository()
const secretRetriever = new OneTimeSecretRetriever(secretRepository)
const secretsByController = new SecretsByIdController(secretRetriever)
const secretsByIdRoute = new SecretsByIdRoute(secretsByController)

const routeList: Route[] = [];
routeList.push(secretsByIdRoute)

const application = new Application(routeList)

const expressApplication = application.getExpressApplication()

export default expressApplication