import Vue from 'vue'
import Social from '@/components/Social'

// ExpectJS reference: https://github.com/Automattic/expect.js

describe('Social.vue', () => {
  it(`Render the -OR- separator`, () => {
    // Extend the component to get the constructor, which we can then initialize directly.
    const Constructor = Vue.extend(Social)
    const component = new Constructor().$mount()
    expect(component.$el.querySelector('.font-size-13').textContent).to.contain('——————  OR  ——————')
  })
})
