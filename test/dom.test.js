import { math }  from '../src/index';
import './common/jsdom.js';

test("16开平方根等于4", () => {
    expect(math.sqrt(16)).toBe(4);
});
