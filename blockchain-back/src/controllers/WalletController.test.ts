import supertest from "supertest";
import app from "../app";
import { createWallet, findPublicKeyByAlias, listAllWallets } from "../core/Wallets";

jest.mock('../core/Wallets');
const mockCreateWallet = createWallet as jest.MockedFunction<typeof createWallet>;
const mockFindPublicKeyByAlias = findPublicKeyByAlias as jest.MockedFunction<typeof findPublicKeyByAlias>
const mockListAllWallets = listAllWallets as jest.MockedFunction<typeof listAllWallets>

const request = supertest(app);

describe('WalletController', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('creating a wallet with success', (done) => {

        mockCreateWallet.mockResolvedValue(['private', 'public']);

        request.get('/wallet/create?alias=aa')
            .expect(201, {
                alias: 'aa',
                publicKey: 'public',
                privateKey: 'private',
                message: 'The private key is yours! you gonna use to manage your wallet, so dont lose it! we not gonna stored here!'
            }, done);
    });

    it('error 500 when creating a wallet', (done) => {
        mockCreateWallet.mockImplementation(() => {
            throw new Error("error");
        });

        request.get('/wallet/create?alias=bb')
            .expect(500, {
                message: 'error'
            }, done);
    });

    it('createWallet:error 400 when trying to call without alias param', (done) => {
        request.get('/wallet/create')
            .expect(400, {
                data: [
                    {
                        msg: 'Invalid value',
                        param: 'alias',
                        location: 'query'
                    }
                ]
            }, done);
    });

    it('find public key with alias with success', (done) => {
        mockFindPublicKeyByAlias.mockResolvedValue('publickey');

        request.get('/wallet?alias=aaa')
            .expect(200, {
                alias: 'aaa',
                publicKey: 'publickey'
            }, done);
    });

    it('findWalletByAlias:error 400 when trying to call without alias param', (done) => {
        request.get('/wallet')
            .expect(400, {
                data: [
                    {
                        msg: 'Invalid value',
                        param: 'alias',
                        location: 'query'
                    }
                ]
            }, done);
    });

    it('error 404 when findWalletByAlias not find a wallet', (done) => {
        mockFindPublicKeyByAlias.mockResolvedValue(undefined);

        request.get('/wallet?alias=aaa')
            .expect(404, {
                data: {
                    message: 'Public key for alias not found'
                }
            }, done);
    })

    it('error 500 when findWalletByAlias', (done) => {

        mockFindPublicKeyByAlias.mockImplementation(() => {
            throw new Error('error');
        });

        request.get('/wallet?alias=aaa')
            .expect(500, {
                message: 'error'
            }, done);
    });

    it('list all wallets with success', (done) => {
        mockListAllWallets.mockResolvedValue([{
            alias: 'aaa',
            publicKey: 'publickey'
        },
        {
            alias: 'bbb',
            publicKey: 'publickey2'
        }]);

        request.get('/wallet/all')
            .expect(200, {
                total: 2,
                wallets: [
                    {
                        alias: 'aaa',
                        publicKey: 'publickey'
                    },
                    {
                        alias: 'bbb',
                        publicKey: 'publickey2'
                    }
                ]
            }, done);
    });

    it('list all wallets with empty wallets list', (done) => {
        mockListAllWallets.mockResolvedValue([]);

        request.get('/wallet/all')
            .expect(200, {
                total: 0,
                wallets: []
            }, done);
    });

    it('error 500 when tries to list all wallets', (done) => {
        mockListAllWallets.mockImplementation(() => {
            throw new Error('error');
        });

        request.get('/wallet/all')
        .expect(500, {
            message: 'error'
        }, done);
    });
});