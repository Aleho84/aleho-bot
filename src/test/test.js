import chai from 'chai'
const assert = chai.assert
const expect = chai.expect
const should = chai.should

import { getCurrentUser } from './endpoints/users.js'
import { logCheck } from './checkers/logCheck.js'

describe('Test aleho-bot', () => {
    describe('Server Test:', () => {
        it('Error log check', async () => {
            const test = logCheck()
            assert.equal(test, 'pass')
        })
    })

    describe('Endpoint Test:', () => {
        it('type:', async () => {
            const test = await getCurrentUser()
            assert.typeOf(test, 'object')
        })
        it('keys:', async () => {
            const test = await getCurrentUser()
            assert.hasAllKeys(test, ['name'])
        })
    })
})