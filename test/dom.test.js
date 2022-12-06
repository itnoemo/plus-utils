import {dom}  from '../src/index';
import './common/jsdom.js';

test("成功渲染元素", () => {
    dom.renderHTML(document.body, [{
        tag: 'h1',
        props: {
            id: 'test1'
        }
    }]);
    expect(document.getElementById('test1')).not.toBe(null);
});
