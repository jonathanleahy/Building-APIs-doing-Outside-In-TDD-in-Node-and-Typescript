import {UrlId} from "./UrlId";
import {Secret} from "./Secret";

export interface SecretRetriever {
    retrieveSecretByUrlId(urlId: UrlId): Promise<Secret>
}