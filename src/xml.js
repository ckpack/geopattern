export function XMLNode(tagName) {
  if (!(this instanceof XMLNode)) {
    return new XMLNode(tagName)
  }

  this.tagName = tagName
  this.attributes = Object.create(null)
  this.children = []
  this.lastChild = null

  return this
};

XMLNode.prototype.appendChild = function (child) {
  this.children.push(child)
  this.lastChild = child

  return this
}

XMLNode.prototype.setAttribute = function (name, value) {
  this.attributes[name] = value

  return this
}

XMLNode.prototype.toString = function () {
  const self = this

  return [
    '<',
    self.tagName,
    Object.keys(self.attributes).map((attr) => {
      return [
        ' ',
        attr,
        '="',
        self.attributes[attr],
        '"',
      ].join('')
    }).join(''),
    '>',
    self.children.map((child) => {
      return child.toString()
    }).join(''),
    '</',
    self.tagName,
    '>',
  ].join('')
}
