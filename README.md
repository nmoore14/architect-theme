# Architect Theme

Architect is a coordinated pair of restrained VS Code themes for long, focused coding sessions. Its warm charcoal and paper-toned canvases use surface changes, typography, and a compact syntax palette to create hierarchy without visual noise.

- **Architect Dark** — warm charcoal with quiet blue-gray surfaces
- **Architect Light** — soft daylight paper with cool stone chrome

Both modes share the same semantic color roles, so switching modes preserves the visual meaning of your code.

## Design philosophy

Architect favors structure over spectacle:

- Ordinary variables remain close to the editor foreground.
- Blue and cyan identify callable and type-level structure.
- Sage is reserved for strings and successful states.
- Violet marks language keywords without dominating the page.
- Amber and gold identify values, constants, and attributes.
- Coral and muted red are used sparingly for tags, conflicts, and errors.
- Borders are quiet; elevation and small surface shifts separate regions.

The palette is original, with general inspiration from calm desktop interfaces and typography-first productivity software.

## Screenshots

Add marketplace screenshots at:

- `screenshots/architect-dark.png`
- `screenshots/architect-light.png`

Suggested captures should show TypeScript and Markdown with the Explorer, integrated terminal, suggestions, and Git decorations visible.

## Installation for local development

Requirements: [Visual Studio Code](https://code.visualstudio.com/) and Node.js 20 or newer.

```sh
git clone https://github.com/your-user/architect-vscode-theme.git
cd architect-vscode-theme
npm install
code architect-theme.code-workspace
```

The `your-user` and `your-publisher-name` values are intentional placeholders. Replace them before publishing.

## Test in the Extension Development Host

1. Open this folder or `architect-theme.code-workspace` in VS Code.
2. Press `F5` and choose **Launch Architect Theme** if prompted.
3. In the new Extension Development Host window, open the Command Palette.
4. Run **Preferences: Color Theme**.
5. Select **Architect Dark** or **Architect Light**.
6. Open files in `test/` to inspect syntax coverage.

Theme JSON changes are reflected in the development host after running `npm run generate`; use **Developer: Reload Window** if needed.

You can also launch directly:

```sh
code --extensionDevelopmentPath="$PWD" test/TypeScript.ts
```

## Select the theme

Open the color theme picker with `Ctrl+K Ctrl+T` on Windows/Linux or `Cmd+K Cmd+T` on macOS, then choose **Architect Dark** or **Architect Light**.

## Packaging

Generate, validate, and build a local VSIX:

```sh
npm install
npm run package
```

The package script uses `vsce` and does not publish anything. To install the resulting archive:

```sh
code --install-extension architect-vscode-theme-0.1.0.vsix
```

## Supported languages

Architect includes broad TextMate and semantic-token coverage for TypeScript, JavaScript, Python, Go, Rust, HTML, XML, CSS, JSON, Markdown, YAML, shell scripts, diff views, and common configuration formats. Languages supplied by extensions inherit the semantic roles and common TextMate scopes.

## Palette

| Role | Architect Dark | Architect Light |
| --- | --- | --- |
| Editor canvas | `#171A1F` | `#F4F5F2` |
| Side bar | `#1B1F26` | `#ECEFEB` |
| Elevated surface | `#20252D` | `#E4E8E6` |
| Primary text | `#D8DEE9` | `#2E3440` |
| Secondary text | `#A7B0BF` | `#4C566A` |
| Comments | `#899696` | `#68746D` |
| Selection | `#344256` | `#CDD8E3` |
| Accent/cursor | `#88C0D0` | `#4C7A91` |
| Keywords | `#B48EAD` | `#76558F` |
| Functions | `#81A1C1` | `#3E6F91` |
| Types | `#88C0D0` | `#357A83` |
| Strings | `#A3BE8C` | `#547A50` |
| Numbers | `#D9B26F` | `#9A6B2F` |
| Tags/errors | `#D08770` / `#BF6B73` | `#9C5E4D` / `#A24E57` |

## Recommended editor settings

These settings are optional but showcase the intended bracket and semantic styling:

```jsonc
{
  "editor.semanticHighlighting.enabled": true,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "editor.guides.highlightActiveIndentation": true,
  "editor.renderWhitespace": "selection"
}
```

## Workbench customization

Use theme-specific settings to preserve the paired design:

```jsonc
{
  "workbench.colorCustomizations": {
    "[Architect Dark]": {
      "editor.background": "#15181D",
      "statusBar.background": "#20252D"
    },
    "[Architect Light]": {
      "editor.background": "#F7F7F4",
      "statusBar.background": "#E4E8E6"
    }
  }
}
```

## Token customization

TextMate token rules can be adjusted without editing the extension:

```jsonc
{
  "editor.tokenColorCustomizations": {
    "[Architect Dark]": {
      "comments": {
        "foreground": "#93A0A0",
        "fontStyle": ""
      },
      "textMateRules": [
        {
          "scope": "entity.name.function",
          "settings": {
            "foreground": "#8AACC9"
          }
        }
      ]
    }
  }
}
```

## Development and validation

Theme sources are generated from the centralized role palette in `scripts/generate-themes.mjs`; the generated JSON in `themes/` is checked into source control so the extension remains fully declarative at runtime.

```sh
npm run generate
npm run validate
npm run package
```

Validation checks manifest paths, contribution labels, theme/UI type agreement, semantic highlighting, color formatting, rule coverage, and contrast for important editor and workbench pairs.

## Known limitations

- Syntax precision ultimately depends on the grammar and semantic-token provider installed for a language.
- Embedded languages can inherit scopes from their host grammar and may not match every specialized extension.
- Terminal applications that emit their own 24-bit colors bypass the ANSI palette.
- Screenshot assets are intentionally left as placeholders until captured in the target VS Code version and font environment.

## Contributing

Please include a focused before/after screenshot and a small fixture that demonstrates any proposed scope change. Keep color additions tied to an existing semantic role where possible. Run `npm run validate` and `npm run package` before opening a pull request.

## License

[MIT](LICENSE)
