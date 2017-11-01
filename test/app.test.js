import assert from 'assert'
import fetch from 'node-fetch'
import http from 'http'

import app from '../server/app.js'

function assertMatchesRegex(actualString, expectedRegex) {
  if (!expectedRegex.test(actualString)) {
    throw new Error(`Expected ${actualString} to match ${expectedRegex}`)
  }
}

describe('Hello express server', function() {
  before('start server', function(done) {
    this.server = http.createServer(app)
    // Pick a random port to listen on.
    this.server.listen(undefined, () => {
      this.baseUrl = 'http://localhost:' + this.server.address().port
      done()
    })
  })

  after('stop server', function(done) {
    this.server.close(done)
  })

  it('should return "hello world" as text/plain when GET /', async function() {
    const res = await fetch(this.baseUrl + '/')
    assert.equal(res.status, 200)
    // The Content-Type can include a charset which I am not testing for, but
    // should begin with "text/plain".
    assertMatchesRegex(res.headers.get('Content-Type'), /^text\/plain/)
    assert.equal(await res.text(), 'hello world')
  })
})
