
export default {
  // eslint-disable-next-line space-before-function-paren
  changcurrenindex(that, code) {
    console.log(this)
    that.$store.commit({
      type: 'play/changcurrenindex',
      code: code
    })
  }
}
