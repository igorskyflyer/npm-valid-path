<div align="center">
  <img src="https://raw.githubusercontent.com/igorskyflyer/npm-valid-path/main/media/valid-path.png" alt="Icon of Valid Path" width="256" height="256">
  <h1>Valid Path</h1>
</div>

<br>

<h4 align="center">
  🧰 Determines whether a given value can be a valid file/directory name. 🏜
</h4>

<br>
<br>

## 📃 Table of Contents

- [Features](#-features)
- [Usage](#-usage)
- [API](#-api)
- [Examples](#️-examples)
- [Changelog](#-changelog)
- [Support](#-support)
- [License](#-license)
- [Related](#-related)
- [Author](#-author)

<br>
<br>

## 🤖 Features

- 🧠 Detects if a file or folder name is valid for the system
- 🖥 Works on Windows and Unix like systems
- 🎯 Validates both file and directory names
- 🚫 Blocks names with reserved words or illegal characters
- 📏 Enforces system specific length limits
- ⚡ Returns a clear `true` or `false` result instantly

<br>
<br>

## 🕵🏼 Usage

Install it by executing any of the following, depending on your preferred package manager:

```bash
pnpm add @igorskyflyer/valid-path
```

```bash
yarn add @igorskyflyer/valid-path
```

```bash
npm i @igorskyflyer/valid-path
```

<br>
<br>

## 🤹🏼 API

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
<br>

## 🗒️ Examples

```ts
import { isValidPathUnix, isValidPathWin, isValidPath } from '@igorskyflyer/valid-path'

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
// so no need for separate testing
```

<br>
<br>

## 📝 Changelog

📑 The changelog is available here, [CHANGELOG.md](https://github.com/igorskyflyer/npm-valid-path/blob/main/CHANGELOG.md).

<br>
<br>

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-valid-path/blob/main/LICENSE).

<br>
<br>

## 💖 Support

<div align="center">
  I work hard for every project, including this one and your support means a lot to me!
  <br>
  Consider buying me a coffee. ☕
  <br>
  <br>
  <a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="180" height="46"></a>
  <br>
  <br>
  <em>Thank you for supporting my efforts!</em> 🙏😊
</div>

<br>
<br>

## 🧬 Related

[@igorskyflyer/upath](https://www.npmjs.com/package/@igorskyflyer/upath)

> _🎍 Provides a universal way of formatting file-paths in Unix-like and Windows operating systems as an alternative to the built-in path.normalize(). 🧬_

<br>

[@igorskyflyer/windev](https://www.npmjs.com/package/@igorskyflyer/windev)

> _🍃 Provides ways of checking whether a path is a legacy Windows device. 💾_

<br>

[@igorskyflyer/valid-path](https://www.npmjs.com/package/@igorskyflyer/valid-path)

> _🧰 Provides ways of testing whether a given value can be a valid file/directory name. 🏜_

<br>

[@igorskyflyer/registry-apppaths](https://www.npmjs.com/package/@igorskyflyer/registry-apppaths)

> _🪀 A Node.js module for reading the AppPaths registry key on Windows. Useful for retrieving applications that can be launched from the command prompt. 🗃_

<br>

[@igorskyflyer/jmap](https://www.npmjs.com/package/@igorskyflyer/jmap)

> _🕶️ Reads a JSON file into a Map. 🌻_

<br>
<br>
<br>

## 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
