'use strict'

import { Component, loop } from './../../../../scripts'

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

    let module = this.element.querySelector( '.module' )

    this.store.get( 'app' ).addDependency( name, dependencies[ name ] )
    module.innerHTML = '<section data-modux-component="' + name + '"></section>'
    setTimeout( () => {
      this.store.get( 'app' ).removeDependency( name )
    } )
  }

  onStateChange ( url ) {
    let urlData = url.split( '#' )

    // Update active menu
    loop( this.element.querySelectorAll( 'nav .menu-item' ), ( item ) => {
      if ( urlData[ 0 ] === item.getAttribute( 'href' ) ) {
        item.classList.add( 'active' )
      } else {
        item.classList.remove( 'active' )
      }

      if ( urlData[ 1 ] === 'menu' ) {
        this.element.classList.add( 'menu-open' )
      } else {
        this.element.classList.remove( 'menu-open' )
      }
    } )
    this.loadComponent( urlData[ 0 ].substr( 1 ) )
  }
}
