sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/matchers/I18NText","sap/ui/test/actions/Press","sap/ui/test/matchers/PropertyStrictEquals"],function(e,t,o,n){"use strict";var a="page",r="NotFound",s="DetailObjectNotFound";e.createPageObjects({onTheNotFoundPage:{actions:{},assertions:{iShouldSeeTheNotFoundGeneralPage:function(t){return this.waitFor({controlType:"sap.m.MessagePage",viewName:t,success:function(){e.assert.ok(true,"Shows the message page")},errorMessage:"Did not reach the empty page"})},iShouldSeeTheNotFoundPage:function(){return this.iShouldSeeTheNotFoundGeneralPage(r)},iShouldSeeTheObjectNotFoundPage:function(){return this.iShouldSeeTheNotFoundGeneralPage(s)},theNotFoundPageShouldSayResourceNotFound:function(){return this.waitFor({id:a,viewName:r,matchers:[new t({key:"notFoundTitle",propertyName:"title"}),new t({key:"notFoundText",propertyName:"text"})],errorMessage:"Did not display the resource not found text"})},theNotFoundPageShouldSayObjectNotFound:function(){return this.waitFor({id:a,viewName:s,matchers:new t({key:"noObjectFoundText",propertyName:"text"}),errorMessage:"Did not display the object not found text"})}}}})});