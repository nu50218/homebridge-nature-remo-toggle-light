import Axios from 'axios';
import {
  AccessoryConfig,
  AccessoryPlugin,
  API,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  // eslint-disable-next-line comma-dangle
  Service,
} from 'homebridge';

const baseUrl = 'https://api.nature.global/1/';

let hap: HAP;

/*
 * Initializer function called when the plugin is loaded.
 */
export = (api: API) => {
  hap = api.hap;
  api.registerAccessory('homebridge-nature-remo-toggle-light', Accessory);
};

class Accessory implements AccessoryPlugin {
  private readonly log: Logging;
  private readonly config: AccessoryConfig;
  private readonly api: API;
  private readonly access_token: string;
  private readonly signal_id: string;
  private readonly use_illuminance: boolean;
  private readonly use_illuminance_TH: integer;

  private readonly informationService: Service;
  private readonly lightbulbService: Service;

  private state: CharacteristicValue;

  constructor(log: Logging, config: AccessoryConfig, api: API) {
    this.log = log;
    this.config = config;
    this.api = api;
    this.state = false;

    this.access_token = config.access_token as string;
    this.signal_id = config.signal_id as string;
    this.use_illuminance = config.use_illuminance as boolean;
    this.use_illuminance_TH = config.use_illuminance_TH as number;

    this.lightbulbService = new this.api.hap.Service.Lightbulb(
      this.config.name,
    );
    this.lightbulbService
      .getCharacteristic(this.api.hap.Characteristic.On)
      .on('get', this.getOnHandler.bind(this))
      .on('set', this.setOnHandler.bind(this));

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, 'homebridge.io')
      .setCharacteristic(hap.Characteristic.Model, 'homebridge')
      .setCharacteristic(hap.Characteristic.SerialNumber, 'ho-me-br-id-ge');

    log.info(
      'lightbulb',
      this.config.name,
      'finished initializing!',
      this.access_token,
      this.signal_id,
    );
  }

  /*
   * This method is optional to implement. It is called when HomeKit ask to identify the accessory.
   * Typical this only ever happens at the pairing process.
   */
  identify(): void {
    this.log('lightbulb', this.config.name, 'Identify!');
  }

  /*
   * This method is called directly after creation of this instance.
   * It should return all services which should be added to the accessory.
   */
  getServices(): Service[] {
    return [this.informationService, this.lightbulbService];
  }

  getOnHandler(callback: CharacteristicGetCallback) {
    this.log.info('Getting lightbulb state');
    callback(undefined, this.state);
    return;
  }

  async setOnHandler(
    targetState: CharacteristicValue,
    callback: CharacteristicSetCallback,
  ) {
    try {
      this.log.info('Setting lightbulb state to:', targetState);
      if(this.use_illuminance) {
        //set this.state to the actual illuminance state
        const prev_illuminance = await this.getIlluminance();
        this.log.info('Previous illuminance was:', prev_illuminance);
        this.state = (prev_illuminance > this.use_illuminance_TH);
      } 
      this.requestToggle().then(() => { //toggle lightbulb, anyway
        //ignore on to on, and off to off requests
        if(this.state == targetState) {
          //if it was on-to-on, or off-to-off request, cancel it by switching again
          await _sleep(700);
          this.requestToggle();
        }
        this.state = targetState;
      });
    } catch (err) {
      this.log('error:', err);
    } finally {
      callback(undefined);
    }
  }

  getIlluminance() {
    return Axios.get('/devices', {
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    }).then((res) => res.data[0].newest_events.il.val as number);
  }

  requestToggle() {
    return Axios.post('/signals/' + this.signal_id + '/send', null, {
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    });
  }
}
