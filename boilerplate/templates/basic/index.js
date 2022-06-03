'use strict'

const path = require( 'path' )

module.exports = {
  'create': [
    {
      'description': 'Gather project information',
      'action': 'input',
      'options': () => {
        return {
          'questions': [
            {
              'name': 'name',
              'question': 'Enter project name: '
            }
          ]
        }
      }
    },
    {
      'description': 'Create the project folder',
      'action': 'mkdir',
      'options': ( parameters ) => {
        return {
          'name': parameters.get( 'name' )
        }
      }
    },
    {
      'description': 'Generate project files',
      'action': 'copy',
      'options': ( parameters ) => {
        return {
          'source': __dirname + path.sep + 'src',
          'destination': path.resolve( './' ) + path.sep + parameters.get( 'name' )
        }
      }
    },
    {
      'description': 'Rename parameterized files',
      'action': 'rename',
      'options': ( parameters ) => {
        return {
          files: [
            {
              from: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + '_.gitignore',
              to: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + '.gitignore'
            },
            {
              from: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + '_package.json',
              to: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + 'package.json'
            }
          ]
        }
      }
    },
    {
      'description': 'Replace variables with values',
      'action': 'parameters',
      'options': ( parameters ) => {
        return {
          'files': [
            path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + 'readme.md',
            path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + 'package.json',
            path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + 'app.html'
          ],
          'keywords': {}
        }
      }
    },
    {
      'description': 'Run `npm install` in the newly created project',
      'action': 'run',
      'options': ( parameters ) => {
        return {
          command: 'cd ' + parameters.get( 'name' ) + ' && npm install'
        }
      }
    }
  ]
}
