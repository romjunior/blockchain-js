import supertest from "supertest";
import app from "../app";
import Blockchain from "../core/Blockchain";
import { createTransactionService } from "../services/TransactionService";


const request = supertest(app);

jest.mock('../services/TransactionService');
jest.mock('../core/Blockchain');

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

    it('should list all transactions for given address', (done) => {
        Blockchain.getIstance = jest.fn().mockImplementation(() => {
            return {
                getAllTransactionsForWallet: jest.fn().mockResolvedValue([
                    {
                        fromAddress: 'from',
                        toAddress: 'to',
                        amount: 10,
                        timestamp: new Date().toDateString(),
                        signature: 'aaa'
                    }
                ])
            }
        });

        request.get('/transaction?publicKey=from')
            .expect(200, {
                count: 1,
                data: [
                    {
                        fromAddress: 'from',
                        toAddress: 'to',
                        amount: 10,
                        timestamp: 'Mon Mar 14 2022',
                        signature: 'aaa'
                    }
                ]
            }, done);
    });

    it('400 error for list all transactions for invalid param', (done) => {
        request.get('/transaction')
            .expect(400, {
                data: [
                    {
                        msg: 'Invalid value',
                        param: 'publicKey',
                        location: 'query'
                    }
                ]
            }, done);
    });

    it('500 error for list all transations for error', (done) => {
        Blockchain.getIstance = jest.fn().mockImplementation(() => {
            return {
                getAllTransactionsForWallet: jest.fn().mockImplementation(() => {
                    throw new Error('error');
                })
            }
        });

        request.get('/transaction?publicKey=aaa')
            .expect(500, {
                message: 'error'
            }, done);
    });
});