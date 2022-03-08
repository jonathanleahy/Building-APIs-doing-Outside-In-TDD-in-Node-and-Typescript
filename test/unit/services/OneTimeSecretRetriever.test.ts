import {SecretNotFoundError} from "../../../src/domain/errors/SecretNotFoundError";
import {UrlId} from "../../../src/domain/models/UrlId";
import {OneTimeSecretRetriever} from "../../../src/services/OneTimeSecretRetriever";
import {SecretRepository} from "../../../src/services/SecretRepository";
import {Secret} from "../../../src/domain/models/Secret";

describe("OneTimeSecretRetriever Tests", () => {
    it("should throw an error if the secret was not found", () => {
        const secretRepository: SecretRepository = {
            getSecretByUrlId: jest.fn().mockReturnValue(null),
            removeSecretByUrlId: jest.fn()
        }
        const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository)
        const urlId = new UrlId("qweqweqweq34234w")
        expect(oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).rejects.toThrow(SecretNotFoundError)
        expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1)
        expect(secretRepository.getSecretByUrlId).toBeCalledWith(new UrlId("qweqweqweq34234w"))
        expect(secretRepository.removeSecretByUrlId).toBeCalledTimes(0)
    })
    it("should return a secret when it is found", async () => {
        const secretRepository: SecretRepository = {
            getSecretByUrlId: jest.fn().mockReturnValue(new Secret("Iamfound")),
            removeSecretByUrlId: jest.fn()
        }
        const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository)
        const urlId = new UrlId("qweqweqweq34234w")
        expect(await oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).toEqual(new Secret("Iamfound"))
        expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1)
        expect(secretRepository.getSecretByUrlId).toBeCalledWith(new UrlId("qweqweqweq34234w"))
        expect(secretRepository.removeSecretByUrlId).toBeCalledTimes(1)
        expect(secretRepository.removeSecretByUrlId).toBeCalledWith(new UrlId("qweqweqweq34234w"))
    })
})