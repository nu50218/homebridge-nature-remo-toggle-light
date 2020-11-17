# homebridge-nature-remo-toggle-light

On/Offが同じ信号のタイプの照明を無理やり対応させる奴です。

最後に送信されたOn/Offの値を保存しておくので、他のリモコンで操作すると同期がとれなくなります。

## 設定例

```
{
  "accessory": "homebridge-nature-remo-toggle-light",
  "name": "my-light",
  "access_token": "access-token-xxxxxxxxxx",
  "signal_id": "signal-xxxxxxxxxx"
}
```
