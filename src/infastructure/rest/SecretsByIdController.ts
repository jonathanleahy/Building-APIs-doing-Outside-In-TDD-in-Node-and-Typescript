import {Request, Response, NextFunction} from "express";
import {SecretNotFoundError} from "../../domain/errors/SecretNotFoundError";
import {UrlId} from "../../domain/models/UrlId";
import {SecretRetriever} from "../../services/SecretRetriever";

export class SecretsByIdController {

    constructor(private secretRetriever: SecretRetriever) {

    }

    async retrieveSecret(request: Request, response: Response, next: NextFunction) {
        try {
            const urlId = new UrlId(request.params.urlId)
            const secret = await this.secretRetriever.retrieveSecretByUrlId(urlId)
            throw new SecretNotFoundError()
        } catch (error) {
            next(error)
        }
        // if (request.params.urlId.length <= 10) {
        //     next(new UrlIdValidationError("UrlId is too short"))
        // }
        // if (request.params.urlId.length >= 10) {
        //     next(new SecretNotFoundError("Secret Not Found"))
        // }
    }
}