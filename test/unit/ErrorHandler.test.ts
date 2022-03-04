import {UrlIdValidationError} from "../../src/UrlIdValidationError";
import {NextFunction, request, Request, response, Response} from "express";
import {errorHandler} from "../../src/rest/ErrorHandler";
import {SecretNotFoundError} from "../../src/SecretNotFoundError";

describe("ErrorHandler tests", () => {
    it("should generate an Error response for a UrlIdValidationError", ()=> {
        const error = new UrlIdValidationError("UrlId is too short")
        const req: Request = expect.any(request)
        const res: Response = expect.any(response)
        const next: NextFunction = jest.fn()
        res.status = jest.fn().mockReturnThis()
        res.json = jest.fn()
        errorHandler(error, req, res, next)
        expect(next).toBeCalledTimes(0)
        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({ name: "UrlIdValidationError", message: "UrlId is too short"})
    })

    it("should generate an Error response for a SecretNotFoundError", ()=> {
        const error = new SecretNotFoundError()
        const req: Request = expect.any(request)
        const res: Response = expect.any(response)
        const next: NextFunction = jest.fn()
        res.status = jest.fn().mockReturnThis()
        res.json = jest.fn()
        errorHandler(error, req, res, next)
        expect(next).toBeCalledTimes(0)
        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(404)
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({ name: "SecretNotFoundError", message: "Secret Not Found in the System"})
    })

})

