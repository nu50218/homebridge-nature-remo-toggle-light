# homebridge-nature-remo-toggle-light

[![npm version](https://badge.fury.io/js/%40nu50218%2Fhomebridge-nature-remo-toggle-light.svg)](https://badge.fury.io/js/%40nu50218%2Fhomebridge-nature-remo-toggle-light)

Nature-remo plugin to controle a IR-remo button that toggle a lightbulb.

This keeps on/off state ( = HomeKit state ), which may not reflect actual lightbulb state especially when the bulb is turned on/off by the original remo or wall-switch.

## 設定例

```json
{
  "accessory": "homebridge-nature-remo-toggle-light",
  "name": "my-light",
  "access_token": "access-token-xxxxxxxxxx",
  "signal_id": "signal-xxxxxxxxxx",
  //if the current state does not reflect actual illuminance, toggle again
  "use_illuminance": true,
  "use_illuminancd_TH": 120
}
```
