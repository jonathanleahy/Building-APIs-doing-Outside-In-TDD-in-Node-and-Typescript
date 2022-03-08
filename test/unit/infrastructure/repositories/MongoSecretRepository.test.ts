import mongoose from "mongoose";
import {MongoSecretRepository} from "../../../../src/infastructure/repositories/MongoSecretRepository";
import {UrlId} from "../../../../src/domain/models/UrlId";
import {SecretModel} from "../../../../src/infastructure/repositories/SecretModel";

describe("MongoSecretRepository Tests", () => {
    it("should connect to the database", () => {
        mongoose.connect = jest.fn()
        new MongoSecretRepository()
        expect(mongoose.connect).toBeCalledTimes(1)
        expect(mongoose.connect).toBeCalledWith("mongodb://localhost:27017/onetimesecretb")
    })
    it("should not connect to the database when connection is already established", () => {
        mongoose.connect = jest.fn()
        // @ts-ignore
        mongoose.connection.readyState = 1
        new MongoSecretRepository()
        expect(mongoose.connect).toBeCalledTimes(0)
    })
    it("should return a null object when the secret is not found", async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue(null)
        mongoose.connect = jest.fn()
        // @ts-ignore
        mongoose.connection.readyState = 1
        const urlId = new UrlId("qweqweqweq34234w")
        const mongoSecretRepository = new MongoSecretRepository()
        expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toBe(null)
        expect(mongoose.connect).toBeCalledTimes(0)
    })
    it("should return the secret when it's found", async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue({
            secret:"thisisagoodsecret"
        })
        mongoose.connect = jest.fn()
        // @ts-ignore
        mongoose.connection.readyState = 1
        const urlId = new UrlId("qweqweqweq34234w")
        const mongoSecretRepository = new MongoSecretRepository()
        await mongoSecretRepository.getSecretByUrlId(urlId)
        expect(mongoose.connect).toBeCalledTimes(0)
        expect(SecretModel.findOne).toBeCalledTimes(1)
        expect(SecretModel.findOne).toBeCalledWith({ urlId: "qweqweqweq34234w"})
    })
    it("should remove a secret from the database", async () => {
        SecretModel.deleteOne = jest.fn()
        mongoose.connect = jest.fn()
        // @ts-ignore
        mongoose.connection.readyState = 1
        const urlId = new UrlId("qweqweqweq34234w")
        const mongoSecretRepository = new MongoSecretRepository()
        await mongoSecretRepository.removeSecretByUrlId(urlId)
        expect(SecretModel.deleteOne).toBeCalledTimes(1)
        expect(SecretModel.deleteOne).toBeCalledWith({ urlId: "qweqweqweq34234w"})
    })
})