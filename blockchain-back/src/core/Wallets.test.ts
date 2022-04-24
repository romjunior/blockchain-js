import * as WalletModule from "./Wallets";

jest.mock('./Keys', () => {
    return {
        getInstance: jest.fn().mockImplementation(() => {
            return {
                generateKeys: jest.fn().mockReturnValue(['private', 'public'])
            }
        })
    }
});

let underTestModule: typeof WalletModule

describe('Wallets', () => {

    beforeEach(() => {
        jest.resetModules();
        //jest.clearAllMocks();
        underTestModule = require('./Wallets');
    });

    it('Should create a public key', async () => {
       const keys = await underTestModule.createWallet('test');

       const publicKey = await underTestModule.findPublicKeyByAlias('test');

       expect(keys).toStrictEqual(['private', 'public']);
       expect(publicKey).toBe('public');
    });

    it('Should return a error when a alias is duplicated', async() => {
        await underTestModule.createWallet('test');

        await expect(underTestModule.createWallet('test')).rejects.toThrow(Error);
        await expect(underTestModule.createWallet('test')).rejects.toThrow('Wallet alias already exists! choose other alias.');
    });

    it('Should return a public key by de searched alias', async() => {
        await underTestModule.createWallet('test');

        const result = await underTestModule.findPublicKeyByAlias('test');

        expect(result).toBe('public');
    });

    it('Should return undefined when de searched alias not exists', async() => {
        const result = await underTestModule.findPublicKeyByAlias('test');

        expect(result).toBe(undefined);
    });

    it('Should list all created wallets', async() => {
        await underTestModule.createWallet('test');

        const result = await underTestModule.listAllWallets();

        expect(result).toStrictEqual([
            {
                alias: 'test',
                publicKey: 'public'
            }
        ])
    });
});