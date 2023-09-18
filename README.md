# Draw Mermaid Diagrams using Tldraw

Checkout the [live editor](https://seflless.github.io/tldraw2mermaid/).

# Todos
 - Support more arrow styles
 - See if there are any more shapes we should support
 - Support colors
 - See if subgraphs makes sense (https://mermaid.js.org/syntax/flowchart.html#subgraphs), this would be equivalent to using Tldraw's groups/frames probably
 - Support only generating the current selection
 - Set the tldraw document based on the mermaid diagram (what can we be bidirectional about?)

# Contributing

```
git clone git@github.com:seflless/tldraw2mermaid.git
cd tldraw2mermaid
pnpm install
```

## Dev Mode

```
pnpm dev
# open http://localhost:3000/
```

## Updating Github Pages

Generates the static website and puts it into the demo folder.

```
pnpm demo
```
