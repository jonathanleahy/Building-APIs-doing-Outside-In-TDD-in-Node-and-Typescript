import {UrlId} from "../domain/models/UrlId";
import {Secret} from "../domain/models/Secret";

export interface SecretRetriever {
    retrieveSecretByUrlId(urlId: UrlId): Promise<Secret>
}