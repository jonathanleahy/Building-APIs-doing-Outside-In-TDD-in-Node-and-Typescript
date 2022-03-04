export class SecretNotFoundError extends Error {
    constructor() {
        super("Secret Not Found in the System")
        this.name = "SecretNotFoundError"
    }
}