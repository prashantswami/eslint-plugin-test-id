# eslint-plugin-test-id

This checks is data-test-id prop is present, on some tags which are useful for e2e testing

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-test-id`:

```
$ npm install eslint-plugin-test-id --save-dev
```


## Usage

Add `test-id` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "test-id"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "test-id/data-test-id": 'error'
    }
}
```

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```vue

<input v-model="someModel">

```

Examples of **correct** code for this rule:

```vue

<input data-test-id="someUniqueString" v-model="someModel">

```