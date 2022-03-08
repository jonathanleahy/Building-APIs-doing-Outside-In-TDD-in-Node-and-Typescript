import {Request, Response, NextFunction} from "express";
import {SecretNotFoundError} from "../../domain/errors/SecretNotFoundError";
import {UrlId} from "../../domain/models/UrlId";
import {SecretRetriever} from "../../services/SecretRetriever";

export class SecretsByIdController {

    constructor(private secretRetriever: SecretRetriever) { }

    retrieveSecret = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const urlId = new UrlId(request.params.urlId)
            const secret = await this.secretRetriever.retrieveSecretByUrlId(urlId)
            response.status(200).json(secret)
        } catch (error) {
            next(error)
        }

    }
}