#!/usr/bin/env bash

set -euo pipefail

readonly THEME_NAME="${THEME_NAME:-Architect Dark}"
declare -a files=("package.json" "README.md" "themes/architect-dark-color-theme.json")

validate_file() {
  local file="$1"
  if [[ ! -r "$file" ]]; then
    printf 'error: cannot read %q\n' "$file" >&2
    return 1
  fi
  printf '✓ %s (%d bytes)\n' "$file" "$(wc -c < "$file")"
}

main() {
  # Exercise commands, variables, arrays, substitutions, and control flow.
  for file in "${files[@]}"; do
    validate_file "$file"
  done

  case "$THEME_NAME" in
    "Architect Dark"|"Architect Light") printf 'theme: %s\n' "$THEME_NAME" ;;
    *) return 64 ;;
  esac
}

main "$@"
