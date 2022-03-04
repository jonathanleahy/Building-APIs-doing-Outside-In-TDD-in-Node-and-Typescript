import {UrlId} from "../src/UrlId";
import {UrlIdValidationError} from "../src/UrlIdValidationError";

describe('UrlId Tests', () => {
    it('should create an instance of UrlId', () => {
        expect(new UrlId("123qweqweqweqweqweqweqweqweqweqwe")).toBeInstanceOf(UrlId)
    });
    it("should throw an error when attempting to create a UrlId that is too short", () => {
        expect(() => new UrlId("122")).toThrow(new UrlIdValidationError("UrlId is too short"))
    })
});
