import supertest from "supertest";
import server from "../../src/server";
import {SecretModel} from "../../src/infastructure/repositories/SecretModel";
import mongoose from "mongoose";

const request = supertest(server)

describe('Get secrets integration tests', () => {
    it('should return an error when the urlId is too short', async () => {
        // @ts-ignore
        mongoose.connection.readyState = 1
        const response = await request.get("/api/v1/secrets/short")
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
                name: "UrlIdValidationError",
                message: "UrlId is too short"
            });
    });
    it('should return an error when the secret doesn\'t exist', async () => {
        // @ts-ignore
        mongoose.connection.readyState = 1
        SecretModel.findOne = jest.fn().mockResolvedValue(null)
        const response = await request.get("/api/v1/secrets/nottheresodoesntexist")
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            name: "SecretNotFoundError",
            message: "Secret Not Found in the System"
        });
    });
    it('should retrieve a secret from the system', async () => {
        // @ts-ignore
        mongoose.connection.readyState = 1
        SecretModel.findOne = jest.fn().mockResolvedValue({
            secret:"mySecret"}
        )
        SecretModel.deleteOne = jest.fn()

        const response = await request.get("/api/v1/secrets/this_does_exist")
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            secret: "mySecret"
        });

        expect(SecretModel.deleteOne).toBeCalledTimes(1);
        expect(SecretModel.deleteOne).toBeCalledWith({urlId: "this_does_exist"});
    });
    it('should throw a 500 error when unexpected error is thrown', async () => {
        SecretModel.findOne = jest.fn().mockImplementation(async () => {
            throw new Error("Connection refused")
        })
        // @ts-ignore
        mongoose.connection.readyState = 1

        const response = await request.get("/api/v1/secrets/this_does_exist")

        expect(response.status).toBe(500);
            expect(response.body).toEqual({
                name: "InternalServerError",
                message: "Something went wrong"
            });
    });
});
