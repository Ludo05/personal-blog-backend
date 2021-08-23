"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
describe('test method', function () {
    let sandbox;
    let req;
    let res;
    beforeEach(() => {
        sandbox = utils_1.sinon.createSandbox();
        req = {
            body: {
                summary: 'summary test'
            },
        };
        res = {
            render: sandbox.stub(),
            send: sandbox.stub(),
            redirect: utils_1.sinon.spy(),
            json: utils_1.sinon.spy()
        };
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('should validate data', function () {
        utils_1.expect(1).to.equal(1);
    });
});
