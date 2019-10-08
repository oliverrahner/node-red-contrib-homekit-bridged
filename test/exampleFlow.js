module.exports = [
    {
        id: '715d2971.329e48',
        type: 'homekit-service',
        z: '8af95dbb.a15e9',
        isParent: false,
        bridge: 'e0626687.5a3dd',
        parentService: '2b7e7cd6.eb9804',
        name: 'Temp Battery',
        serviceName: 'BatteryService',
        topic: '',
        filter: false,
        manufacturer: 'Default Manufacturer',
        model: 'Default Model',
        serialNo: 'Default Serial Number',
        characteristicProperties: '{}',
        x: 930,
        y: 340,
        wires: [[]],
    },
    {
        id: '2b7e7cd6.eb9804',
        type: 'homekit-service',
        z: '8af95dbb.a15e9',
        isParent: true,
        bridge: 'e0626687.5a3dd',
        parentService: '',
        name: 'Temperature Sensor',
        serviceName: 'TemperatureSensor',
        topic: '',
        filter: false,
        manufacturer: 'Default Manufacturer',
        model: 'Default Model',
        serialNo: 'Default Serial Number',
        characteristicProperties: '{}',
        x: 900,
        y: 180,
        wires: [[]],
    },
    {
        id: 'e0626687.5a3dd',
        type: 'homekit-bridge',
        z: '',
        bridgeName: 'release 05',
        pinCode: '111-11-111',
        port: '',
        allowInsecureRequest: false,
        manufacturer: 'Default Manufacturer',
        model: 'Default Model',
        serialNo: 'Default Serial Number',
    },
]
