const { Service, Characteristic } = require('../types');
const WyzeAccessory = require('./WyzeAccessory');

const HOMEBRIDGE_HUMIDITY_SERVICE = Service.HumidityService;
const HOMEBRIDGE_HUMIDITY_CHARACTERISTIC = Characteristic.CurrentRelativeHumidity;
const HOMEBRIDGE_TEMPERATURE_SERVICE = Service.TemperatureSensor;
const HOMEBRIDGE_TEMPERATURE_CHARACTERISTIC = Characteristic.CurrentTemperature;

module.exports = class WyzeThermostat extends WyzeAccessory {
  constructor(plugin, homeKitAccessory) {
    super(plugin, homeKitAccessory);

    this.getTemperatureCharacteristic();
    this.getHumidityCharacteristic();
  }

  getTemperatureSensorService() {
    this.plugin.log.debug(`[Thermostat] Retrieving previous service for "${this.display_name}"`);
    let service = this.homeKitAccessory.getService(HOMEBRIDGE_TEMPERATURE_SERVICE);

    if (!service) {
      this.plugin.log.debug(`[Thermostat] Adding service for "${this.display_name}"`);
      service = this.homeKitAccessory.addService(HOMEBRIDGE_TEMPERATURE_SERVICE);
    }

    return service;
  }

  getHumiditySensorService() {
    this.plugin.log.debug(`[Thermostat] Retrieving previous service for "${this.display_name}"`);
    let service = this.homeKitAccessory.getService(HOMEBRIDGE_HUMIDITY_SERVICE);

    if (!service) {
      this.plugin.log.debug(`[Thermostat] Adding service for "${this.display_name}"`);
      service = this.homeKitAccessory.addService(HOMEBRIDGE_HUMIDITY_SERVICE);
    }

    return service;
  }

  getTemperatureCharacteristic() {
    this.plugin.log.debug(`[Thermostat] Fetching status of "${this.display_name}"`);
    return this.getTemperatureSensorService().getCharacteristic(HOMEBRIDGE_TEMPERATURE_CHARACTERISTIC);
  }

  getHumidityCharacteristic() {
    this.plugin.log.debug(`[Thermostat] Fetching status of "${this.display_name}"`);
    return this.getHumiditySensorService().getCharacteristic(HOMEBRIDGE_HUMIDITY_CHARACTERISTIC);
  }

  updateCharacteristics(device) {
    this.plugin.log.debug(`[Thermostat] Updating status of "${this.display_name}"`);
    this.getTemperatureCharacteristic().updateValue(device.device_params.temperature);
    this.getHumidityCharacteristic().updateValue(device.device_params.humidity);
  }
};
