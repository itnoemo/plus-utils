import { dom }  from '../src/index';
import './common/jsdom.js';

// 创建一个div元素
function generateDiv(className = 'c1') {
    const div = document.createElement('div');
    //修改div的属性
    div.className = className;
    //添加到文档对象模型中
    document.body.appendChild(div);
};

test("成功渲染元素", () => {
    generateDiv('s1');
    dom.renderHTML(document.querySelector('.s1'), [{
        tag: 'span',
        text: '简单测试',
        props: {
            class: 'test1'
        }
    }]);
    expect(document.getElementsByClassName('s1').length).toBe(1);
});
