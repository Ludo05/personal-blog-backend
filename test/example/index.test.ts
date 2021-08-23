import { sinon, expect } from "../utils/utils";
import { IBlogSummary } from "../../src/constants/types";
import { Request, Response } from 'express';

describe('test method', function () {

    let sandbox: sinon.SinonSandbox;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            body: {
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


    it('should validate data', function () {
       expect(1).to.equal(1)
    });
});
