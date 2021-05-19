# homebridge-nature-remo-toggle-light

[![npm version](https://badge.fury.io/js/%40nu50218%2Fhomebridge-nature-remo-toggle-light.svg)](https://badge.fury.io/js/%40nu50218%2Fhomebridge-nature-remo-toggle-light)

On/Offが同じ信号のタイプの照明を無理やり対応させる奴です。

最後に送信されたOn/Offの値を保存しておくので、他のリモコンで操作すると同期がとれなくなります。

## 設定例

```json
{
  "accessory": "homebridge-nature-remo-toggle-light",
  "name": "my-light",
  "access_token": "access-token-xxxxxxxxxx",
  "signal_id": "signal-xxxxxxxxxx",
  // 操作したときに照度センサーの値の変化に矛盾が生じた場合に、もう一度信号を送信します。
  "use_illuminance": true
}
```
