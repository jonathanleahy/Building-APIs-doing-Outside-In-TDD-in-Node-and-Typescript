import {Application} from "./rest/Application";
import {Route} from "./rest/Route";
import {SecretsByIdController} from "./rest/SecretsByIdController";
import {SecretsByIdRoute} from "./rest/SecretsByIdRoute";
import {SecretRetriever} from "./SecretRetriever";
import {UrlId} from "./UrlId";
import {Secret} from "./Secret";

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