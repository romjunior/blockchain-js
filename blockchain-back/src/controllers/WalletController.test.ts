import supertest from "supertest";
import app from "../app";
import { createWallet } from "../core/Wallets";

jest.mock('../core/Wallets');
const mockCreateWallet = createWallet as jest.MockedFunction<typeof createWallet>;

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
        },done);
    });

    it('error 400 when trying to call without alias param', (done) => {
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
});