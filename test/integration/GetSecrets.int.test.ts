import supertest from "supertest";
import server from "../../src/server";
import {SecretModel} from "../../src/infastructure/repositories/SecretModel";

const request = supertest(server)

describe('Get secrets integration tests', () => {
    it('should return an error when the urlId is too short', async () => {
        const response = await request.get("/api/v1/secrets/short")
        expect(response.status).toBe(400);
        expect(response.body).toEqual({name: "UrlIdValidationError", message: "UrlId is too short"});
    });
    it('should return an error when the secret doesn\'t exist', async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue(null)
        const response = await request.get("/api/v1/secrets/nottheresodoesntexist")
        expect(response.status).toBe(404);
        expect(response.body).toEqual({name: "SecretNotFoundError", message: "Secret Not Found in the System"});
    });
    it('should retrieve a secret from the system', () => {
    });
    it('should throw a 500 error when unexpected error is thrown', () => {
    });
});
