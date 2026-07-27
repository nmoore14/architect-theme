import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const failures = [];

function rgb(hex) {
  const value = hex.slice(1, 7);
  return [0, 2, 4].map((i) => Number.parseInt(value.slice(i, i + 2), 16) / 255);
}

function luminance(hex) {
  const linear = rgb(hex).map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const labels = new Set();
for (const contribution of manifest.contributes.themes) {
  if (labels.has(contribution.label)) failures.push(`Duplicate theme label: ${contribution.label}`);
  labels.add(contribution.label);
  const themePath = path.resolve(root, contribution.path);
  let theme;
  try {
    theme = JSON.parse(await readFile(themePath, "utf8"));
  } catch (error) {
    failures.push(`${contribution.path}: ${error.message}`);
    continue;
  }

  if (!theme.semanticHighlighting) failures.push(`${contribution.label}: semantic highlighting is not enabled`);
  if (theme.type !== (contribution.uiTheme === "vs-dark" ? "dark" : "light")) {
    failures.push(`${contribution.label}: theme type does not match uiTheme`);
  }
  if (theme.tokenColors.length < 40) failures.push(`${contribution.label}: token coverage is unexpectedly small`);
  if (Object.keys(theme.semanticTokenColors).length < 25) failures.push(`${contribution.label}: semantic token coverage is unexpectedly small`);
  if (Object.keys(theme.colors).length < 250) failures.push(`${contribution.label}: workbench color coverage is unexpectedly small`);

  const pairs = [
    ["editor.foreground", "editor.background", 4.5],
    ["editorLineNumber.foreground", "editor.background", 3],
    ["sideBar.foreground", "sideBar.background", 4.5],
    ["input.foreground", "input.background", 4.5],
    ["terminal.foreground", "terminal.background", 4.5],
    ["tab.activeForeground", "tab.activeBackground", 4.5],
    ["tab.inactiveForeground", "tab.inactiveBackground", 3]
  ];
  console.log(`\n${contribution.label}`);
  for (const [fgKey, bgKey, minimum] of pairs) {
    const ratio = contrast(theme.colors[fgKey], theme.colors[bgKey]);
    console.log(`  ${fgKey} / ${bgKey}: ${ratio.toFixed(2)}:1`);
    if (ratio < minimum) failures.push(`${contribution.label}: ${fgKey} contrast ${ratio.toFixed(2)} is below ${minimum}`);
  }

  const values = JSON.stringify(theme).match(/#[0-9A-Fa-f]{6}(?:[0-9A-Fa-f]{2})?/g) ?? [];
  const invalid = values.filter((value) => !/^#[0-9A-F]{6}(?:[0-9A-F]{2})?$/.test(value));
  if (invalid.length) failures.push(`${contribution.label}: non-canonical colors: ${[...new Set(invalid)].join(", ")}`);
  console.log(`  ${Object.keys(theme.colors).length} workbench colors, ${theme.tokenColors.length} TextMate rules, ${Object.keys(theme.semanticTokenColors).length} semantic rules`);
  console.log(`  ${new Set(values).size} unique palette values`);
}

if (failures.length) {
  console.error(`\nValidation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("\nArchitect themes passed structural, palette, and contrast validation.");
