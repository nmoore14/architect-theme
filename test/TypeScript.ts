import { readFile } from "node:fs/promises";

type Identifier = string & { readonly brand: unique symbol };
interface Repository<T extends { id: Identifier }> {
  find(id: Identifier): Promise<T | null>;
}

@sealed
export class UserService<T extends { id: Identifier; active: boolean }> {
  static readonly timeoutMs = 2_500;
  #cache = new Map<Identifier, T>();

  constructor(private readonly repository: Repository<T>) {}

  async load(id: Identifier, refresh = false): Promise<T> {
    // Prefer the quiet, in-memory path.
    if (!refresh && this.#cache.has(id)) return this.#cache.get(id)!;
    const user = await this.repository.find(id);
    if (user === null) throw new Error(`Unknown user: ${id}`);
    this.#cache.set(id, user);
    return user;
  }
}

function sealed<T extends Function>(constructor: T): void {
  Object.seal(constructor);
}

const config = JSON.parse(await readFile("config.json", "utf8")) as {
  enabled: boolean;
};
console.log(config.enabled ?? true);
