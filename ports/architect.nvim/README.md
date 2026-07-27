# architect.nvim

The Neovim port of Architect Theme. It includes paired light and dark modes,
legacy syntax groups, current Treesitter captures, LSP semantic tokens,
diagnostics, Git/diff states, common plugin groups, and the coordinated
16-color terminal palette.

## Local installation

Copy this directory to Neovim's package path:

```sh
mkdir -p ~/.local/share/nvim/site/pack/themes/start
cp -R architect.nvim ~/.local/share/nvim/site/pack/themes/start/
```

Then add one of these to `init.lua`:

```lua
vim.o.background = "dark" -- or "light"
vim.cmd.colorscheme("architect")
```

Use an explicit mode when desired:

```lua
vim.cmd.colorscheme("architect-dark")
-- vim.cmd.colorscheme("architect-light")
```

## Plugin-manager example

For a local checkout with lazy.nvim:

```lua
{
  dir = "/absolute/path/to/architect.nvim",
  lazy = false,
  priority = 1000,
  config = function()
    require("architect").setup({
      variant = "dark",       -- "dark", "light", or omit to use vim.o.background
      transparent = false,
      italic_comments = true,
      dim_inactive = false,
    })
    vim.cmd.colorscheme("architect")
  end,
}
```

`setup()` is optional. With no configuration, the colorscheme follows
`vim.o.background`.

## Requirements

- Neovim 0.9 or newer
- A terminal or GUI with true-color support
