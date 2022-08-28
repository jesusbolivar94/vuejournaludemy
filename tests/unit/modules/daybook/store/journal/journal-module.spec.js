import {createStore} from 'vuex'
import journal from '@/modules/daybook/store/journal'
import {journalState} from '../../../../mock-data/test-journal-state'
import authApi from '@/api/authApi'

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

describe('Vuex - Pruebas en el journal module', function () {
    beforeAll(async() => {

        const { data } = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456',
            returnSecureToken: true
        })

        localStorage.setItem('idToken', data.idToken)

    })

    it('este es el estado inicial, debe de tener este stae', function () {
        const store = createVuexStore(journalState)
        const {isLoading, entries} = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })

    // Mutations
    it('mutations: setEntries', function () {
        const store = createVuexStore({isLoading: true, entries: []})

        store.commit('journal/setEntries', journalState.entries)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.isLoading.length ).toBeFalsy()
    })

    it('mutations: updateEntry', function () {
        // create store con entries
        const store = createVuexStore(journalState)

        // updatedEntry
        const updatedEntry = {
            id: '-N6zkl52dT9uCPyBb3XV',
            date: 1657853378434,
            text: 'Hola mundo desde pruebas'
        }

        // commit de la mutación
        store.commit('journal/updateEntry', updatedEntry)

        const storeEntries = store.state.journal.entries

        // Expects
        // entries.lenght = 2
        expect( store.state.journal.entries.length ).toBe(2)
        // entries tiene que existir updatedEntry
        expect(
            storeEntries.find(e => e.id === updatedEntry.id)
        ).toEqual(updatedEntry)
    })

    it('mutations: addEntry, deleteEntry', function () {
        // crear Store
        const store = createVuexStore(journalState)

        // addEntry { id: 'ABC-1234', text: 'hola mundo' }
        const newEntry = {
            id: 'ABC-123',
            text: 'hola mundo'
        }

        store.commit('journal/addEntry', newEntry)

        // Expects
        // entradas sean 3
        let storeEntries = store.state.journal.entries
        expect( storeEntries.length ).toBe(3)
        // entrada con el id ABC-123 exista
        expect( storeEntries.some(e => e.id === newEntry.id)).toBeTruthy()

        // deleteEntry, 'ABC-123'
        store.commit('journal/deleteEntry', newEntry.id)

        // Expects
        // entradas deben de ser 2
        storeEntries = store.state.journal.entries
        expect(storeEntries.length).toBe(2)
        // entrada con el id ABC-123 no debe de existir
        expect( storeEntries.some(e => e.id === newEntry.id)).toBeFalsy()
    })

    // Getters
    it('Getters: getEntriesByTerm, getEntryById', function () {
        const store = createVuexStore(journalState)

        const [ entry1, entry2 ] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('segunda')).toEqual([entry1])

        expect(store.getters['journal/getEntryById']('-N6zkmRA77x0gJZUmgyy')).toEqual(entry2)
    })

    // Actions
    it('actions: loadEntries', async function () {
        const store = createVuexStore({isLoading: true, entries: []})

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(2)
    })

    it('actions: updateEntry', async function () {
        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: '-N6zkl52dT9uCPyBb3XV',
            date: 1657853378434,
            text: 'fgfgdfgdfgfdgdfgdf segunda'
        }

        await store.dispatch('journal/updateEntry', )

    })

    it('actions: createEntry, deleteEntry', async function () {
        // createStore
        const store = createVuexStore(journalState)

        // newEntry = {date: , text: 'Nueva entrada desde las pruebas' }
        const newEntry = {
            date: 1657853378434,
            text: 'Nueva entrada desde las pruebas'
        }

        // dispatch de la acción createEntry
        // obtener el id de la nueva entrada
        const id = await store.dispatch('journal/createEntry', newEntry)

        // el id debe de ser un string
        expect( typeof id === 'string' ).toBeTruthy()

        // la nueva entrada dene de existir en el state.journal.entries....
        const storeEntries = store.state.journal.entries
        expect( storeEntries.some(e => e.id === id)).toBeTruthy()

        // dispatch deleteEntry
        await store.dispatch('journal/deleteEntry', id)

        // la nueva entrada no debe de existir en el state.journal.entries
        expect( store.state.journal.entries.some(e => e.id === id)).toBeFalsy()
    })
})