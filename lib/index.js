/**
 * @fileoverview This checks is data-test-id prop is present, on some tags which are useful for e2e testing
 * @author prashant swami
 */
"use strict";
module.exports = {
  rules: {
    'data-test-id': require('./rules/data-test-id')
  },
  configs: {
    recommended: {
      plugins: [
        'test-id',
      ],
      rules: {
        'test-id/data-test-id': 'error'
      }
    }
  }
}
