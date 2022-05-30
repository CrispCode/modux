'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'
import './index.scss'

export class DemoComponent extends Component {
  get template () {
    return template
  }

  execute () {
    this.element.innerHTML = 'Demo component'
  }
}
