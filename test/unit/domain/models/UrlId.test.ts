import {UrlId} from "../../../../src/domain/models/UrlId";
import {UrlIdValidationError} from "../../../../src/domain/errors/UrlIdValidationError";

describe('UrlId Tests', () => {
    it('should create an instance of UrlId', () => {
        expect(new UrlId("123qweqweqweqweqweqweqweqweqweqwe")).toBeInstanceOf(UrlId)
    });
    it("should throw an error when attempting to create a UrlId that is too short", () => {
        expect(() => new UrlId("122")).toThrow(new UrlIdValidationError("UrlId is too short"))
    })
    it("should return a string representation on the toString method", () => {
        expect(new UrlId("12qweqweqweqweqwe2").toString()).toEqual("12qweqweqweqweqwe2")
    })
});
