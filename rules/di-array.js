/**
 * disallow array expression in form of DI
 */

'use strict';
var angularRule = require('./utils/angular-rule');

module.exports = {
    meta: {
        fixable: 'code',
        docs: {
            url: 'https://github.com/Gillespie59/eslint-plugin-angular/blob/master/docs/rules/di-array.md'
        },
        schema: []
    },
    create: angularRule(function(context) {
        function reportUnusedVariables(callee, fn) {
            if (!fn) {
                return;
            }
            if (fn.parent.type === 'ArrayExpression') {
                context.report(fn, 'Use ArrayExpression');
            }
        }

        return {
            'angular?animation': reportUnusedVariables,
            'angular?config': reportUnusedVariables,
            'angular?controller': reportUnusedVariables,
            'angular?factory': reportUnusedVariables,
            'angular?filter': reportUnusedVariables,
            'angular?component': reportUnusedVariables,
            'angular?inject': reportUnusedVariables,
            'angular?run': reportUnusedVariables,
            'angular?service': reportUnusedVariables,
            'angular?provider': function(callee, providerFn, $get) {
                reportUnusedVariables(null, providerFn);
                reportUnusedVariables(null, $get);
            },
            'angular?directive': function(callee, directiveFn, controllerFn) {
                reportUnusedVariables(callee, directiveFn);
                reportUnusedVariables(callee, controllerFn);
            }
        };
    })
};
