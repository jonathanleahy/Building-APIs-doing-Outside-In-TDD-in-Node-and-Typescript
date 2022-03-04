export class UrlIdValidationError extends Error {
    public message: string
    constructor(message: string) {
        super(message)
        this.name = "UrlIdValidationError"
    }
}