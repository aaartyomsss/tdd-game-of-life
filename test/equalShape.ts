import chai, { Assertion } from 'chai'

export function normalize(s: string) {
  return s.replaceAll(' ', '').trim() + '\n'
}

chai.use(function (chai, util) {
  Assertion.addMethod('equalShape', function (expected) {
    const actual = this._obj
    new Assertion(actual).to.be.a('string')

    expected = normalize(expected)
    this.assert(
      actual === expected,
      'expected #{this} to equal #{exp} but got #{act}',
      'expected #{this} to not equal #{act}',
      expected,
      actual
    )
  })
})
