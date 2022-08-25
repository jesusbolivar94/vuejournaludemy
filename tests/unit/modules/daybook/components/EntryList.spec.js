import {createStore} from 'vuex'
import {getEntriesByTerm} from '@/modules/daybook/store/journal/getters'
import {journalState} from '../../../mock-data/test-journal-state'
import {shallowMount} from '@vue/test-utils'
import EntryList from '@/modules/daybook/components/EntryList'

describe('pruebas en el EntryList', function () {
    const journalMockModule = {
        namespaced: true,
        getters: {
            getEntriesByTerm
        },
        state: () => ({
            isLoading: false,
            entries: journalState.entries
        })
    }

    const store = createStore({
        modules: {
            journal: {...journalMockModule}
        }
    })

    const wrapper = shallowMount( EntryList, {
        global: {
            mocks: {

            },
            plugins: [ store ]
        }
    })

    it('debe de llamar el getEntriesByTerm y mostrar 2 entradas', function () {
        console.log( wrapper.html )
    })
})