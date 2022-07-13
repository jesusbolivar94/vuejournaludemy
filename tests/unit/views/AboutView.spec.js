import {shallowMount} from '@vue/test-utils'
import AboutView from '@/views/AboutView'

describe('About Page', function () {

    it('Debe de hacer match con el snapshot', () => {

        const wrapper = shallowMount(AboutView)

        expect( wrapper.html() ).toMatchSnapshot()

    })

})