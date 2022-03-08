import supertest from 'supertest';
import app from '../app';
import Blockchain from '../core/Blockchain';

const request = supertest(app);

/* jest.mock('../core/Blockchain', () => {
    return {
        getIstance: jest.fn().mockImplementation(() => {
            return {
                getBalanceOfAddress: jest.fn().mockResolvedValue(11)
            }
        })
    }
}); */

jest.mock('../core/Blockchain');

describe('BalanceController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Testing 200 with balance', (done) => {
        Blockchain.getIstance = jest.fn().mockImplementation(() => {
            return {
                getBalanceOfAddress: jest.fn().mockResolvedValue(11)   
            }
        });

        request.get('/balance?publicKey=aaa')
        .expect(200, {
            balance: 11
        },  done);
    });

    it('Testing 400 without publicKey param', (done) => {
        request.get('/balance?publicKey')
        .expect(400, {
            data: [
                {
                  value: '',
                  msg: 'Invalid value',
                  param: 'publicKey',
                  location: 'query'
                }
              ]
        }, done);
    });

    it('Testing 500 error for balance query', (done) => {
        Blockchain.getIstance = jest.fn().mockImplementation(() => {
            return {
                getBalanceOfAddress: jest.fn().mockImplementation(() => {
                    throw new Error('error');
                })
            }
        });
        
        request.get('/balance?publicKey=bbb')
        .expect(500, {
            message: 'error'
        }, done);
    });
});