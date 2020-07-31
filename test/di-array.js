'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/di-array');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('di-array', rule, {
    valid: [
        'angular.module("").controller("", function($q) {return $q;});',
        'angular.module("").controller("", function controller($q) {return $q;});',
        'angular.module("").animation("", function($q) {return $q;});',
        'angular.module("").animation("", function animation($q) {return $q;});',
        'angular.module("").directive("", function($q) {return $q;});',
        'angular.module("").directive("", function directive($q) {return $q;});',
        'angular.module("").factory("", function($q) {return $q;});',
        'angular.module("").factory("", function factory($q) {return $q;});',
        'angular.module("").factory("", function($q) {return function() {return $q;};});',
        'angular.module("").factory("", function() {var myVar;});',
        'angular.module("").filter("", function($q) {return $q;});',
        'angular.module("").filter("", function filter($q) {return $q;});',
        'angular.module("").provider("", function($httpProvider) {return $httpProvider;});',
        'angular.module("").provider("", function provider($httpProvider) {return $httpProvider;});',
        'angular.module("").service("", function($q) {return $q;});',
        'angular.module("").service("", function service($q) {return $q;});',
        'angular.module("").config(function($httpProvider) {$httpProvider.defaults.headers.post.answer="42"})',
        'angular.module("").config(function config($httpProvider) {$httpProvider.defaults.headers.post.answer="42"})',
        'angular.module("").run(function($q) {$q()})',
        'angular.module("").run(function run($q) {$q()})',
        'inject(function($q) {_$q_ = $q;});',
        'inject(function inject($q) {_$q_ = $q;});',
        'angular.module("").provider("", function() {this.$get = function($q) {return $q};});',
        // Potential crashes
        'angular.module("").animation("", "");',
        'angular.module("").config("");',
        'angular.module("").controller("", "");',
        'angular.module("").directive("", "");',
        'angular.module("").factory("", "");',
        'angular.module("").filter("", "");',
        'angular.module("").provider("", "");',
        'angular.module("").run("");',
        'angular.module("").service("", "");'
    ].concat(commonFalsePositives),
    invalid: [
        // all cases
        {
            code: 'angular.module("").controller("", ["$q", function($q) {return $q;}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").animation("", ["$q", function($q) {return $q;}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").directive("", ["$q", function($q) {return $q;}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").filter("", ["$q", function($q) {return $q;}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").provider("", ["$$httpProvider", function($$httpProvider) {return $$httpProvider;}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        },
        {
            code: 'angular.module("").service("", ["$q", function($q) {return $q;}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").config(["$httpProvider", function($httpProvider) {$httpProvider.defaults.headers.post.answer="42"}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").controller("", ["q", function($q) {}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").run(["$q", function($q) {return $q;}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").provider("", function() {this.$get = ["$q", function($q) {return $q}];});',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").factory("", ["q", function($q) {}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").factory("", ["q", $q => {}]);',
            errors: [{message: 'You should not use array expression for DI'}],
            parserOptions: {ecmaVersion: 6}
        }, {
            code: 'angular.module("").config(["$httpProvider", function($httpProvider) {}])',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("").config(["$httpProvider", function config($httpProvider) {}])',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'inject(["q", function($q) {}]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }, {
            code: 'angular.module("myapp").filter("myfilter", [ "$translate", "$filter", function ($translate, $filter) { return function (value) { return $filter(value, 4) * 100; } } ]);',
            errors: [{message: 'You should not use array expression for DI'}]
        }
    ]
});
