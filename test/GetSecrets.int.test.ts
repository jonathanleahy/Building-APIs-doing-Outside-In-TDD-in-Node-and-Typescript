import {request} from "express";
import supertest from "supertest";
import server from "../src/server";
const request = supertest(server)

describe('Get secrets integration tests', () => {
    it('should return an error when the urlId is too short', async () => {
        const response = await request.get("/api/v1/secrets/short")
        expect(response.status).toBe(400);
        expect(response.body).toEqual({name: "UrlIdValidationError", message: "UrlID is too short"});
    });
    xit('should return an error when the secret doesn\'t exist', () => {
    });
    xit('should retrieve a secret from the system', () => {
    });
});
