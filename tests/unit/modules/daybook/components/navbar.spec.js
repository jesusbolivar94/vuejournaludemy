import { shallowMount } from '@vue/test-utils'
import Navbar from '@/modules/daybook/components/NavbarDayBook'
import createVuexStore from '../../../mock-data/mock-store'


describe('Pruebas en el Navbar component', function () {

    const store = createVuexStore({
        user: {
            name: 'Juan Carlos',
            email: 'juan@gmail.com'
        },
        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    })

    beforeEach(() => jest.clearAllMocks())

    it('Debe de mostrar el componente correctamente', function () {

        const wrapper = shallowMount( Navbar, {
            global: {
                plugins: [ store ]
            }
        } )

        expect(wrapper.html()).toMatchSnapshot()

    })

    it('Click en logout, debe de cerrar sesion y redireccionar', async() => {

        const wrapper = shallowMount( Navbar, {
            global: {
                plugins: [ store ]
            }
        } )

        await wrapper.find('button').trigger('click')

        expect( wrapper.router.push ).toHaveBeenCalledWith({name: 'login'})

        expect( store.state.auth ).toEqual({
            user: null,
            status: 'not-authenticated',
            idToken: null,
            refreshToken: null
        })

    })

})