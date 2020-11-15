/**
 * @fileoverview Check data-test-id
 * @author Prashant Swami
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/data-test-id"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------


const ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2015 }
})

ruleTester.run('data-test-id', rule, {
    valid: [
        {
            filename: 'test.vue',
            code: ''
        },
        {
            filename: 'test.vue',
            code: '<template><v-btn data-test-id="test" v-model="test" /></template>'
        }
    ],

    invalid: [
        {
            filename: 'test.vue',
            code: '<template><input v-model="test"></template>',
            output: '<template><input data-test-id="test" v-model="test"></template>',
            options: ['never'],
            errors: [
                {
                    message: "Expected 'data-test-id' with v-model.",
                    type: 'VElement',
                    line: 1
                }
            ]
        },

        {
            filename: 'test.vue',
            code: '<template><custom v-model="test.again.src" /></template>',
            output: '<template><custom data-test-id="test.again.src" v-model="test.again.src" /></template>',
            options: ['never'],
            errors: [
                {
                    message: "Expected 'data-test-id' with v-model.",
                    type: 'VElement',
                    line: 1
                }
            ]
        },

        {
            filename: 'test.vue',
            code: '<template><custom v-model="test.again" /></template>',
            output: '<template><custom data-test-id="test.again" v-model="test.again" /></template>',
            options: ['never'],
            errors: [
                {
                    message: "Expected 'data-test-id' with v-model.",
                    type: 'VElement',
                    line: 1
                }
            ]
        },

        {
            filename: 'test.vue',
            code: `<template><custom v-model="test['again']" /></template>`,
            output: `<template><custom data-test-id="test.again" v-model="test['again']" /></template>`,
            options: ['never'],
            errors: [
                {
                    message: "Expected 'data-test-id' with v-model.",
                    type: 'VElement',
                    line: 1
                }
            ]
        },

        {
            filename: 'test.vue',
            code: `<template><custom v-model="test[5]" /></template>`,
            output: `<template><custom data-test-id="test.5" v-model="test[5]" /></template>`,
            options: ['never'],
            errors: [
                {
                    message: "Expected 'data-test-id' with v-model.",
                    type: 'VElement',
                    line: 1
                }
            ]
        },

        {
            filename: 'test.vue',
            code: `<template><custom v-model="test[5]['val']" /></template>`,
            output: `<template><custom data-test-id="test.5.val" v-model="test[5]['val']" /></template>`,
            options: ['never'],
            errors: [
                {
                    message: "Expected 'data-test-id' with v-model.",
                    type: 'VElement',
                    line: 1
                }
            ]
        },
        
    ]
})