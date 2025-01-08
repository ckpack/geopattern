import { XMLNode } from './xml.js'

export function SVG() {
  this.width = 100
  this.height = 100
  this.svg = new XMLNode('svg')
  this.context = [] // Track nested nodes
  this.setAttributes(this.svg, {
    xmlns: 'http://www.w3.org/2000/svg',
    width: this.width,
    height: this.height,
  })

  return this
}

// This is a hack so groups work.
SVG.prototype.currentContext = function () {
  return this.context[this.context.length - 1] || this.svg
}

// This is a hack so groups work.
SVG.prototype.end = function () {
  this.context.pop()
  return this
}

SVG.prototype.currentNode = function () {
  const context = this.currentContext()
  return context.lastChild || context
}

SVG.prototype.transform = function (transformations) {
  this.currentNode().setAttribute('transform', Object.keys(transformations).map((transformation) => {
    return `${transformation}(${transformations[transformation].join(',')})`
  }).join(' '))
  return this
}

SVG.prototype.setAttributes = function (el, attrs) {
  Object.keys(attrs).forEach((attr) => {
    el.setAttribute(attr, attrs[attr])
  })
}

SVG.prototype.setWidth = function (width) {
  this.svg.setAttribute('width', Math.floor(width))
}

SVG.prototype.setHeight = function (height) {
  this.svg.setAttribute('height', Math.floor(height))
}

SVG.prototype.toString = function () {
  return this.svg.toString()
}

SVG.prototype.rect = function (x, y, width, height, args) {
  // Accept array first argument
  const self = this
  if (Array.isArray(x)) {
    x.forEach((a) => {
      self.rect(a.concat(args))
    })
    return this
  }

  const rect = new XMLNode('rect')
  this.currentContext().appendChild(rect)
  this.setAttributes(rect, Object.assign({
    x,
    y,
    width,
    height,
  }, args))

  return this
}

SVG.prototype.circle = function (cx, cy, r, args) {
  const circle = new XMLNode('circle')
  this.currentContext().appendChild(circle)
  this.setAttributes(circle, Object.assign({
    cx,
    cy,
    r,
  }, args))

  return this
}

SVG.prototype.path = function (str, args) {
  const path = new XMLNode('path')
  this.currentContext().appendChild(path)
  this.setAttributes(path, Object.assign({
    d: str,
  }, args))

  return this
}

SVG.prototype.polyline = function (str, args) {
  // Accept array first argument
  const self = this
  if (Array.isArray(str)) {
    str.forEach((s) => {
      self.polyline(s, args)
    })
    return this
  }

  const polyline = new XMLNode('polyline')
  this.currentContext().appendChild(polyline)
  this.setAttributes(polyline, Object.assign({
    points: str,
  }, args))

  return this
}

// group and context are hacks
SVG.prototype.group = function (args) {
  const group = new XMLNode('g')
  this.currentContext().appendChild(group)
  this.context.push(group)
  this.setAttributes(group, Object.assign({}, args))
  return this
}
