import supertest from "supertest";
import app from "../app";
import { createTransactionService } from "../services/TransactionService";


const request = supertest(app);

jest.mock('../services/TransactionService');

const mockCreateTransactionService = createTransactionService as jest.MockedFunction<typeof createTransactionService>


describe('TransactionController', () => {
    it('create with success a transaction', (done) => {
        request.post('/transaction')
            .send({
                fromAddress: 'from',
                toAddress: 'to',
                amount: 10
            })
            .expect(201, {
                message: 'transaction created!'
            }, done);
    });

    it('error 400 without params', (done) => {
        request.post('/transaction')
            .expect(400, {
                data: [
                    { msg: 'Invalid value', param: 'fromAddress', location: 'body' },
                    { msg: 'Invalid value', param: 'toAddress', location: 'body' },
                    { msg: 'Invalid value', param: 'amount', location: 'body' }
                ]
            }, done);
    });

    it('error 500 when tries to create a transaction', (done) => {
        mockCreateTransactionService.mockImplementation(() => {
            throw new Error('error');
        });

        request.post('/transaction')
            .send({
                fromAddress: 'from',
                toAddress: 'to',
                amount: 10
            })
            .expect(500, {
                message: 'error'
            }, done);
    });
});