## Valid Path

🧰 Provides ways of testing whether a given value can be a valid file/directory name. 🏜

<br>

> 💃 Since `v.1.1.0` this package provides both a CommonJS module and an ES module, thanks to [`Modern Module`](https://github.com/igorskyflyer/npm-modern-module).
>
> What do you need to do to use one or the other?
>
> Nothing. If you need a CommonJS module `require` it, if you need an ES module `import` it instead. Simple, right?

<br>

### Usage

Install it by running,

```shell
npm i "@igor.dvlpr/valid-path"
```

<br>

### API

```ts
function isValidPath(path: string, isFile = true): boolean
```

Returns whether the given path can be a valid file/directory name on the host machine.

<br>

```ts
function isValidPathUnix(path: string, isFile = true): boolean
```

Returns whether the given path can be a valid file/directory name on Unix and Unix-like OS'.

<br>

```ts
function isValidPathWin(path: string, isFile = true): boolean
```

Returns whether the given path can be a valid file/directory name on Windows OS.

<br>

### Examples

```js
const { isValidPathUnix, isValidPathWin, isValidPath } = require('@igor.dvlpr/valid-path')

console.log(isValidPathUnix('hello&world.js', true)) // prints true
console.log(isValidPathUnix('hello/world.js', true)) // prints false
console.log(isValidPathUnix('hello/world')) // prints false

console.log(isValidPathWin('hello/world.js', true)) // prints false
console.log(isValidPathWin('hello/world', false)) // prints false
console.log(isValidPathWin('CON7')) // prints true
console.log(isValidPathWin('COM7.txt')) // prints false
console.log(isValidPathWin('CONnection')) // prints true
console.log(isValidPathWin('lpt1')) // prints false
console.log(isValidPathWin('hello&world.js', true)) // prints true

// isValidPath() internally uses the appropriate method for supported OS' (Unix-like and Windows)
```
