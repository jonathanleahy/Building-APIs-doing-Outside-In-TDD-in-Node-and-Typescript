import {Application} from "./rest/Application";
import {Route} from "./rest/Route";
import {SecretsByIdController} from "./rest/SecretsByIdController";
import {SecretsByIdRoute} from "./rest/SecretsByIdRoute";

const secretsByController = new SecretsByIdController()
const secretsByIdRoute = new SecretsByIdRoute(secretsByController)

const routeList: Route[] = [];
routeList.push(secretsByIdRoute)

const application = new Application(routeList)

const expressApplication = application.getExpressApplication()

export default expressApplication