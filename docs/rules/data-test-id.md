# Check data-test-id (data-test-id)

Please describe the origin of the rule here.

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
