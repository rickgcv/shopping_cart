sap.ui.define(["sap/ui/test/opaQunit","./pages/NotFound","./pages/Master"],function(e){"use strict";QUnit.module("Phone not found");e("Should see the not found page if the hash is something that matches no route",function(e,o,t){e.iStartMyApp({hash:"somethingThatDoesNotExist"});t.onTheNotFoundPage.iShouldSeeTheNotFoundPage().and.theNotFoundPageShouldSayResourceNotFound();t.iTeardownMyApp()});e("Should see the not found detail page if an invalid object id has been called",function(e,o,t){e.iStartMyApp({hash:"/ProductSet/SomeInvalidObjectId"});t.onTheNotFoundPage.iShouldSeeTheObjectNotFoundPage().and.theNotFoundPageShouldSayObjectNotFound();t.iTeardownMyApp()});e("Should see the not found text for no search results",function(e,o,t){e.iStartMyApp();o.onTheMasterPage.iSearchForSomethingWithNoResults();t.onTheMasterPage.iShouldSeeTheNoDataTextForNoSearchResults();t.iTeardownMyApp()})});