# Architect fixture

> Calm hierarchy makes a dense interface easier to scan.

This fixture checks **strong text**, *emphasis*, [links](https://code.visualstudio.com/),
`inline code`, and a small task list.

- [x] Coordinate light and dark modes
- [ ] Capture marketplace screenshots

## Typed example

```ts
interface Palette<TColor extends string> {
  readonly background: TColor;
  accent: TColor;
}

const message = `Contrast: ${12.91}:1`;
```

| Role | Value |
| --- | --- |
| Canvas | `#171A1F` |
| Accent | `#88C0D0` |
