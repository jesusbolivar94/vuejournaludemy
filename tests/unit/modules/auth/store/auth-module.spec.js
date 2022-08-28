import createVuexStore from '../../../mock-data/mock-store'
import axios from 'axios'

describe('Vuex: Pruebas en el auth-module', function () {

    it('estado inicial', function () {

        const store = createVuexStore({
            status: 'authenticating', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('authenticating')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)

    })

    // Mutations
    it('Mutation: loginUser', function () {

        const store = createVuexStore({
            status: 'authenticating', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        store.commit('auth/loginUser', {
            user: { name: 'Fernando', email: 'a@a.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('authenticated')
        expect(user).toEqual({ name: 'Fernando', email: 'a@a.com' })
        expect(idToken).toBe('ABC-123')
        expect(refreshToken).toBe('XYZ-123')
    })

    it('Mutation: logOut', function () {

        localStorage.setItem('idToken', 'a')
        localStorage.setItem('refreshToken', 'a')

        const store = createVuexStore({
            status: 'authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: { name: 'Fernando', email: 'a@a.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        store.commit('auth/logout')

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('not-authenticated')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)

        expect(localStorage.getItem('idToken')).toBeFalsy()
        expect(localStorage.getItem('refreshToken')).toBeFalsy()

    })

    // Getters
    it('Getters: username, currentState', function () {

        const store = createVuexStore({
            status: 'authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: { name: 'Fernando', email: 'a@a.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        expect( store.getters['auth/currentState'] ).toBe('authenticated')
        expect( store.getters['auth/username'] ).toBe('Fernando')

    })

    // Actions
    it('Actions: createUser - Error usuario ya existe', async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = {
            name: 'Test User',
            email: 'test@test.com',
            password: '123456'
        }

        const resp = await store.dispatch('auth/createUser', newUser)

        expect( resp ).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

        const { status, user, idToken, refreshToken } = store.state.auth

        expect(status).toBe('not-authenticated')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)

    })

    it('Actions: createUser signInUser - Crea el usuario', async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = {
            name: 'Test User',
            email: 'test2@test.com',
            password: '123456'
        }

        // signIn
        await store.dispatch('auth/signInUser', newUser)
        const { idToken } = store.state.auth

        // Borrar el usuario
        const deleteResp = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBFhtclvCt1wr4R1I-GOJcy5DDV1xh2vLg`,
            { idToken }
        )

        // Crear el usuario
        const resp = await store.dispatch('auth/createUser', newUser)

        const { status, user, idToken:token, refreshToken } = store.state.auth

        expect(status).toBe('authenticated')
        expect(user).toMatchObject({name: 'Test User', email: 'test2@test.com'})
        expect( typeof token).toBe('string')
        expect( typeof refreshToken).toBe('string')

    })

    it('Actions: checkAuthentication POSITIVA', async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        // signIn
        const signInResp = await store.dispatch('auth/signInUser', {
            email: 'test@test.com',
            password: '123456'
        })
        const { idToken } = store.state.auth
        store.commit('auth/logout')

        localStorage.setItem('idToken', idToken)

        const checkResp = await store.dispatch('auth/checkAuthentication')

        const { status, user, idToken:token, refreshToken } = store.state.auth

        expect(checkResp).toEqual({ok: true})

        expect(status).toBe('authenticated')
        expect(user).toMatchObject({name: 'User Test', email: 'test@test.com'})
        expect( typeof token).toBe('string')

    })

    it('Actions: checkAuthentication NEGATIVA',  async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
            user: null,
            idToken: null,
            refreshToken: null
        })

        localStorage.removeItem('idToken')
        const checkResp1 = await store.dispatch('auth/checkAuthentication')

        expect(checkResp1).toEqual({ ok: false, message: 'No hay token' })
        expect(store.state.auth.status).toBe('not-authenticated')

        localStorage.setItem('idToken', 'ABC-123')

        const checkResp2 = await store.dispatch('auth/checkAuthentication')

        expect(checkResp2).toEqual({ ok: false, message: 'INVALID_ID_TOKEN' })
        expect(store.state.auth.status).toBe('not-authenticated')

    })
})