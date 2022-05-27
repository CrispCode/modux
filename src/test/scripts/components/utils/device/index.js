'use strict'

import { Device } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>device</b> - A static class used to get information about the device' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'Device.type()',
        () => Promise.resolve( Device.type() ),
        () => Promise.resolve( Device.type() )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'Device.isDesktop()',
        () => Promise.resolve( Device.isDesktop() ),
        () => Promise.resolve( Device.isDesktop() )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'Device.isMobile()',
        () => Promise.resolve( Device.isMobile() ),
        () => Promise.resolve( Device.isMobile() )
      )
    )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
  }
}
