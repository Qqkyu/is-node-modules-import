# is-node-modules-import

Check, if for a given file, an import is a node_modules import.

## Installing

Using npm:

```
$ npm install is-node-modules-import
```

Using pnpm:

```
$ pnpm add is-node-modules-import
```

Using yarn:

```
$ yarn add is-node-modules-import
```

## Usage

Import the function using `require`:

```
const isNodeModulesImport = require('is-node-modules-import');
```

`isNodeModulesImport` expects a file path as the first argument, and an import path as the second one. For example:

```
isNodeModulesImport('index.js', 'prettier');
```

You can check more examples in `index.test.js`.

## Behavior

This package checks, if an import is node_modules import on any level, not only project-level.

This means, that if you have a project with the following structure:

```
- node_modules
    - react
    - eslint
- index.js
```

Then running `isNodeModulesImport` on `index.js` file will not only check `node_modules` on this level (with `react` and `eslint`). It will check also any `node_modules` directories further down the file tree.

So if you had `node_modules` directory with `prettier` installed in the root of your system, then the function will return `true`.

## Tested cases

Using "prettier" as an example:

### Simple node_modules imports

- `import <X> from "prettier"`
- `import <X> from "prettier/plugins"`

### Relative node_modules imports

- `import <X> from "./node_modules/prettier"`

### Absolute node_modules imports

- `import <X> from "home/user/.../prettier"
- `import <X> from "home/user/.../node_modules/prettier"

### Non-existent node_modules

If you provide an import path with a file from `node_modules` which doesn't exists, the function will return false.
