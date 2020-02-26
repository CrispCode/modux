/* globals MutationObserver, HTMLElement */

'use strict'

import { loop } from './../utils/loop.js'
import { Router } from './router.js'

import { config } from './config.js'
import { databus } from './databus.js'

/**
 * The attribute name used to determine if an HTMLElement is a component
 * @type {String}
 * @private
 */
const _attrComponent = 'data-modux-component'
/**
 * The attribute name used to determine if an HTMLElement ( usually an anchor tag ) is a state change component. This will prevent server reload on anchor tags.
 * @type {String}
 * @private
 */
const _attrLink = 'data-modux-link'

/**
 * A shorthand for the link element handler
 * @param {Event} e
 * @private
 */
const linkHandler = function ( e ) {
  let url = this.getAttribute( 'href' )
  if ( url ) {
    Router.redirect( url )
    e.preventDefault()
  }
}

/**
 * The main class, used to create a Modux module. You can think of this as the main application
 */
export class Module {
  /**
   * A method used to add components to the Module
   * @param {String} name The name under which the Component will be known as
   * @param {Component} dependency The Component to be added
   * @return {Module} The instance of Module
   */
  addDependency ( name, dependency ) {
    this.__dependencies[ name ] = dependency
    return this
  }
  /**
   * A method used to remove components from the Module
   * @param {String} name The name of the Component to be removed
   * @return {Module} The instance of Module
   */
  removeDependency ( name ) {
    if ( this.__dependencies[ name ] ) {
      delete this.__dependencies[ name ]
    }
    return this
  }

  /**
   * Creates an instance of Module
   * @param {String} [name] A unique name for the module, for easier management
   */
  constructor ( name ) {
    /**
     * A unique name for the module, for easier management
     * @type {String}
     * @private
     */
    this.__name = name
    /**
     * Contains all the components added to the module
     * @type {Object}
     * @private
     */
    this.__dependencies = {}
    /**
     * Contains a new instance of Config which is passed on to all components
     * @type {Config}
     * @public
     */
    this.config = config.create()
    /**
     * Contains a new instance of DataBus which is passed on to all components
     * @type {DataBus}
     * @public
     */
    this.databus = databus.create()
  }

  /**
   * Creates a component on an HTMLElement if it doesn't have one already
   * @param {HTMLElement} element The HTMLElement to bind the Component to
   * @param {Component} Component The Component to be bound
   * @private
   */
  __createComponent ( element, Component ) {
    if ( !element.moduxComponent ) {
      element.moduxComponent = new Component( element, this, this.config, this.databus )
      element.moduxComponent.execute()
    }
  }

  /**
   * Removes a component from an HTMLElement if it has one
   * @param {HTMLElement} element The HTMLElement for which we want to remove the Component
   * @private
   */
  __removeComponent ( element ) {
    if ( element.moduxComponent ) {
      element.moduxComponent.__destroy()
    }
  }

  /**
   * Creates a link component on an HTMLElement if it doesn't have one already
   * @param {HTMLElement} element The HTMLElement to bind the link to
   * @private
   */
  __createComponentLink ( element ) {
    if ( !element.moduxLink ) {
      element.addEventListener( 'click', linkHandler )
      element.moduxLink = true
    }
  }
  /**
   * Removes a link component from an HTMLElement if it has one
   * @param {HTMLElement} element The HTMLElement for which we want to remove the link
   * @private
   */
  __removeComponentLink ( element ) {
    if ( element.moduxLink ) {
      element.removeEventListener( 'click', linkHandler )
      delete element.moduxLink
    }
  }

  /**
   * Checks if the current element needs a Component instance
   * @param {HTMLElement} node HTMLElement what we are checking
   * @param {String} attr The attribute to watch out for
   * @param {Function} handler The callback function which will be called after the checks are made
   * @private
   */
  __loopOnElements ( node, attr, handler ) {
    if ( !( node instanceof HTMLElement ) ) {
      return
    }
    let name = node.getAttribute( attr )
    if ( name ) {
      handler( node, name )
    }
    loop( node.querySelectorAll( '*[' + attr + ']' ), ( element ) => {
      handler( element, element.getAttribute( attr ) )
    } )
  }

  /**
   * Initializes the Module on a specific HTMLElement and loads the specified Component for it
   * @param {HTMLElement} element The HTMLElement used as the wrapper for the Module
   * @param {Component} component The Component to be used as the main Component
   */
  bootstrap ( element, component ) {
    /**
     * Holds the MutationObserver which is used to check for changes in the DOM
     */
    this.__htmlWatcher = new MutationObserver( ( mutations ) => {
      mutations.forEach( ( mutation ) => {
        if ( mutation.type === 'attributes' ) {
          if ( mutation.attributeName === _attrComponent ) {
            this.__removeComponent( mutation.target )
            this.__createComponent( mutation.target, this.__dependencies[ mutation.target.getAttribute( _attrComponent ) ] )
          }
          if ( mutation.attributeName === _attrLink ) {
            this.__removeComponentLink( mutation.target )
            this.__createComponentLink( mutation.target )
          }
        }
        if ( mutation.type === 'childList' ) {
          if ( mutation.addedNodes.length > 0 ) {
            // Nodes that were added
            loop( mutation.addedNodes, ( node ) => {
              this.__loopOnElements( node, _attrComponent, ( e, attr ) => {
                if ( this.__dependencies[ attr ] ) {
                  this.__createComponent( e, this.__dependencies[ attr ] )
                }
              } )
              this.__loopOnElements( node, _attrLink, ( e ) => {
                this.__createComponentLink( e )
              } )
            } )
          }
          if ( mutation.removedNodes.length > 0 ) {
            // Nodes that were removed
            loop( mutation.removedNodes, ( node ) => {
              this.__loopOnElements( node, _attrComponent, ( e ) => {
                this.__removeComponent( e )
              } )
              this.__loopOnElements( node, _attrLink, ( e ) => {
                this.__removeComponentLink( e )
              } )
            } )
          }
        }
      } )
    } )
    this.__htmlWatcher.observe( element, { attributes: true, childList: true, characterData: false, subtree: true } )

    if ( !this.__dependencies[ component ] ) {
      throw new Error( 'Initial component cannot be found in dependency list' )
    }
    /**
     * Holds the main Component which is used for the Module.
     */
    this.__component = new this.__dependencies[ component ]( element, this, this.config, this.databus )
    element.moduxComponent = this.__component
    element.moduxComponent.execute()
  }

  /**
   * Destroy the current module. This will also destroy all the components created and disconnect the MutationObserver
   */
  destroy () {
    this.__component.__destroy()
    this.__htmlWatcher.disconnect()
  }
}
