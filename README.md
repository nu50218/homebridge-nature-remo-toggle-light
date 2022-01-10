# homebridge-nature-remo-toggle-light

[![npm version](https://badge.fury.io/js/%40nu50218%2Fhomebridge-nature-remo-toggle-light.svg)](https://badge.fury.io/js/%40nu50218%2Fhomebridge-nature-remo-toggle-light)

HomeBridge plugin for Nature-remo to controle a single IR-remo-button that toggles a lightbulb.

This plugin and HomeKit keeps on/off state of the lightbulb, however, this may not reflect actual lightbulb state when the bulb is turned on/off by the original remo or a wall-switch. The plugin uses illuminance sensor equipped in Nature-remo (not in 'mini') to update the status. It may take a few minutes to be updated.

## Config example

```json
{
  "accessory": "homebridge-nature-remo-toggle-light",
  "name": "my-light",
  "access_token": "access-token-xxxxxxxxxx",
  "signal_id": "signal-xxxxxxxxxx",
  //use illuminance sensor and threashold to update status
  "use_illuminance": true,
  "use_illuminancd_TH": 120
}
```
