import supertest from "supertest";
import app from "../app";
import Blockchain from "../core/Blockchain";

const request = supertest(app);

jest.mock('../core/Blockchain');

describe('BlockchainController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('mine with success block', (done) => {
        Blockchain.getIstance = jest.fn().mockImplementation(() => {
            return {
                minePendingTransactions: jest.fn()
            }
        });

        request.get('/blockchain/mine?publicKey=aaa')
            .expect(201, {
                message: 'block mined with success!'
            }, done);
    });

    it('error when tries to mine a block', (done) => {
        Blockchain.getIstance = jest.fn().mockImplementation(() => {
            return {
                minePendingTransactions: jest.fn().mockImplementation(() => {
                    throw new Error('error');
                })
            }
        });

        request.get('/blockchain/mine?publicKey=aaa')
        .expect(500, {
            message: 'error'
        }, done);


    });
});