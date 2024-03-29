'use strict'

const fs = require( 'fs' )
const readline = require( 'readline' )
const childProcess = require( 'child_process' )

/**
 * Variables Class
 * @this {Variables}
 * @private
 */
const Variables = require( './Variables.js' )
const variables = new Variables()

/**
 * Output Class
 * @type {Output}
 * @private
 */
const Output = require( './../utils/Output.js' )

/**
 * File Class
 * @type {File}
 * @private
 */
const File = require( './../utils/File.js' )

module.exports = {
  /**
    action: 'mkdir'
    options: ( variables ) => {
      return {
        name: string
      }
    }
   */
  'mkdir': ( options ) => {
    return new Promise( ( resolve, reject ) => {
      let config = options( variables )
      fs.mkdir( config.name, { recursive: true }, ( err ) => {
        if ( err ) {
          reject( err )
          return
        }
        resolve()
      } )
    } )
  },
  /**
    action: 'input'
    options: ( variables ) => {
      return {
        questions: [
          {
            name: string,
            question: string
          }
        ]
      }
    }
   */
  'input': ( options ) => {
    const input = readline.createInterface( {
      input: process.stdin,
      output: process.stdout
    } )

    let config = options( variables )

    const ask = ( i ) => {
      let question = config.questions[ i ]
      return new Promise( ( resolve ) => {
        input.question( question.question, ( answer ) => {
          variables.set( question.name, answer )
          resolve()
        } )
      } )
        .then( () => {
          i = i + 1
          if ( i < config.questions.length ) {
            return ask( i )
          }
        } )
    }

    return ask( 0 )
      .then( () => {
        input.close()
      } )
  },
  /**
    action: 'output',
    options: ( variables ) => {
      return {
        text: string Text
      }
    }
  */
  'output': ( options ) => {
    let config = options( variables )
    Output.log( config.text )
    return Promise.resolve()
  },
  /**
    action: 'copy'
    options: ( variables ) => {
      return {
        source: string,
        destination: string
      }
    }
   */
  'copy': ( options ) => {
    let config = options( variables )
    return File.get( config.source ).exists()
      .then( ( file ) => {
        return file.copy( config.destination )
      } )
  },
  /**
    action: 'rename'
    options: ( variables ) => {
      return {
        files: [{
            from: string,
            to: string
        }]
      }
    }
   */
  'rename': function ( options ) {
    let config = options( variables )
    let actions = []
    for ( var i = 0; i < config.files.length; i++ ) {
      let data = config.files[ i ]
      let action = File.get( data.from ).exists()
        .then( ( file ) => {
          return file.rename( data.to )
        } )
      actions.push( action )
    }
    return Promise.all( actions )
  },
  /**
    action: 'parameters'
    options: ( variables ) => {
      return {
        files: [ array of strings ]
        keywords: {
            string Key: string Value
        }
      }
    }
   */
  'parameters': function ( options ) {
    let config = options( variables )
    let actions = []
    for ( var i = 0; i < config.files.length; i++ ) {
      let action = File.get( config.files[ i ] ).exists()
        .then( ( file ) => {
          return file.read()
            .then( ( data ) => {
              let params = Object.assign( config.keywords, variables.get() )
              for ( let key in params ) {
                if ( params.hasOwnProperty( key ) ) {
                  data = data.replace( new RegExp( '<<%\\s*?' + key + '\\s*?%>>', 'gi' ), params[ key ] )
                }
              }
              return file.write( data )
            } )
        } )
      actions.push( action )
    }
    return Promise.all( actions )
  },
  /**
    action: 'run'
    options: ( variables ) => {
      return {
        command: string
      }
    }
   */
  'run': function ( options ) {
    let config = options( variables )
    return new Promise( ( resolve, reject ) => {
      let ps = childProcess.exec( config.command )
      ps.stdout.pipe( process.stdout )
      ps.stderr.pipe( process.stderr )
      ps.on( 'close', ( code ) => {
        if ( code ) {
          reject( code )
          return
        }
        resolve()
      } )
    } )
  }
}
