import {SecretsByIdController} from "../../src/rest/SecretsByIdController";
import {request, Request, response, Response} from "express";
import {UrlIdValidationError} from "../../src/UrlIdValidationError";

describe('SecretsByIdController Tests', () => {
    it('should return an error when the urlId is too short', async () => {
        const req: Request = expect.any(request)
        req.params = { urlId: "tyu12" }
        const res: Response = expect.any(response)
        const next = jest.fn()
        const secretsByIdController = new SecretsByIdController()
        secretsByIdController.retrieveSecret(req, res, next)
        expect(next).toBeCalledTimes(1)
        expect(next).toBeCalledWith(new UrlIdValidationError("UrlId is too short"))
    });
});
