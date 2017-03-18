# vue-signup-login
An authentication agnostic VueJS powered user sign up and login form component.
 
 
# Setup
``` bash
npm install -g vue-cli       
vue init webpack vue-signup-login
```

##### Answer Initialization Questions
```
? Project name vue-signup-login
? Project description An authentication agnostic VueJS powered user sign up and login form component.
? Author nu.everest <nu.everest@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? Yes
```

##### Move installed files.

- Cut the contents of the `vue-signup-login` sub-directory.
- Paste them one level up in the project root.
- Delete `vue-signup-login`.

##### Finish install. (Takes about 8 minutes.)
``` bash
npm install
```

##### Setup Unit Testing
Add this to `/test/unit/karma.conf.js` right after `preprocessors: {...},`.

```javascript
// ** ADD THIS IN ** (vue-cli's webpack template doesn't add it by default)
plugins: [
  // Launchers
  'karma-chrome-launcher',

  // Test Libraries
  'karma-mocha',
  'karma-sinon-chai',

  // Preprocessors
  'karma-webpack',
  'karma-sourcemap-loader',

  // Reporters
  'karma-spec-reporter',
  'karma-coverage'
],
```

##### Build Setup Reference
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
 
# References
[vue-cli](https://github.com/vuejs/vue-cli)
[Unit Testing with Karma and Mocha](https://alligator.io/vuejs/unit-testing-karma-mocha/?utm_campaign=Revue%20newsletter&utm_medium=Newsletter&utm_source=revue)

