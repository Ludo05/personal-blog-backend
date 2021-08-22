import { sinon, expect } from "../../src/util/utils";
import { IBlogSummary } from "../../src/constants/types";
import { BlogService } from "../../src/services/BlogService";
import { Request, Response } from 'express';

describe('test method', function () {

    let sandbox: sinon.SinonSandbox;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            body: {
                title: 'test',
                summary: 'summary test'
            } as Partial<IBlogSummary>,
        } as Partial<Request>;

        res = {
            render: sandbox.stub(),
            send: sandbox.stub(),
            redirect: sinon.spy(),
            json: sinon.spy()
        } as Partial<Response>;

    });

    afterEach(() => {
        sandbox.restore();
    });


    it('should do test', function () {
        const blog: BlogService = new BlogService();
        blog.addNewExampleItem(req as Request, res as Response)
        expect(1).to.be.equal(1)
    });
});
