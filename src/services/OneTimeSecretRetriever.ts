import {SecretRetriever} from "./SecretRetriever";
import {SecretRepository} from "./SecretRepository";
import {Secret} from "../domain/models/Secret";
import {UrlId} from "../domain/models/UrlId";
import {SecretNotFoundError} from "../domain/errors/SecretNotFoundError";

export class OneTimeSecretRetriever implements SecretRetriever {
    constructor(private secretRepository: SecretRepository) { }

    async retrieveSecretByUrlId(urlId: UrlId): Promise<Secret> {
        const secret = await this.secretRepository.getSecretByUrlId(urlId)
        if (secret === null) throw new SecretNotFoundError()
        // try to retrieve a secret
        // if found return secret and remove the secret
        await this.secretRepository.removeSecretByUrlId(urlId)
        // if not found throw an error
        return secret
    }
}