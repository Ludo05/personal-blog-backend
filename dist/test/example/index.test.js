"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const BlogSchema_1 = require("../../src/models/BlogSchema");
const BlogService_1 = require("../../src/services/BlogService");
describe('test method', function () {
    let sandbox;
    let req;
    let res;
    beforeEach(() => {
        utils_1.sinon.stub(BlogSchema_1.BlogModel, 'find');
        sandbox = utils_1.sinon.createSandbox();
        req = {
            body: {
                summary: 'summary test'
            },
        };
        res = {
            render: sandbox.stub(),
            redirect: utils_1.sinon.spy(),
            json: utils_1.sinon.stub()
        };
    });
    afterEach(() => {
        // @ts-ignore
        BlogSchema_1.BlogModel.find.restore();
        sandbox.restore();
    });
    it('should test find function', () => {
        const a = { name: 'a' };
        const b = { name: 'b' };
        const expectedModels = [a, b];
        // @ts-ignore
        BlogSchema_1.BlogModel.find.yields(null, expectedModels);
        const req = { params: {} };
        const res = {
            json: utils_1.sinon.stub()
        };
        const routes = new BlogService_1.BlogService();
        routes.getAllExampleItems(req, res);
        utils_1.sinon.assert.calledWith(res.json, expectedModels);
    });
});
