import {Application} from "./Application";
import {Route} from "./Route";
import {SecretsByIdController} from "./SecretsByIdController";
import {SecretsByIdRoute} from "./SecretsByIdRoute";

const secretsByController = new SecretsByIdController()
const secretsByIdRoute = new SecretsByIdRoute(secretsByController)

const routeList: Route[] = [];
routeList.push(secretsByIdRoute)

const application = new Application(routeList)

const expressApplication = application.getExpressApplication()

export default expressApplication