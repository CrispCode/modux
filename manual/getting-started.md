# Getting started

## Understanding modux architecture

```

-- Module -------- [ PushStore ] ------------------
|                   /         \                   |
|                  /           \                  |
|                 /             \                 |
|   -------------------     -------------------   |
|   |   Component 1   |     |   Component 2   |   |
|   -------------------     -------------------   |
---------------------------------------------------

```


### What is a Component ?
 - Everything in the modux architecture revolves around components.
 - A component is defined by extending the Component class.
 - You can think of it as a controller for an html tag.
 - The component is initialized as soon as the html tag for it is appended to the application.

### What is a Module ?
 - A module is what brings all components together. When we say application, we generally refer to the module and its components. But in reality an application can be created from multiple modules.
 - You can think of a module as a super component.
 - Modules are bound to an existing view by the user.
 - Once a module has been bound, any activity on its view's children will be monitored, and components will be created / modified / destroyed when changes occur in the DOM.

 ### What is a PushStore ?
 - See [@crispcode/pushstore](https://www.npmjs.com/package/@crispcode/pushstore)
 - We use the pushstore as a way of comunicating information between components.
 - An instance of PushStore is created when the module is created, and it is then shared with all its defined components.
 - It works in a similar way to events, but with the added bonus of not being dependent on the race between emitters and listeners.
 - The PushStore instance is also used as a way of storing information for all components of a module.
 - Any data stored by any component or the module itself can be accessed by any other component or the module itself.



## Building your first component

 Lets create a component called ```header```. For this we will create a folder called ```header``` in our application folder, under the ```components``` folder. ( Note the folder structure of the application is not mandatory, we are just using this structure for visibility ). Here we will add 1 js file, 1 scss file and 1 html file.

```
/application
    /components
        /header
            index.js
            style.scss
            template.html
```

 The contents of ```index.js``` will look something like this:

```js

    import { Component } from '@crispcode/modux'
    
    // We are loading the html file as string ( handled by the default webpack configuration of modux )
    import template from './template.html'

     // We are loading the style sheet for this component ( handled by the default webpack configuration of modux )
    import './style.scss'

    export class ComponentHeader extends Component {
        get template () { 
            // The template getter should return a string that can be converted to HTML.
            // NOTE: The string must have 1 wrapping element. See in template.html
            return template
        }

        // The execute() method is the component constructor.
        // This will be called when an instance of the ComponentHeader needs to be created.
        execute () {

            // this.element will always have the result of this.template converted to html, for easy access to the view
            this.element.querySelector('h1').innerHTML = 'Hello World!'
        }

    }

```

 The contents of ```template.html``` can look something like this:

 ```html
    <!-- 
        Remember that templates need to have a wrapping element.
        In this case it's div[class="component-header"] tag
    -->
    <div class="component-header">
        <h1> This text will be replaced when the component is created </h1>
        <span> This is some static html stuff that we don't really focus on right now.</span>
    </div>
 ```

The contents of ```style.scss``` can look something like this:

```css
    .component-header {
        background-color: #000000;

        h1 {
            color: #ffffff;
        }
    }
```

 That's it! You have now created your fist component.



 ## Building your first application

 Now that we know how to create a component, lets see how it will all come together in a simple application.

 First, lets create our folder structure:

```
/application
    /public
        - any file added here will be copied as is by webpack
    /components
        /header
            index.js
            style.scss
            template.html
        /footer
            index.js
            style.scss
            template.html
        /layout
            index.js
            template.html
    app.js
    app.scss
    app.html
```

 Once the folder structure is complete, lets install modux, by running this command in the folder root: ```npm install @crispcode/modux --save-dev```.
 Now that we have modux in our project, we can focus on creating the base html page. Which is defined in ```app.html```. The entry files are all controlled by the default webpack configuration for modux, so we don't need to worry about that.

 The contents of ```app.html``` can look something like this: 
```html
    <html>

        <head>
            <title> My application <title>
            
            <!-- We add this as recommended by modux to polyfill unsupported js functionality in certain browsers -->
            <script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default%2CMutationObserver%2CString.prototype.padStart%2Cconsole.info"></script>    
        
            <!-- This will be the file that webpack will output containing all our style sheets -->
            <link rel="stylesheet" href="app.min.css" />

        </head>
        
        <body>
            <!-- We will use this tag to create our application -->
            <div class="content"></div>

            <!-- This will be the file that webpack will output containing all our code -->
            <script src="app.min.js"></script>
        </body>

    </html>
```

 Now that we have an html entry, lets create the 2 components:

 1. First we create the header component, similar to how we did it above

    The contents of ``` /application/components/header/template.html```
    ```html
        <!-- 
            Remember that templates need to have a wrapping element.
            In this case it's div[class="component-header"] tag
        -->
        <div class="component-header">
            <h1> This text will be replaced when the component is created </h1>
        </div>
    ```

    The contents of ``` /application/components/header/index.css```
    ```css
        .component-header {
            background-color: #000000;

            h1 {
                color: #ffffff;
            }
        }
    ```

    The contents of ``` /application/components/header/index.js```
    ```js

        import { Component } from '@crispcode/modux'
        
        // We are loading the html file as string ( handled by the default webpack configuration of modux )
        import template from './template.html'

        // We are loading the style sheet for this component ( handled by the default webpack configuration of modux )
        import './style.scss'

        export class ComponentHeader extends Component {
            get template () { 
                // The template getter should return a string that can be converted to HTML.
                // NOTE: The string must have 1 wrapping element. See in template.html
                return template
            }

            // The execute() method is the component constructor.
            // This will be called when an instance of the ComponentHeader needs to be created.
            execute () {

                // this.element will always have the result of this.template converted to html, for easy access to the view
                // We will update the message in H1 based on our configuration
                this.element.querySelector('h1').innerHTML = this.store.get('message-header')
            }

        }

    ```

 2. Then we create the footer component, similar to the header

    The contents of ``` /application/components/footer/template.html```
    ```html
        <!-- 
            Remember that templates need to have a wrapping element.
            In this case it's div[class="component-footer"] tag
        -->
        <div class="component-footer">
            <span class="copyright"> This text will be replaced when the component is created </span>
        </div>
    ```

    The contents of ``` /application/components/footer/index.css```
    ```css
        .component-footer {
            background-color: #000000;

            .copyright {
                color: #ffffff;
            }
        }
    ```

    The contents of ``` /application/components/footer/index.js```
    ```js

        import { Component } from '@crispcode/modux'
        
        // We are loading the html file as string ( handled by the default webpack configuration of modux )
        import template from './template.html'

        // We are loading the style sheet for this component ( handled by the default webpack configuration of modux )
        import './style.scss'

        export class ComponentFooter extends Component {
            get template () { 
                return template
            }

            execute () {
                this.element.querySelector('.copyright').innerHTML = this.store.get('copyright')
            }

        }

    ```

 We have now the two components, but let's group them under one parent component. This will be the layout component and we will skip the styles for it.

 The contents of ``` /application/components/layout/template.html```
 ```html
    <div class="component-layout">
        <!-- 
            This is how we define the position of a component in a page.
            As soon as an element with the attribute data-modux-component is found,
            the application will create an instance of that component ( if defined in its dependency ),
            and insert it's template as a child of that parent element.
        -->
        <section data-modux-component="header"></section>
        <section data-modux-component="footer"></section>
    </div>
 ```

 The contents of ``` /application/components/layout/index.js```
```js

    import { Component } from '@crispcode/modux'
    
    import template from './template.html'

    // We don't really want this component to do anything aside from holding the other two components
    export class ComponentLayout extends Component {
        get template () { 
            return template
        }
    }

```

 Now lets bind it all together in a module. Since ```app.js``` is the main entry point for wepback config, here is were we create our module.

 The contents of ``` /application/app.js```
```js

    /* globals window, document */

    'use strict'

    import { Module, logger } from '@crispcode/modux'

    import { ComponentLayout } from './components/layout'

    import { ComponentHeader } from './components/header'
    import { ComponentFooter } from './components/footer'

    let initialize = () => {
        // This is information that will be used in the header and footer components
        store.set( 'message-header', 'Hello World! I am data stored in the application config' )
        store.set( 'copyright', '&copy; CrispCode' )

        // Just so that we have some details about what is happening we are going to set logger to debug mode.
        logger.enabled( true )

        logger.info( 'Application start' )

        // Create application
        let app = new Module( 'app' )
        app
            .addDependency( 'layout', ComponentLayout )
            .addDependency( 'header', ComponentHeader )
            .addDependency( 'footer', ComponentFooter )

        // Start application bound to the content element
        app.bootstrap( document.body.querySelector( '.content' ), 'layout' )
    }

    // We will start the application as soon as the page is loaded.
    window.addEventListener( 'load', () => {
        initialize()
    } )

```

 GREAT! We are almost finished. All we need now is to add a build script to package json. This is as easy as adding the following properties to ```package.json```

 ```json
    {
        "name": "myapp",
        "version": "1.0.0",
        "devDependencies": {
            ...
        },
        
        .
        .
        .
        
        "scripts": {
            "test": "modux dev",
            "build": "modux prod",
        }
    }
 ```


 Let's see what we've created. Run ```npm test```.

 There are a lot of features available in modux, such as a lot of utilities, as well as a router class for managing url changes. You can always clone the modux repository and run ```npm run docs``` to get the full documentation for it.

 If you have any issues or questions please feel free to refer to the issues page in github. Bye!