'use strict'

import { html } from './../utils/html.js'
import { uid } from './../utils/uid.js'
import { Router } from './router.js'

/**
 * This class is used to create web components
 */
export class Component {
  /**
   * The html string that becomes the view for this component
   */
  get template () {
    return ''
  }

  /**
   * The method gets called whenever the state changes
   * @param {String} url The current url
   */
  onStateChange ( url ) {}

  /**
   * The method gets called when the component gets created in the page. It is the main method of the class
   */
  execute () {}

  /**
   * The method gets called when the component calls destroy(). It can be used to remove handlers or clear timeouts
   */
  terminate () {}

  /**
   * Creates an instance of Component
   * @param {HTMLElement} parent The parent wrapper
   * @param {Module} module The parent module instance
   * @param {Store} store An instance of @crispcode/pushstore, see https://www.npmjs.com/package/@crispcode/pushstore
   */
  constructor ( parent, module, store ) {
    /**
     * A unique identifier
     * @type {String}
     * @public
     */
    this.uid = uid()

    /**
     * The parent wrapper
     * @type {HTMLElement}
     * @public
     */
    this.parent = parent

    /**
     * The parent module instance
     * @type {Module}
     * @public
     */
    this.module = module
    /**
     * The pushstore instance of the module parent
     * @type {Store}
     * @public
     */
    this.store = store

    /**
     * The component view
     * @type {HTMLElement}
     * @public
     */
    this.element = html( this.template )

    // Append element to the dom
    this.parent.appendChild( this.element )

    /**
     * The __stateWatcher is a handler for the router, it gets destroyed when the component gets destroyed
     * @type {String}
     * @private
     */
    this.__stateWatcher = Router.onStateChange( ( url ) => {
      this.onStateChange( url )
    } )
  }

  /**
   * The method gets called when the component is destroyed
   * @private
   */
  __destroy () {
    this.__stateWatcher()
    this.terminate()
    try {
      this.element.remove()
    } catch ( e ) {}
    delete this.parent.moduxComponent
  }
}
