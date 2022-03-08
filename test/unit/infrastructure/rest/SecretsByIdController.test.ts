import {SecretsByIdController} from "../../../../src/infastructure/rest/SecretsByIdController";
import {request, Request, response, Response} from "express";
import {UrlIdValidationError} from "../../../../src/domain/errors/UrlIdValidationError";
import {SecretNotFoundError} from "../../../../src/domain/errors/SecretNotFoundError";
import {SecretRetriever} from "../../../../src/services/SecretRetriever";
import {UrlId} from "../../../../src/domain/models/UrlId";
import {Secret} from "../../../../src/domain/models/Secret";

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
    it('should respond with a secret when it is found', async () => {
        const req: Request = expect.any(request)
        req.params = {urlId: "werwerwerwewerwerrwrwerrwe"}
        const res: Response = expect.any(response)
        res.status = jest.fn().mockReturnThis()
        res.json = jest.fn()
        const next = jest.fn()
        const secretRetriever: SecretRetriever = {
            retrieveSecretByUrlId: jest.fn().mockResolvedValue(new Secret("iamfoundhere"))
        }
        const secretsByIdController = new SecretsByIdController(secretRetriever)
        await secretsByIdController.retrieveSecret(req, res, next)

        expect(next).toBeCalledTimes(0)
        expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(1)
        expect(secretRetriever.retrieveSecretByUrlId).toBeCalledWith(new UrlId("werwerwerwewerwerrwrwerrwe"))

        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({secret: "iamfoundhere"})

    })
});
