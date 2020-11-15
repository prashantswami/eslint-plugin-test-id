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
            code: '<template><input data-test-id="test" model="test"></template>'
        }
    ],

    invalid: [
        {
            filename: 'test.vue',
            code: '<template><input model="test"></template>',
            output: '<template><input model="test"></template>',
            options: ['never'],
            errors: [
                {
                    message: "Element with model should have 'data-test-id'.",
                    type: 'VElement',
                    line: 1
                }
            ]
        },

        {
            filename: 'test.vue',
            code: '<template><custom model="test" /></template>',
            output: '<template><custom model="test" /></template>',
            options: ['never'],
            errors: [
                {
                    message: "Element with model should have 'data-test-id'.",
                    type: 'VElement',
                    line: 1
                }
            ]
        },
        
    ]
})