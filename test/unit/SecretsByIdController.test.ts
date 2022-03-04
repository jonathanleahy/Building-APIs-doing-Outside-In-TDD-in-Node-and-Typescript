import {SecretsByIdController} from "../../src/rest/SecretsByIdController";
import {request, Request, response, Response} from "express";
import {UrlIdValidationError} from "../../src/UrlIdValidationError";
import {SecretNotFoundError} from "../../src/SecretNotFoundError";
import {SecretRetriever} from "../../src/SecretRetriever";
import {UrlId} from "../../src/UrlId";

describe('SecretsByIdController Tests', () => {
    it('should return an error when the urlId is too short', async () => {
        const req: Request = expect.any(request)
        req.params = {urlId: "tyu12"}
        const res: Response = expect.any(response)
        const next = jest.fn()
        const secretRetriever: SecretRetriever = {
            retrieveSecretByUrlId: jest.fn(),
        }
        const secretsByIdController = new SecretsByIdController(secretRetriever)
        await secretsByIdController.retrieveSecret(req, res, next)
        expect(next).toBeCalledTimes(1)
        expect(next).toBeCalledWith(new UrlIdValidationError("UrlId is too short"))
        expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(0)
    });
    it('should return an error if secret not found', async () => {
        const req: Request = expect.any(request)
        req.params = {urlId: "werwerwerwewerwerrwrwerrwe"}
        const res: Response = expect.any(response)
        const next = jest.fn()
        const secretRetriever: SecretRetriever = {
            retrieveSecretByUrlId: jest.fn().mockImplementation(async () => {
                throw new SecretNotFoundError()
            }),
        }
        const secretsByIdController = new SecretsByIdController(secretRetriever)
        await secretsByIdController.retrieveSecret(req, res, next)
        expect(next).toBeCalledTimes(1)
        expect(next).toBeCalledWith(new SecretNotFoundError())
        expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(1)
        expect(secretRetriever.retrieveSecretByUrlId).toBeCalledWith(new UrlId("werwerwerwewerwerrwrwerrwe"))
    })
});
