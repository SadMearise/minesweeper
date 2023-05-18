export default class BaseComponent {
  constructor({
    tagName = 'div', classNames = [], textContent = '', attributes = {}, parentNode,
  }) {
    this.node = undefined;
    this.node = document.createElement(tagName.toLowerCase());
    this.node.classList.add(...classNames);
    this.node.textContent = textContent;

    const keys = Object.keys(attributes);
    for (let i = 0; i < keys.length; i += 1) {
      this.node.setAttribute(keys[i], attributes[keys[i]]);
    }

    if (parentNode) {
      parentNode.append(this.node);
    }
  }

  append(child) {
    this.node.append(child.getNode());
  }

  appendChildren(children) {
    children.forEach((el) => {
      this.append(el);
    });
  }

  getNode() {
    return this.node;
  }

  addClass(className) {
    this.node.classList.add(className);
  }

  removeClass(className) {
    this.node.classList.remove(className);
  }

  destroy() {
    this.node.remove();
  }
}
