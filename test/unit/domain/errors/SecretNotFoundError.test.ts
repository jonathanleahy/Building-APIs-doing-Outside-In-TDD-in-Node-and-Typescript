import {SecretNotFoundError} from "../../../../src/domain/errors/SecretNotFoundError";

describe('SecretNotFoundError Tests', () => {
    it('should create a UrlIdValidationError error', async () => {
        const error = new SecretNotFoundError()
        expect(error).toBeInstanceOf(SecretNotFoundError)
        expect(error.name).toBe("SecretNotFoundError")
        expect(error.message).toBe("Secret Not Found in the System")
    })
})
