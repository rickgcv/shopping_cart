sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/m/library","sap/ui/core/BusyIndicator","sap/m/MessageBox"],function(e,t,o,i,n,s){"use strict";var r=i.URLHelper;return e.extend("socreation_test.SO_Create.controller.Detail",{formatter:o,currentSelectedObj:null,cartObjects:[],onInit:function(){var e=new t({busy:false,delay:0,lineItemListTitle:this.getResourceBundle().getText("detailLineItemTableHeading")});this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched,this);this.setModel(e,"detailView")},onSendEmailPress:function(){var e=this.getModel("detailView");r.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))},onListUpdateFinished:function(e){var t,o=e.getParameter("total"),i=this.getModel("detailView");if(this.byId("lineItemsList").getBinding("items").isLengthFinal()){if(o){t=this.getResourceBundle().getText("detailLineItemTableHeadingCount",[o])}else{t=this.getResourceBundle().getText("detailLineItemTableHeading")}i.setProperty("/lineItemListTitle",t)}},_onObjectMatched:function(e){var t=e.getParameter("arguments").objectId;this.getModel("appView").setProperty("/layout","TwoColumnsMidExpanded");this.getModel().metadataLoaded().then(function(){var e=this.getModel().createKey("ProductSet",{ProductID:t});this._bindView("/"+e)}.bind(this))},_bindView:function(e){var t=this.getModel("detailView");t.setProperty("/busy",false);this.getView().bindElement({path:e,events:{change:this._onBindingChange.bind(this),dataRequested:function(){t.setProperty("/busy",true)},dataReceived:function(){t.setProperty("/busy",false)}}})},_onBindingChange:function(){var e=this.getView(),t=e.getElementBinding();if(!t.getBoundContext()){this.getRouter().getTargets().display("detailObjectNotFound");this.getOwnerComponent().oListSelector.clearMasterListSelection();return}var o=t.getPath(),i=this.getResourceBundle(),n=e.getModel().getObject(o),s=n.ProductID,r=n.Name,a=this.getModel("detailView");console.log(n);this.currentSelectedObj=n;this.getOwnerComponent().oListSelector.selectAListItem(o)},_onMetadataLoaded:function(){var e=this.getView().getBusyIndicatorDelay(),t=this.getModel("detailView"),o=this.byId("lineItemsList"),i=o.getBusyIndicatorDelay();t.setProperty("/delay",0);t.setProperty("/lineItemTableDelay",0);o.attachEventOnce("updateFinished",function(){t.setProperty("/lineItemTableDelay",i)});t.setProperty("/busy",true);t.setProperty("/delay",e)},onCloseDetailPress:function(){this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen",false);this.getOwnerComponent().oListSelector.clearMasterListSelection();this.getRouter().navTo("master")},toggleFullScreen:function(){var e=this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen",!e);if(!e){this.getModel("appView").setProperty("/previousLayout",this.getModel("appView").getProperty("/layout"));this.getModel("appView").setProperty("/layout","MidColumnFullScreen")}else{this.getModel("appView").setProperty("/layout",this.getModel("appView").getProperty("/previousLayout"))}},onAddToCart:function(e){this.cartObjects.push(this.currentSelectedObj);console.log(this.cartObjects);this.getModel("utilModel").setProperty("/cartItems",this.cartObjects);s.show("Item : "+this.currentSelectedObj.Name+" has been Added to Cart",{icon:s.Icon.INFORMATION,title:"Item Added to Cart",actions:[s.Action.OK],emphasizedAction:s.Action.OK,onClose:function(e){}})},onCheckoutOkClick:function(e){var t=this;console.log(this.cartObjects);var o=this.getView().getModel();var i={CustomerName:"SAP",CustomerID:"0100000000",LifecycleStatus:"N",NoteLanguage:"EN",CurrencyCode:"EUR"};n.show();o.create("/SalesOrderSet",i,{success:function(e){console.log(e);n.hide();t.oConfirmDialog.close();s.show("Sale Order has been Created Successfully with SO ID : "+e.SalesOrderID,{icon:s.Icon.INFORMATION,title:"SO created",actions:[s.Action.OK],emphasizedAction:s.Action.OK,onClose:function(e){}});t.addSoLineItem(e)},error:function(e){console.log(e);s.show("Sale Order can Not to created, Please try again",{icon:s.Icon.INFORMATION,title:"SO creation Error",actions:[s.Action.OK],emphasizedAction:s.Action.OK,onClose:function(e){}});n.hide()}});console.log(this.cartObjects)},addSoLineItem:function(e){var t=this.getView().getModel();t.setDeferredGroups(["CreateSoLineItem"]);this.cartObjects.forEach(function(o,i){var n={SalesOrderID:e.SalesOrderID,ItemPosition:"00000000"+(i+1)+"0",ProductID:o.ProductID,Note:o.Name,CurrencyCode:o.CurrencyCode,GrossAmount:o.Price,NetAmount:o.Price,TaxAmount:o.Price,DeliveryDate:new Date,Quantity:"1",QuantityUnit:o.DimUnit};t.create("/SalesOrderLineItemSet",n,{groupId:"CreateSoLineItem",success:$.proxy(function(e){},this),error:$.proxy(function(){},this)})});t.submitChanges({groupId:"CreateSoLineItem",success:$.proxy(function(){console.log("ProxySess Changes Submit");this.getModel("utilModel").setProperty("/cartItems","");this.cartObjects=[]},this),error:$.proxy(function(){console.log("Proxy Error Changes Submit")},this)})},displayCart:function(){if(this.cartObjects.length===0){s.show("Shoping Cart is Empty",{icon:s.Icon.INFORMATION,title:"Empty Cart",actions:[s.Action.OK],emphasizedAction:s.Action.OK,onClose:function(e){}});return}if(!this.oConfirmDialog){this.oConfirmDialog=sap.ui.xmlfragment("cartItemDialog","socreation_test.SO_Create.view.fragments.displaycart",this);this.getView().addDependent(this.oConfirmDialog)}this.oConfirmDialog.open()},onCheckoutCancelClick:function(e){this.oConfirmDialog.close()},onAvatarPress:function(){s.information("Name  :  SAP.\n CustomerID: 0100000000 ")}})});