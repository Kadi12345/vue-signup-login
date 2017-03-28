import Vue from 'vue'
import Login from '@/components/Login'

// ExpectJS reference: https://github.com/Automattic/expect.js
describe('Login.vue', () => {
  /* Email Input */
  it(`Render emailentry in email input field.`, () => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'a@b.com'
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    expect(component.$el.querySelector('#email').value).to.equal(email)
  })

  it(`Render emailentry in email input field (incorrect format).`, () => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'not an email'
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    expect(component.$el.querySelector('#email').value).to.equal(email)
  })

  it(`Render 'Required' message all others hidden (no email input).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = ''
    let expectedValidation = 'Required'
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    expect(component.$el.querySelector('#email-required').textContent).to.equal(expectedValidation)

    // Vue updates the DOM asynchronously, in ticks. Therefore, when we modify anything that affects the DOM,
    // we need to wait for the DOM to update using Vue.nextTick() before making any assertions.
    Vue.nextTick(() => {
      expect(component.$el.querySelector('#email-required').style.display).to.not.equal('none')
      expect(component.$el.querySelector('#email-max-length').style.display).to.equal('none')
      expect(component.$el.querySelector('#email-example').style.display).to.equal('none')
      expect(component.$el.querySelector('#email-not-found').style.display).to.equal('none')
      done()
    })
  })

  it(`Render 'Max Len 254' message all others hidden (email too long).`, done => {
    let maxLength = 254
    let email = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@b.com'

    // Extend the component to get the constructor, which we can then initialize directly.
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    let expectedValidation = 'Max Len ' + maxLength

    expect(component.$el.querySelector('#email-max-length').textContent).to.equal(expectedValidation)

    Vue.nextTick(() => {
      expect(component.$el.querySelector('#email-required').style.display).to.equal('none')
      expect(component.$el.querySelector('#email-max-length').style.display).to.not.equal('none')
      expect(component.$el.querySelector('#email-example').style.display).to.equal('none')
      expect(component.$el.querySelector('#email-not-found').style.display).to.equal('none')
      done()
    })
  })

  it(`Render example email format in email input field all others hidden (incorrect format).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'not an email'
    let expectedValidation = 'Example: me@a.com'
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    expect(component.$el.querySelector('#email-example').textContent).to.equal(expectedValidation)

    Vue.nextTick(() => {
      expect(component.$el.querySelector('#email-required').style.display).to.equal('none')
      expect(component.$el.querySelector('#email-max-length').style.display).to.equal('none')
      expect(component.$el.querySelector('#email-example').style.display).to.not.equal('none')
      expect(component.$el.querySelector('#email-not-found').style.display).to.equal('none')
      done()
    })
  })

  it(`Render 'Sign Up' if the email does not exist all others hidden (email does not exist).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'acorn@thesquirrel.com'
    let expectedValidation = 'Sign Up'
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    expect(component.$el.querySelector('#email-not-found').textContent).to.equal(expectedValidation)

    Vue.nextTick(() => {
      expect(component.$el.querySelector('#email-required').style.display).to.equal('none')
      expect(component.$el.querySelector('#email-max-length').style.display).to.equal('none')
      expect(component.$el.querySelector('#email-example').style.display).to.equal('none')
      // Input Message
      expect(component.$el.querySelector('#email-not-found').style.display).to.not.equal('none')
      // Sign Up Button
      expect(component.$el.querySelector('#signup-button').style.display).to.not.equal('none')
      done()
    })
  })

  /* Password Input */
  it(`Render 'Required' message all others hidden (no password input).`, () => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'a@b'
    let expectedValidation = 'Required'
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    expect(component.$el.querySelector('#password-required').textContent).to.equal(expectedValidation)

    // Show 'Required' message.
    expect(component.$el.querySelector('#password-required').style.display).to.not.equal('none')
  })

  it(`Hide 'Required' message (password input contains data).`, done => {
    // Extend the component to get the constructor, which we can then initialize directly.
    let email = 'a@b'
    let thePassword = '123'
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        user: {
          password: thePassword
        }
      }
    }).$mount()

    expect(component.$el.querySelector('#password').value).to.equal(thePassword)

    // Confirm 'Required' message is hidden.
    Vue.nextTick(() => {
      expect(component.$el.querySelector('#password-required').style.display).to.equal('none')
      done()
    })
  })

  /* Login Button */
  it(`Login Button displayed but disabled (valid email provided no password).`, done => {
    let email = 'a@b'
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      }
    }).$mount()

    Vue.nextTick(() => {
      expect(component.$el.querySelector('#password-section').style.display).to.not.equal('none')
      expect(component.$el.querySelector('#submit').style.display).to.not.equal('none')
      expect(component.$el.querySelector('#submit').disabled).to.equal(true)
      done()
    })
  })

  it(`Login Button displayed and enabled (valid email provided with an a proposed password).`, done => {
    let email = 'a@b'
    let thePassword = '123'
    const Constructor = Vue.extend(Login)
    const component = new Constructor({
      propsData: {
        emailentry: email
      },
      data: {
        user: {
          password: thePassword
        }
      }
    }).$mount()

    expect(component.$el.querySelector('#password').value).to.equal(thePassword)

    Vue.nextTick(() => {
      expect(component.$el.querySelector('#password-section').style.display).to.not.equal('none')
      expect(component.$el.querySelector('#submit').style.display).to.not.equal('none')
      expect(component.$el.querySelector('#submit').disabled).to.equal(false)
      done()
    })
  })
})
