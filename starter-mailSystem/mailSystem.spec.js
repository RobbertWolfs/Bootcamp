var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
//chai.use(require('chai-as-promised'));

var repository = require('./repository');
var smtpTransport = require('./smtpTransport');
var mailSystem = require('./mailSystem');

var sandbox;

describe('module', function () {

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox = sandbox.restore();
    });

    it('smtpTransport should be called and have the right params', function () {

        var stub = sandbox.stub(smtpTransport, 'send');

        mailSystem.sendWelcomeMail('peter.cosemans@gmail.com',
            'Welcome to...',
            {name: 'peter'});

        expect(stub).to.have.been.called;

        var mail = stub.args[0][0];
        expect(mail).not.to.be.empty;
        expect(mail.subject).equal('Welcome to...');
        //expect(mail.body).equal('Welcome to...');


    });

    it('should throw an error when to is empty', function () {

        var fn = function () {
            mailSystem.sendWelcomeMail('',
                'Welcome to...',
                {name: 'peter'});
        };


        expect(fn).to.throw(Error);

    });


    it('should return objects', function () {

        var backend = { transfer: sandbox.stub() };
        var stub = sandbox.stub(repository, 'getMails').returns([
            {id: 123, to: 'peter.cosemans@gmail.com', body: 'aaaa...'},
            {id: 123, to: 'wim.vanhoye@euri.com', body: 'bbb...'}
        ]);

        mailSystem.transferEuriMails(backend);
        expect(stub).to.have.been.called;
        var transfer = backend.transfer;
        expect(transfer).to.have.been.called;
        var filteredMails = transfer.args[0][0][0];
        console.log();
        expect(filteredMails).to.include.keys(['to', 'id', 'body']);

    });
});

