type Props = {
    [key: string]: string;
}

export interface DomDataItem {
    tag: string;
    text?: string;
    props?: Props;
    children?: Array<DomDataItem>;
}
/**
* 属性挂在元素
* @param {*} elementData: {tag: 'div', text: 'hello', props: {id: 'test'}, children: []}
* @returns 创建的节点
*/
function getMountPropsElement(elementData: DomDataItem) {
    const {tag = '', props = {}} = elementData;
    const tagLower = tag.toLowerCase();
    const currNode = document.createElement(tagLower);
    // 属性
    const propKeys = Object.keys(props);
    // 若有属性
    if (propKeys.length !== 0) {
      propKeys.forEach(key => {
        currNode.setAttribute(key, props[key]);
      });
    }
    return {element: currNode, tagName: tagLower};
};
/**
* 渲染html dom元素
* @remark
	防止xss安全风险替换innerHTML关键字
  @category dom
* @param {*} domCtn: 挂载的容器 
* @param {*} data: [{tag: 'p', text: 'hello', props: {id: 'test'}, children: []}]
* @returns 无
* @example
*
* import { dom } from 'plus-utils';
* dom.renderHTML(body, [{tag: 'p', text: 'hello', props: {id: 'test'}, children: []}]);
* // => body下插入一个文本为hello, 属性id为test的p标签
*/
export default function (domCtn: any = null, data: Array<DomDataItem> = []) {
	// dom节点是否有效
	if (!domCtn) {
		console.error('renderHTML params domCtn is required');
		return;
	}
	// data参数是否是对象类型
	if (!(data instanceof Array)) {
		console.error('renderHTML params data必须是数组类型');
		return;
	}
	// data为空则清除dom元素值
	if (data.length === 0) {
		// 子节点
		const childNodes = domCtn.childNodes;
		(childNodes || []).forEach((node: any) => {
			domCtn.removeChild(node);
		});
		return;
	}

	// deep循环
	const deepDomData = (dDom: any = null, dData: DomDataItem = {
        tag: '',
        text: '',
        props: {}
    }) => {
		const {
			tag = '',
			children = [],
			text = ''
		} = dData;
		// 是否元素类型
		const isElementType = tag === '';
		// 是否文本类型
		const isTextType = text === '';
		// 非节点 && 非文本
		if (!isElementType && !isTextType) {
			return;
		}
		// 节点类型
		if (!isTextType) {
			// 若文本中有标签时需要转化
			const textNode = document.createTextNode(text);
			dDom.appendChild(textNode);
		} else {
			// 元素类型
			const {element: currNode, tagName} = getMountPropsElement(dData);
			// 子节点
			(children || []).forEach(node => {
				deepDomData(currNode, node);
			});
			// script标签的话则用code包裹
			if (tagName === 'script') {
				const codeNode = document.createElement('code');
				codeNode.textContent = '<script>' + currNode.textContent + '<\/script>';
				dDom.appendChild(codeNode);
			} else {
				// 直接插入
				dDom.appendChild(currNode);
			}
		}
	};
	// 调用
	data.forEach(dataVal => {
		deepDomData(domCtn, dataVal);
	});
};