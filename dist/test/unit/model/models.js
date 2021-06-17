sap.ui.define(["socreation_test/SO_Create/model/models"],function(e){"use strict";QUnit.module("createDeviceModel",{afterEach:function(){this.oDeviceModel.destroy()}});function t(t,i){this.stub(sap.ui.Device,"system",{phone:i});this.oDeviceModel=e.createDeviceModel();t.strictEqual(this.oDeviceModel.getData().system.phone,i,"IsPhone property is correct")}QUnit.test("Should initialize a device model for desktop",function(e){t.call(this,e,false)});QUnit.test("Should initialize a device model for phone",function(e){t.call(this,e,true)});function i(t,i){this.stub(sap.ui.Device,"support",{touch:i});this.oDeviceModel=e.createDeviceModel();t.strictEqual(this.oDeviceModel.getData().support.touch,i,"IsTouch property is correct")}QUnit.test("Should initialize a device model for non touch devices",function(e){i.call(this,e,false)});QUnit.test("Should initialize a device model for touch devices",function(e){i.call(this,e,true)});QUnit.test("The binding mode of the device model should be one way",function(t){this.oDeviceModel=e.createDeviceModel();t.strictEqual(this.oDeviceModel.getDefaultBindingMode(),"OneWay","Binding mode is correct")})});