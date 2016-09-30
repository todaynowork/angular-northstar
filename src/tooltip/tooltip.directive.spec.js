/*
 * Licensed Materials - Property of IBM
 *
 * (C) Copyright IBM Corp. 2016 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication, or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 * @author: Matt Parish <matthewparish@uk.ibm.com>
 * @author: Tom Ratcliffe <tomratcliffe@uk.ibm.com>
 **/
(function () {
    'use strict';

    var $compile,
        $scope,
        $timeout;

    var directiveElement,
        scope;

    var getCompiled = function getCompiledElement(str, scp){
        var compiledElement = $compile(str)(scp);
        scp.$digest();
        return compiledElement;
    };

    describe('Northstar Tooltip Directive', function() {
        beforeEach(function() {
            module('angular-northstar.tooltip');

            inject(function(_$compile_, _$rootScope_, _$timeout_){
                $compile = _$compile_;
                $scope = _$rootScope_;
                $timeout = _$timeout_;
            });

            directiveElement = getCompiled('<p><span data-widget="tooltip" title="A word that is difficult to understand" northstar-tooltip>complicated word</span></p>', $scope);
            scope = directiveElement.isolateScope();

            spyOn(window, 'jQuery').and.returnValue({
                tooltip: function() { return; }
            });
        });

        it('must not do anything until the next Angular cycle', function() {
            expect(window.jQuery)
                .not.toHaveBeenCalled();
        });

        it('must call the IBMCore init method after a $timeout', function() {
            $timeout.flush();

            expect(window.jQuery).toHaveBeenCalled();
        });
    });

})();
