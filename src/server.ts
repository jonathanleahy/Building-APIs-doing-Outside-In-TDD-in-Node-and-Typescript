import {Application} from "./infastructure/rest/Application";
import {Route} from "./infastructure/rest/Route";
import {SecretsByIdController} from "./infastructure/rest/SecretsByIdController";
import {SecretsByIdRoute} from "./infastructure/rest/SecretsByIdRoute";
import {SecretRetriever} from "./services/SecretRetriever";
import {UrlId} from "./domain/models/UrlId";
import {Secret} from "./domain/models/Secret";

const secretRetriever: SecretRetriever = {
    retrieveSecretByUrlId(urlId: UrlId): Promise<Secret> {
        throw new Error("Function not implemented.");
    }
}
const secretsByController = new SecretsByIdController(secretRetriever)
const secretsByIdRoute = new SecretsByIdRoute(secretsByController)

const routeList: Route[] = [];
routeList.push(secretsByIdRoute)

const application = new Application(routeList)

const expressApplication = application.getExpressApplication()

export default expressApplication