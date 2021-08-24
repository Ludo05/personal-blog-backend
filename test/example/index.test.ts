import { sinon, expect } from "../utils/utils";
import { IBlogSummary } from "../../src/constants/types";
import { Request, Response } from 'express';
import { BlogModel } from "../../src/models/BlogSchema";

import { BlogService } from "../../src/services/BlogService";

describe('test method', function () {

    let sandbox: sinon.SinonSandbox;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        sinon.stub(BlogModel, 'find')
        sandbox = sinon.createSandbox();
        req = {
            body: {
                summary: 'summary test'
            } as Partial<IBlogSummary>,
        } as Partial<Request>;

        res = {
            render: sandbox.stub(),
            redirect: sinon.spy(),
            json: sinon.stub()
        } as Partial<Response>;

    });

    afterEach(() => {
        // @ts-ignore
        BlogModel.find.restore();
        sandbox.restore();
    });


    it('should test find function', () => {
        const a = { name: 'a' };
        const b = { name: 'b' };
        const expectedModels = [a, b];
        // @ts-ignore
        BlogModel.find.yields(null, expectedModels);
        const req = { params: { } };
        const res = {
            json: sinon.stub()
        };

        const routes = new BlogService()
        routes.getAllExampleItems(req as Request, res as unknown as Response);

        sinon.assert.calledWith(res.json, expectedModels);});
});
