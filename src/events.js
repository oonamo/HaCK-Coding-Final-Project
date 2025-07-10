class Event {
  constructor(event) {
    this.event = event
    this.subscribers = {}
  }

  subscribe(name, handle) {
    if (typeof handle == "function") {
      this.subscribers[name] = handle
    }
  }

  emit(...params) {
    for (const name in this.subscribers) {
      this.subscribers[name](this.event, name, ...params)
    }
  }
}

class EventHandle {
  constructor(events) {
    this.events = events
  }

  subscribe(event, name, handle) {
    if (this.events[event]) {
      this.events[event].subscribe(name, handle)
    }
  }

  emit(event, ...params) {
    if (this.events[event]) {
      this.events[event].emit(...params)
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
