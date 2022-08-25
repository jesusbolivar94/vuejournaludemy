import {shallowMount} from '@vue/test-utils'
import SoloEntry from '@/modules/daybook/components/SoloEntry'
import { journalState } from '../../../mock-data/test-journal-state'

describe('pruebas en el soloEntry component', function () {
    //mockRouter
    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount(SoloEntry, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    it('debe de hacer match con el snapshot', function () {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('debe de redireccionar al hacer click en el entry-container', function () {

        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: '-N6zkl52dT9uCPyBb3XV'
            }
        })

    })

    it('pruebas en las propiedades computadas', function () {
        expect( wrapper.vm.day ).toBe(14)
        expect( wrapper.vm.months ).toBe('Julio')
        expect( wrapper.vm.yearDay ).toBe('2022, Jueves')
    })
})