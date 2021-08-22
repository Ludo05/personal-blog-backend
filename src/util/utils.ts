import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiString from 'chai-string';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiString);

const expect = chai.expect;

export {
    expect,
    sinon,
};
