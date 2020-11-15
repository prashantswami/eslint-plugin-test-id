/**
 * @fileoverview Rule to check data-test-id
 * @author Prashant Swami
 */

"use strict";
/**
 *
 * @param {Array} arrAttributes
 * @param {String} attributeName
 */
function isAttributePresent(arrAttributes, attributeName) {
    if (!arrAttributes || (Array.isArray(arrAttributes) && arrAttributes.length === 0)) {
        return false;
    }
    return arrAttributes.find((attribute) => attribute.directive ? attribute.key.name.name === attributeName : attribute.key.name === attributeName );
}

function defineTemplateBodyVisitor(
    context,
    templateBodyVisitor,
    scriptVisitor
) {
    if (context.parserServices.defineTemplateBodyVisitor == null) {
        const filename = context.getFilename()
        if (path.extname(filename) === '.vue') {
            context.report({
                loc: { line: 1, column: 0 },
                message:
                    'Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error.'
            })
        }
        return {}
    }
    return context.parserServices.defineTemplateBodyVisitor(
        templateBodyVisitor,
        scriptVisitor
    )
}


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "Add data-test-id for tag",
            category: "Best Practices",
            recommended: true,
        },
        fixable: "code",
        schema:  [
            {
              enum: ['always', 'never']
            }
        ]
    },

    create: function(context) {
        const options = context.options[0] || 'always'
        const template =
            context.parserServices.getTemplateBodyTokenStore &&
            context.parserServices.getTemplateBodyTokenStore()
        return defineTemplateBodyVisitor(context, {
            VElement(node) {
                const attributes = node.startTag.attributes;
                if (!attributes || Array.isArray(attributes) && attributes.length === 0 ) {
                    return;
                }
                const isModelPresent = isAttributePresent(attributes, 'model');
                const isDataIdPresent = isAttributePresent(attributes, 'data-test-id');
                if(isModelPresent && !isDataIdPresent) {
                    const firstToken = template.getFirstToken(node);
                    context.report({
                        node,
                        loc: firstToken.loc,
                        message: "Expected 'data-test-id' with v-model.",
                        suggest: [
                            {
                                desc: 'Add data-test-id="unique-key"',
                                fix: (fixer) => {
                                    return fixer.insertTextAfter(firstToken, ` data-test-id="${isModelPresent.value.expression.name}"`);
                                }
                            }
                        ],
                        fix: (fixer) => {
                            return fixer.insertTextAfter(firstToken, ` data-test-id="${isModelPresent.value.expression.name}"`);
                        }
                    })
                }
            }
        })
    }
};
