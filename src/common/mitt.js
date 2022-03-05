import mitt from 'mitt'

// const bus = {}

// const emitter = mitt()

// bus.$on = emitter.on
// bus.$off = emitter.off
// bus.$emit = emitter.emit
const bus = new mitt()

export default bus