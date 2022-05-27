/* globals document, Audio */

'use strict'

import { loop } from './loop.js'

/**
 * An audio wrapper
 */
class Sound {
  /**
   * Creates a Sound instance
   * @param {Audio} audio The Audio element to wrap
   */
  constructor ( audio ) {
    /**
     * The Audio element
     * @type {Audio}
     * @private
     */
    this.__audio = audio
    /**
     * Determines if audio is enabled
     * @type {Boolean=false}
     * @private
     */
    this.__enabled = false
    /**
     * Determines if the audio should loop infinitly
     * @type {Boolean=false}
     * @private
     */
    this.__looped = false

    audio.addEventListener( 'ended', () => {
      audio.currentTime = 0
      if ( this.__looped ) {
        audio.play()
      }
    } )
  }

  /**
   * Sets the Sound to enabled or disabled
   * @param {Boolean} enabled If true the Sound class will be enabled
   */
  enabled ( enabled ) {
    this.__enabled = enabled
  }

  /**
   * Sets the volume of the Sound instance
   * @param {Number} volume
   */
  volume ( volume ) {
    this.__audio.volume = volume
  }

  /**
   * Play the Sound instance
   * @return {Promise} The promise is resolved once the Sound is played
   */
  play () {
    if ( !this.__enabled ) {
      return Promise.resolve()
    }

    let result = this.__audio.play()

    // Old browsers don't return a promise for play(), so we create one
    if ( !( result instanceof Promise ) ) {
      return Promise.resolve()
    }

    return result
  }

  /**
   * Pause the Sound instance
   * @return {Promise} The promise is resolved once the Sound is paused
   */
  pause () {
    if ( !this.__audio.paused ) {
      this.__audio.pause()
    }
    return Promise.resolve()
  }

  /**
   * Sets the Sound to muted or unmuted
   * @param {Boolean} mute If true the Sound class will be muted
   */
  mute ( mute ) {
    this.__audio.muted = mute
  }

  /**
   * Sets the Sound to looped or single play
   * @param {Boolean} looped If true the Sound class will be looped infinitely
   */
  loop ( looped ) {
    this.__looped = looped
  }
}

/**
 * A class containing multiple Sound instances
 */
class Sounds {
  /**
   * Create an instance of Sounds
   */
  constructor () {
    /**
     * Holds the Sound instances
     * @type {Object}
     * @private
     */
    this.__collection = {}
    /**
     * Determines if the Sounds are enabled
     * @type {Boolean=false}
     * @private
     */
    this.__enabled = false
  }

  /**
   * Returns a new instance of Sounds
   * @return {Sounds} The newly created Sounds instance
   */
  create () {
    return new Sounds()
  }

  /**
   * Initializes the Sounds class. This is needed to enable Audio on some devices
   * @return {Promise} The promise is resolved once audio is available
   */
  init () {
    return new Promise( ( resolve, reject ) => {
      let audio = new Audio( 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV' )

      let result = audio.play()
      if ( !( result instanceof Promise ) ) {
        resolve( false )
        return
      }

      let unlock = () => {
        audio.play()
          .then( () => {
            document.body.removeEventListener( 'click', unlock )
            // Enabled
            this.enable( true )
            resolve( this )
          } )
          .catch( ( reason ) => {
            reject( reason )
          } )
      }

      result
        .then( () => {
          // Enabled
          this.enable( true )
          resolve( this )
        } )
        .catch( () => {
          document.body.addEventListener( 'click', unlock, false )
          // Disabled
          this.enable( false )
        } )
    } )
  }

  /**
   * Sets the Sounds class to enabled or disabled
   * @param {Boolean} enable If true the Sound instances will be enabled
   */
  enable ( enable ) {
    this.__enabled = enable

    loop( this.__collection, ( sound ) => {
      sound.enabled( enable )
    } )
  }

  /**
   * Sets the Sounds class to muted or unmuted
   * @param {Boolean} mute If true the Sound instances will be muted
   */
  mute ( mute ) {
    loop( this.__collection, ( sound ) => {
      sound.mute( mute )
    } )
  }

  /**
   * Adds a Sound instance to the Sounds
   * @param {String} name An identifer to represent the Audio added
   * @param {Audio|String} audio An Audio instance or an url to an audio file
   * @return {Sound} Returns the Sound instance
   */
  add ( name, audio ) {
    if ( typeof audio === 'string' ) {
      audio = new Audio( audio )
    }
    this.__collection[ name ] = new Sound( audio )
    this.__collection[ name ].enabled( this.__enabled )
    return this.__collection[ name ]
  }

  /**
   * Remove a Sound instance from the Sounds
   * @param {String} name An identifer to represent the Audio to be removed
   */
  remove ( name ) {
    if ( this.__collection[name] ) {
      this.__collection[ name ].enabled( false )
      this.__collection[ name ].pause()
        .then( () => {
          delete this.__collection[ name ]
        } )
    }
  }

  /**
   * Returns a specific Sound instance
   * @param {String} name The Sound identifier
   * @return {Sound} The Sound which is represented by the identifier
   */
  get ( name ) {
    return this.__collection[ name ]
  }
}

/**
 * Returns a singleton of the Sounds
 */
export let sounds = new Sounds()

