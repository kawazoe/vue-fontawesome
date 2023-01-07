<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# vue-fontawesome (with Vue 3)

[![npm](https://img.shields.io/npm/v/@fortawesome/vue-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/vue-fontawesome)
[![GitHub Actions Status](https://github.com/FortAwesome/vue-fontawesome/workflows/CI/badge.svg)](https://github.com/FortAwesome/vue-fontawesome/actions)

> Font Awesome Vue 3 component using SVG with JS

## Changes in this fork
This version of vue-fontawesome improves support for SVG symbols (also known as sprites). SVG symbols are a way
to pre-render SVGs that are often reused on the page, ensuring that their paths are only rasterized once, a slow
process, but composited everywhere they are needed, a very fast one.

The official version provides limited support for symbols, by offering a prop on `FontAwesomeIcon` that can be
set to define an icon as a symbol. However, it provides no ways of using these symbols afterward, instead assuming
that you would know how to do this manually, as well as assuming that you can guess what id they will have, and
what classes you should be using on them; both things that are normally handled by this same component, when
not using the symbol feature.

Instead, this fork tries to automate this process by making it completely transparent for the developer. The
symbol prop is removed, and instead replaced by a new component: `FontAwesomeContext`. This component
can be configured with a set of icons that should be used as symbols. It will then render those icons as symbols
in a single location for you. Then, you use `FontAwesomeIcon` as you always did. It will be smart enough to know
if an icon is already cached, and will reuse it automatically if possible.

This has multiple advantages. First, it decouples the choice of icon from the choice of rasterizing the icon early.
Effectively, this means that any component made with `FontAwesomeIcon` will just work, no matter if the icons
where cached or not, leaving the decision of using caching as a performance improvement to the user of those
components. Seconds, it ensures that icons symbols will have the same look as normal icons and support the same
features, without manual intervention.

### Install
```
npm i "git+https://github.com/kawazoe/vue-fontawesome.git#3.x"
```

### Usage
```html
<template>
<app>
  <fa-context :symbols="symbols">
    <fa-icon icon="fas fa-recycle"></fa-icon> //< Uses a symbol
    <fa-icon icon="fas fa-trash"></fa-icon>   //< Rendered in place
  </fa-context>

  <fa-icon icon="fas fa-recycle"></fa-icon> //< Rendered in place
</app>
</template>

<script setup>
import { faRecycle } from '@fortawesome/free-solid-svg-icon';

const symbols = [faRecycle];
</script>
```

## Original README

---

<!-- toc -->

- [Documentation](#documentation)
- [How to Help](#how-to-help)
- [Contributors](#contributors)
- [Releasing this project (only project owners can do this)](#releasing-this-project-only-project-owners-can-do-this)

<!-- tocstop -->

## Documentation

Official documentation is hosted at fontawesome.com

Helpful Vue links:
- [Add Icons with Vue](https://fontawesome.com/docs/web/use-with/vue/add-icons)
- [Adding Icon Styling with Vue](https://fontawesome.com/docs/web/use-with/vue/style)

To find the Vue setup, go to our [Web docs](https://fontawesome.com/docs/web) and click the ***"Set Up with Vue"*** (left hand side menu).

## How to Help

Review the following docs before diving in:

* [CONTRIBUTING.md](CONTRIBUTING.md)
* [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

And then:

* Check the existing [issues](https://github.com/FortAwesome/vue-fontawesome/issues) and see if you can help!

## Contributors

The following contributors have either helped to start this project, have contributed
code, are actively maintaining it (including documentation), or in other ways
being awesome contributors to this project. **We'd like to take a moment to recognize them.**

|                                                              | Name            | GitHub                                                 |
| :----------------------------------------------------------: | --------------- | ------------------------------------------------------ |
| <img src="https://github.com/SirLamer.png?size=72" />        | SirLamer        | [@SirLamer](https://github.com/SirLamer)               |
| <img src="https://github.com/meteorlxy.png?size=72" />       | Liu Xinyu       | [@meteorlxy](https://github.com/meteorlxy)             |
| <img src="https://github.com/schulz3000.png?size=72" />      | Xaver Schulz    | [@schulz3000](https://github.com/schulz3000)           |
| <img src="https://github.com/ihmels.png?size=72" />          | Yannick Ihmels  | [@ihmels](https://github.com/ihmels)                   |
| <img src="https://github.com/btaens.png?size=72" />          | btaens          | [@btaens](https://github.com/btaens)                   |
| <img src="https://github.com/david-driscoll.png?size=72" />  | David Driscoll  | [@david-driscoll](https://github.com/david-driscoll)   |
| <img src="https://github.com/tyranteon.png?size=72" />       | Tyranteon       | [@tyranteon](https://github.com/tyranteon)             |
| <img src="https://github.com/rigma.png?size=72" />           | Romain Failla   | [@rigma](https://github.com/rigma)                     |
| <img src="https://github.com/viniciuslrangel.png?size=72" /> | Vinicius Rangel | [@viniciuslrangel](https://github.com/viniciuslrangel) |
| <img src="https://github.com/otijhuis.png?size=72" />        | Okke Tijhuis    | [@otijhuis](https://github.com/otijhuis)               |
| <img src="https://github.com/parkeyparker.png?size=72" />    | Aaron Parker    | [@parkeyparker](https://github.com/parkeyparker)       |

If we've missed someone (which is quite likely) submit a Pull Request to us and we'll get it resolved.

The Font Awesome team:

|                                                            | Name           | GitHub                                             |
| :--------------------------------------------------------: | -------------- | -------------------------------------------------- |
| <img src="https://github.com/supercodepoet.png?size=72" /> | Travis Chase   | [@supercodepoet](https://github.com/supercodepoet) |
| <img src="https://github.com/robmadole.png?size=72" />     | Rob Madole     | [@robmadole](https://github.com/robmadole)         |
| <img src="https://github.com/mlwilkerson.png?size=72" />   | Mike Wilkerson | [@mlwilkerson](https://github.com/mlwilkerson)     |
| <img src="https://github.com/talbs.png?size=72" />         | Brian Talbot   | [@talbs](https://github.com/talbs)                 |
| <img src="https://github.com/jasonlundien.png?size=72" />  | Jason Lundien  | [@jasonlundien](https://github.com/jasonlundien)   |

## Releasing this project (only project owners can do this)

See [DEVELOPMENT.md](DEVELOPMENT.md#release)
