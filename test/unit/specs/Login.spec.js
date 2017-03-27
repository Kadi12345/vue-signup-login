import Vue from 'vue'
import Login from '@/components/Login'

// ExpectJS reference: https://github.com/Automattic/expect.js
describe('Login.vue', () => {
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
      expect(component.$el.querySelector('#email-not-found').style.display).to.not.equal('none')
      done()
    })
  })
})
