// Class for creating proc-chains
// `proceeds` the next item, then collects all the `gain`
class Proccer {
  constructor() {
    this.items = []
  }

  // Add item to the chain
  addEffect(effect) {
    this.items.push(effect)
  }

  // Collect the `chains` items
  proc() {
    let gain = 0;
    for (const item of this.items) {
      gain += item()
    }
    return gain
  }
}

const Proc = new Proccer()

export default Proc
