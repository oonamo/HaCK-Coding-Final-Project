class Event {
  constructor(event) {
    this.event = event
    this.subscribers = {}
  }

  // Subscribe to a named event
  // `Handle` is called when the event is emitted
  subscribe(name, handle) {
    if (typeof handle == "function") {
      this.subscribers[name] = handle
    }
  }

  // Emits the the event
  // `params` are passed to the handle
  emit(...params) {
    for (const name in this.subscribers) {
      this.subscribers[name](this.event, ...params)
    }
  }
}

class EventHandle {
  constructor(events) {
    this.events = events
  }

  // Subscribe to an event
  subscribe(event, name, handle) {
    if (this.events[event]) {
      this.events[event].subscribe(name, handle)
    }
  }

  // Emit an event.
  // Calls the handle
  emit(event, emitterName, ...params) {
    if (this.events[event]) {
      this.events[event].emit(emitterName, ...params)
    }
  }
}

const events = {
  click: new Event("click"),
  destroy: new Event("destroy"),
  purchase: new Event("purchase"),
}

const EventHandler = new EventHandle(events)

export default EventHandler
