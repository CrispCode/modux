'use strict'

import { Component, loop, html } from './../../../../scripts'

import Approx from './../utils/approx'
import Cookie from './../utils/cookie'
import DateTime from './../utils/datetime'
import Device from './../utils/device'
import Extend from './../utils/extend'
import Font from './../utils/font'
import Html from './../utils/html'
import Isnumber from './../utils/isnumber'
import Isobject from './../utils/isobject'
import Loader from './../utils/loader'
import Logger from './../utils/logger'
import Loop from './../utils/loop'
import Radians from './../utils/radians'
import Rnd from './../utils/rnd'
import Scroll from './../utils/scroll'
import Sounds from './../utils/sounds'
import Uid from './../utils/uid'

const dependencies = {
  approx: Approx,
  cookie: Cookie,
  datetime: DateTime,
  device: Device,
  extend: Extend,
  font: Font,
  html: Html,
  isnumber: Isnumber,
  isobject: Isobject,
  loader: Loader,
  logger: Logger,
  loop: Loop,
  radians: Radians,
  rnd: Rnd,
  scroll: Scroll,
  sounds: Sounds,
  uid: Uid
}

const template = require( './template.html' )

export class Layout extends Component {
  get template () {
    return template
  }

  loadComponent ( name ) {
    if ( !dependencies[ name ] ) {
      return
    }

    let element = html( '<section data-modux-component="' + name + '"></section>' )

    this.module.addDependency( name, dependencies[ name ] )
    this.module.createComponent( element )

    let module = this.element.querySelector( '.module' )
    module.innerHTML = ''
    module.appendChild( element )

    setTimeout( () => {
      this.module.removeDependency( name )
    } )
  }

  onStateChange ( url ) {
    url = new URL( url )

    // Update active menu
    loop( this.element.querySelectorAll( 'nav .menu-item' ), ( item ) => {
      if ( url.pathname === item.getAttribute( 'href' ) ) {
        item.classList.add( 'active' )
      } else {
        item.classList.remove( 'active' )
      }

      if ( url.hash === '#menu' ) {
        this.element.classList.add( 'menu-open' )
      } else {
        this.element.classList.remove( 'menu-open' )
      }
    } )

    this.loadComponent( url.pathname.substr( 1 ) )
  }
}
