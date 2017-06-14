This repo contains example client-server application with basic JWT authorization. It is written in Typescript2.
Please note, that this application is only an example, has rather unsophisticated views and still some TODOs ;) 
I will maintain the application and probably add some new features in the future. I implemented example resource view on
the client side, which is available only after user's successful authorization. It shows youtube videos with
basic input search.

**NOTE**: It uses youtube API with some limited API key (no of queries per hour/day), so there might be situation,
when videos would not load.

Client side uses following:

## Features/Technologies

* [TypeScript v2](Typescriptlang.org) - "typed superset of JavaScript that compiles to plain JavaScript"
* [TSLint](https://palantir.github.io/tslint/)- An extensible linter for the TypeScript language.
* [SPA](http://blog.brand24.pl/spa-kontra-tradycja/) - Single Page Application, with fully client side rendering
* Shared app config between development and production
* Splits vendors from client bundle
* Client & Server are two separate applications and you should treat them as such. They have their own package.json files
and npm scripts. They are just in a single repository. They are running at different ports.
* [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) handled in development mode using webpack's *Proxy*

Client side uses following technologies/packages:
* [React](https://facebook.github.io/react/)- for rendering
* [React Hot Loader v3](https://github.com/gaearon/react-hot-loader)- "Tweak React components in real time"
* [React Router v4](https://reacttraining.com/react-router/)- for routing
* [Redux](https://github.com/reactjs/redux)- "Redux evolves the ideas of [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation, but avoids its complexity..."
* [ReduxForm v6](http://redux-form.com/6.8.0/) - "The best way to manage your form state in Redux"
* [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension) for next generation developer experience.
* [redux-thunk](https://github.com/gaearon/redux-thunk)- allowing to write asynchronous action creators
* [Webpack v2](https://webpack.js.org/)- for bundling (with [asset-management](https://webpack.js.org/guides/asset-management/), ["Tree-Shaking"](https://webpack.js.org/guides/tree-shaking/), [hot-module-replacement](https://webpack.js.org/guides/hot-module-replacement/), [caching](https://webpack.js.org/guides/caching/) and [code-splitting](https://webpack.js.org/guides/code-splitting/]))
* [Sass](http://sass-lang.com/)- "css with superpowers"

Server side uses following technologies/packages:
* [node v8](https://github.com/nodejs/node)
* [nodemon](https://nodemon.io/)- configured with [ts-node](https://github.com/TypeStrong/ts-node) to automatically rebuild and restart the server on any changes
* [Express v4](https://expressjs.com/) server.
* [mongoose](http://mongoosejs.com/)- "elegant mongodb object modeling for node.js"
* [passport](http://passportjs.org/)- Simple, unobtrusive authentication for Node.js

## Why the project is useful?

Setting whole configuration for many different packages from scratch can be painful and time-consuming. This repository
can be treated as an example of such configuration. It contains configuration for both client & server applications
, for development as well as production. It presents how to configure basic jwt authorization with code on the client
and the server. I hope it will save you some time and gray hairs ;)


## Get started

**1. Clone the repository to your local machine:**

```bash
git clone https://github.com/BGrzegorczuk/react-redux-express-auth-ts.git
cd react-redux-express-auth-ts
```

**2. Install client app dependencies:**

```bash
cd client
npm i
```

**3. Run client app in development mode:**
```bash
npm run develop
```

**4. Install server app dependencies:**

Open project's root directory (react-redux-express-auth-ts/) in another console tab, then: 

```bash
cd server
npm i
```

**3. Run server in development mode:**
```bash
npm run develop
```

You should be able to run the application at [http://localhost:3000/](http://localhost:3000/).
