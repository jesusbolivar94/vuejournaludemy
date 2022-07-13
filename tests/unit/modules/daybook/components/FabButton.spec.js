import { shallowMount } from '@vue/test-utils'
import FabButton from '@/modules/daybook/components/FabButton'

describe( 'Pruebas en el FAB Component', () => {
    it( 'Debe de mostrar el icono por defecto', () => {
        const wrapper = shallowMount( FabButton )

        expect( wrapper.find( 'i' ).classes( 'fa-plus' ).toBeTruthy() )
    } )

    it( 'Debe de mostrar el icono por argumento: fa-circle', () => {
        const wrapper = shallowMount( FabButton, {
            props: {
                icon: 'fa-circle'
            }
        } )

        expect( wrapper.find( 'i' ).classes( 'fa-circle' ) ).toBeTruthy()
    } )

    it( 'Debe de emitir el evento on:click cuando se hace click', () => {
        const wrapper = shallowMount( FabButton )

        wrapper.find( 'button' ).trigger( 'click' )

        expect( wrapper.emitted( 'on:click' ) ).toHaveLength(1)
    } )
} )