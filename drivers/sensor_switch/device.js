'use strict';
const Homey = require('homey');
const ZigBeeDevice = require('homey-meshdriver').ZigBeeDevice;

class XiaomiWirelessSwitch extends ZigBeeDevice {
	onMeshInit() {
		// define and register FlowCardTriggers
		this.triggerButton1_scene = new Homey.FlowCardTriggerDevice('button1_scene');
		this.triggerButton1_scene
			.register()
			.registerRunListener((args, state) => {
				return Promise.resolve(args.scene === state.scene);
			});
		this.triggerButton1_button = new Homey.FlowCardTriggerDevice('button1_button');
		this.triggerButton1_button
			.register();

		this.registerAttrReportListener('genOnOff', 0x8000, 1, 3600, 1, this.onOnOffListener.bind(this), 0);
		this.registerAttrReportListener('genOnOff', 'onOff', 1, 3600, 1, this.onOnOffListener.bind(this), 0);
	}

	onOnOffListener(data) {
		if (data !== 0) {
			this.log('genOnOff - onOff', data);
			const keyPresses = data || 1;
			const remoteValue = {
				scene: `Key Pressed ${keyPresses} time${keyPresses === 1 ? '' : 's'}`,
			};
			// Trigger the trigger card with 1 dropdown option
			this.triggerButton1_scene.trigger(this, this.triggerButton1_scene.getArgumentValues, remoteValue);
			// Trigger the trigger card with tokens
			this.triggerButton1_button.trigger(this, remoteValue, null);
		}
	}
}
module.exports = XiaomiWirelessSwitch;

// sensor_switch
/*
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ZigBeeDevice has been inited
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ------------------------------------------
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] Node: 8dd56393-7c25-4191-bc4d-7b87d44ae5fb
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] - Battery: false
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] - Endpoints: 0
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] -- Clusters:
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] --- zapp
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] --- genBasic
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- cid : genBasic
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- sid : attrs
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- modelId : lumi.sensor_switch
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] --- genIdentify
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- cid : genIdentify
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- sid : attrs
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] --- genGroups
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- cid : genGroups
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- sid : attrs
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] --- genScenes
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- cid : genScenes
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- sid : attrs
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] --- genOnOff
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- cid : genOnOff
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- sid : attrs
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- onOff : 1
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] --- genLevelCtrl
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- cid : genLevelCtrl
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- sid : attrs
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] --- genOta
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- cid : genOta
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- sid : attrs
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] --- manuSpecificCluster
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- cid : manuSpecificCluster
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ---- sid : attrs
2017-10-23 21:26:29 [log] [ManagerDrivers] [sensor_switch] [0] ------------------------------------------
*/
