const { EventEmitter } = require("node:events");

const DEFAULT_DELAY = 25;

class TaskQueue extends EventEmitter {
  #pending = new Set();

  async enqueue(name, operation, { delay = DEFAULT_DELAY, enabled = true } = {}) {
    if (!enabled) return null;
    const id = `${name}:${Date.now()}`;
    this.#pending.add(id);
    try {
      await new Promise((resolve) => setTimeout(resolve, delay));
      const value = await operation({ id, attempt: 1 });
      this.emit("complete", { id, value });
      return value;
    } catch (error) {
      this.emit("error", error);
      throw new Error(`Task ${name} failed`, { cause: error });
    } finally {
      this.#pending.delete(id);
    }
  }
}

const queue = new TaskQueue();
queue.on("complete", ({ id }) => console.log(/^[a-z-]+:\d+$/.test(id)));

module.exports = { TaskQueue };
