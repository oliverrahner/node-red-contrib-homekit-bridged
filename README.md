# node-red-contrib-homekit-bridged

master [![Build Status](https://travis-ci.org/Shaquu/node-red-contrib-homekit-bridged.svg?branch=master)](https://travis-ci.org/Shaquu/node-red-contrib-homekit-bridged) / dev [![Build Status](https://travis-ci.org/Shaquu/node-red-contrib-homekit-bridged.svg?branch=dev)](https://travis-ci.org/Shaquu/node-red-contrib-homekit-bridged)

Node-RED nodes to simulate Apple HomeKit devices. Based on node-red-contrib-homekit, but with support for bridged devices.

## Intro

These nodes allow the creation of fully customizable accessories for use in Apple's Home app on iOS and Mac OS. If you can get it in Node-RED, you can get it in HomeKit. The goal of the project is to create a platform where official HomeKit hardware can be emulated as closely as possible through node red.

## Prerequisites

These nodes are based on the _extremely_ **awesome** [HAP-NodeJS](https://github.com/KhaosT/HAP-NodeJS) -Project which uses an implementation of mdns to provide Bonjour / Avahi capability.
Please refer to the HAP-NodeJS [Wiki](https://github.com/KhaosT/HAP-NodeJS/wiki) and to [mdns](https://www.npmjs.com/package/mdns) for install instructions, if you get stuck on the following.

## Install

For Debian / Ubuntu you need to install the following in order to support Bonjour / Avahi

        sudo apt-get install libavahi-compat-libdnssd-dev

Then run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-homekit-bridged

### Docker

You can also pull a [docker image](https://hub.docker.com/r/raymondmm/node-red-homekit/) containing everything needed to get started, thanks to [raymondmm (Raymond Mouthaan)](https://github.com/RaymondMouthaan).

Please see instructions on Docker Hub.

## Nodes

### Bridge

The Bridge node is a configuration node, specifying the _bridge_ that iOS sees, i.e. the device that is manually being added by the user.
All accessories behind a bridge noded are then automatically added by iOS.

- **Pin Code**: Specify the Pin for the pairing process.
- **Port**: If you are behind a Firewall, you may want to specify a port. Otherwise leave empty.
- **Allow Insecure Request**: Should we allow insecure request? Default false.
- **Manufacturer, Model, Serial Number**: Can be anything you want.
- **Name**: Can be anything you want.

### Service

The Service node represents the single device you want to control or query.
Every service node can be _Parent_ or _Linked_. each Parent service creates an individual accessory in the Home app. Linked services add additional features to their Parent service - for example adding battery status to a motion detector. See examples in the [wiki](https://github.com/oliverrahner/node-red-contrib-homekit-bridged/wiki) for details.

- **Topic**: An optional property that can be configured in the node or, if left blank, can be set by `msg.topic`.
- **Service Hierarchy**: Whether the service is _Parent_ or _Linked_.
- **Bridge**: On what bridge to host this Service and its Accessory.
- **Parent Service**: Which Parent service the Linked service will be connected to.
- **Service**: Choose the type of Service from the list. [Services wiki](https://github.com/oliverrahner/node-red-contrib-homekit-bridged/wiki/Services)
- **Topic**: 
- **Manufacturer, Model, Serial Number**: Can be anything you want.
- **Name**: If you intend to simulate a rocket, then why don't you call it _Rocket_.
- **Characteristic Properties**: Customise the properties of characteristics. [Characteristics wiki](https://github.com/oliverrahner/node-red-contrib-homekit-bridged/wiki/Characteristics)

## Input Messages

Input messages can be used to update any _Characteristic_ that the selected _Service_ provides. Simply pass the values-to-update as `msg.payload` object.

**Example**: to signal that an _Outlet_ is turned on and in use, send the following payload

```json
{
  "On": 1,
  "OutletInUse": 1
}
```

**Hint**: to find out what _Characteristics_ you can address, just send `{"foo":"bar"}` and watch the debug tab ;)

## Output Messages

Output messages are in the same format as input messages. They are emitted from the node when it receives _Characteristics_ updates from a paired iOS device.

## Supported Types

The following is a list of _Services_ that are currently supported. If you encounter problems with any of them please file an Issue.

- Air Quality Sensor
- Battery Service
- Camera Control
- Camera RTP Stream Management
- Carbon Dioxide Sensor
- Carbon Monoxide Sensor
- Contact Sensor
- Door
- Doorbell
- Fan
- Garage Door Opener
- Humidity Sensor
- Leak Sensor
- Light Sensor
- Lightbulb
- Lock Management
- Lock Mechanism
- Microphone
- Motion Sensor
- Occupancy Sensor
- Outlet
- Relay
- Security System
- Smoke Sensor
- Speaker
- Stateful Programmable Switch
- Stateless Programmable Switch
- Switch
- Temperature Sensor
- Thermostat
- Time Information
- Window
- Window Covering

## Context

Context info can be provided as part of the input message and will be available in the output message as `hap.context`.

**Example**:

```json
{
  "On": 1,
  "Context": "set_from_mqtt_topic"
}
```

## No Response

You can set accessory "No Response" status by sending "NO_RESPONSE" as a value for any available characteristic.

**Example**:

```json
{
  "On": "NO_RESPONSE"
}
```

After "No Response" status was triggered, the accessory is marked accordingly when you try to control it or reopen Home.app.
Any subsequent update of any characteristic value will reset this status.

## FAQ

#### How can I get started?

Our [wiki page](https://github.com/oliverrahner/node-red-contrib-homekit-bridged/wiki) has a growing list of examples and explanations of how to use many features of these nodes. After you've gone through the wiki page and you are still having questions, please open an issue.

#### How can I upgrade from the non-bridged node-red-contrib-homekit?

[How to upgrade from node-red-homekit](https://github.com/oliverrahner/node-red-contrib-homekit-bridged/wiki/Upgrade-Information)

#### How can I generate Debug logs?

Stop your node-red instance and start it again using the following command:
`DEBUG=Accessory,HAPServer,EventedHTTPServer node-red`

This should output detailed information regarding everything in the homekit context.

#### The same command gets sent over and over. How do I stop that?

#### I only want to get messages when something has been changed in the Home app, but also all messages I send into the homekit node get forwarded, too. How do I stop that?

Insert this node right after your homekit node:

```
[{"id":"","type":"switch","z":"","name":"check hap.context","property":"hap.context","propertyType":"msg","rules":[{"t":"nnull"}],"checkall":"true","repair":false,"outputs":1,"x":0,"y":0,"wires":[]}]
```

This will filter out all messages with their payload property hap.context not set, which means they are events that have been sent to homekit via node-red, not via the Home app.


## Contributors

#### Big thanks to [all who have contributed to the project](https://github.com/node-red-contrib-homekit/node-red-contrib-homekit-bridged/graphs/contributors). 

[Shaq](https://github.com/Shaquu) - leading the current efforts to fix bugs and add features

[Oliver Rahner](https://github.com/oliverrahner) - reworked the code to add bridged mode - [read his story](https://github.com/node-red-contrib-homekit/node-red-contrib-homekit-bridged/wiki/Credits#oliver-rahner-explains-his-work)

[Marius Schmeding](https://github.com/mschm/node-red-contrib-homekit) - original creator of node-red-contrib-homekit

[HAP-NodeJS](https://github.com/KhaosT/HAP-NodeJS) - essential NodeJS implementation of Apple's HomeKit Accessory Server
