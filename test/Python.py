from __future__ import annotations

import asyncio
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")
DEFAULT_RETRIES = 3


@dataclass(frozen=True, slots=True)
class Result(Generic[T]):
    value: T
    cached: bool = False


class Client:
    """Small asynchronous client used to inspect theme scopes."""

    async def fetch(self, path: str, retries: int = DEFAULT_RETRIES) -> Result[dict[str, object]]:
        for attempt in range(retries):
            try:
                await asyncio.sleep(0.01)
                payload = {"path": path, "attempt": attempt + 1, "ok": True}
                return Result(payload)
            except TimeoutError as error:
                if attempt == retries - 1:
                    raise RuntimeError(f"request failed: {path}") from error
        raise AssertionError("unreachable")


async def main() -> None:
    result = await Client().fetch("/users")
    print(result.value if result.cached is False else None)


if __name__ == "__main__":
    asyncio.run(main())
