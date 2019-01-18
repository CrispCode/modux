'use strict'

import { loader } from './../../../../scripts'

import { Index as Base } from './index.js'

export class LoaderTest extends Base {
  get name () {
    return 'Loader'
  }

  get features () {
    return [
      {
        description: 'Preload images',
        result: () => {
          return loader.preload( [
            { url: '/img1.png', type: 'image' },
            { url: '/img2.png', type: 'image' }
          ] )
            .then( () => {
              return Promise.resolve( '2 images preloaded.' )
            } )
        }
      },
      {
        description: 'Preload sounds',
        result: () => {
          return loader.preload( [
            { url: '/cheer_large.wav', type: 'audio' }
          ] )
            .then( () => {
              return Promise.resolve( '1 sound preloaded.' )
            } )
        }
      },
      {
        description: 'Preload file',
        result: () => {
          return loader.preload( [
            { url: '/cheer_large.wav', type: 'file' }
          ] )
            .then( () => {
              return Promise.resolve( '1 file preloaded.' )
            } )
        }
      }
    ]
  }
}
