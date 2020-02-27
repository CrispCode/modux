'use strict'

import { Router } from './libs/router.js'

import { Communication } from './libs/communication'
import { Component } from './libs/component'
import { Module } from './libs/module.js'

import { approx } from './utils/approx.js'
import { Cookie } from './utils/cookie.js'
import { DateTime } from './utils/datetime.js'
import { Device } from './utils/device.js'
import { extend } from './utils/extend.js'
import { Font } from './utils/font.js'
import { html } from './utils/html.js'
import { isNumber } from './utils/isnumber.js'
import { isObject } from './utils/isobject.js'
import { loader } from './utils/loader.js'
import { logger } from './utils/logger.js'
import { loop } from './utils/loop.js'
import { radians } from './utils/radians.js'
import { rnd } from './utils/rnd.js'
import { scroll } from './utils/scroll.js'
import { sounds } from './utils/sounds.js'
import { uid } from './utils/uid.js'

export {
  Router,

  Communication,
  Component,
  Module,

  approx, Cookie, DateTime, Device, extend, Font, html, isNumber, isObject, loader, logger, loop, radians, rnd, scroll, sounds, uid
}
