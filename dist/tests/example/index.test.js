"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../src/util/utils");
const BlogService_1 = require("../../src/services/BlogService");
describe('test method', function () {
    let sandbox;
    let req;
    let res;
    beforeEach(() => {
        sandbox = utils_1.sinon.createSandbox();
        req = {
            body: {
                title: 'test',
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
    it('should do test', function () {
        const blog = new BlogService_1.BlogService();
        blog.addNewExampleItem(req, res);
        utils_1.expect(1).to.be.equal(1);
    });
});
