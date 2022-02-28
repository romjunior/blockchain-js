export class HttpError extends Error {
    constructor(private status: number, private data: unknown, message?: string){
        super(message)
    }

    get statusCode(): number {
        return this.status;
    }

    get dataResponse(): unknown {
        return this.data;
    }
}

export class BadRequestError extends HttpError {
    constructor(data: unknown, message: string) {
        super(400, data, message);
    }
}

export class NotFoundRequestError extends HttpError {
    constructor(data: unknown, message: string) {
        super(404, data, message);
    }
}