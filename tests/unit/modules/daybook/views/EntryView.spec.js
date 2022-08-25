import {shallowMount} from '@vue/test-utils'
import {createStore} from 'vuex'

import journal from '@/modules/daybook/store/journal'
import {journalState} from '../../../mock-data/test-journal-state'
import EntryView from '@/modules/daybook/views/EntryView'
import Swal from 'sweetalert2'

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
    })

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView', function () {
    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: '-N6zkl52dT9uCPyBb3XV'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    it('debe de sacar al usuario porque el id no existe', function () {
        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'Este id no existe en el STORE'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})
    })

    it('debe de mostrar la entrada correctamente', function () {

        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()

    })

    it('debe de borrar la entrada y salir', function () {

        wrapper.find('.btn-danger').trigger('click')



    })
})