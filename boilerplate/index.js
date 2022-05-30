'use strict'

const path = require( 'path' )
const fs = require( 'fs' )

const commands = require( './commands.js' )

const File = require( './../utils/File.js' )
const getDirectories = require( './../utils/getDirectories.js' )

const Output = require( './../utils/Output.js' )

const execute = ( templatePackage, template, action ) => {
  let templateDirectory = path.dirname( require.resolve( templatePackage ) )

  // Get template directory
  return File.get( templateDirectory ).exists()
    .then( ( file ) => {
      if ( !file.isDirectory() ) {
        throw new Error( 'Unable to resolve template path' )
      }
    } )
    .then( () => {
      // Get configuration for template
      let config = require( templatePackage )
      if ( !config ) {
        throw new Error( 'Unable to locate configuration file for template ' + template )
      }

      if ( !action ) {
        Output.write( fs.readFileSync( templateDirectory + path.sep + 'help.txt', 'utf8' ) )
        return
      }

      if ( !config[ action ] ) {
        throw new Error( 'Invalid action ' + action + ' for template ' + template )
      }

      // Show template intro
      Output.write( fs.readFileSync( templateDirectory + path.sep + 'intro.txt', 'utf8' ) )

      let steps = config[ action ]

      // Execute steps
      Output.info( 'Executing action ' + action )

      const command = ( i ) => {
        Output.log( 'Running step ' + ( i + 1 ) + ' : ' + steps[ i ].description )
        return commands[ steps[ i ].action ]( steps[ i ].options )
          .then( () => {
            i = i + 1
            if ( i < steps.length ) {
              return command( i )
            }
          } )
      }

      return command( 0 )
        .then( () => {
          Output.info( '>> Environment succesfully created. <<' )
        } )
    } )
}

module.exports = ( template, command ) => {
  return getDirectories( __dirname + path.sep + 'templates' )
    .then( ( list ) => {
      // Check the command line arguments
      if ( list.includes( template ) ) {
        return execute( __dirname + path.sep + 'templates' + path.sep + template, template, command )
      } else if ( template === 'list' ) {
        Output.info( 'Avilable templates: ' )
        Output.write( ' - ' + list.join( ',\n - ' ) )
      } else {
        // Check external sources
        try {
          let moduleContent = require( template )
          if ( moduleContent ) {
            return execute( require.resolve( template ), template, command )
          }
        } catch ( err ) {}

        // Fallback
        return File.get( __dirname + path.sep + 'help.txt' ).exists()
          .then( ( file ) => {
            return file.read()
          } )
          .then( ( data ) => {
            Output.write( data )
          } )
      }
    } )
    .catch( ( err ) => {
      Output.error( err )
    } )
}
