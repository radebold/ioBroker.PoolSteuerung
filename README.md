
# iobroker.poolsteuerung

Adapter zur Steuerung eines Salzwasserpools.

## Standardwerte in dieser Version

Die Default-Werte wurden direkt aus den vorhandenen Skripten übernommen:

### pH-Skript
- pH Sensor: `ph803w.0.N7EtmEWYCMVBROOHzkV9zT.ph.value_korr`
- ORP Sensor: `ph803w.0.N7EtmEWYCMVBROOHzkV9zT.orp.value_korr`
- Dosierpumpe: `sonoff.0.SonoffDosierpumpePool.POWER`
- Umwälzpumpe: `sonoff.0.SonoffSP18.POWER`
- Chlorinator: `sonoff.0.SonoffChlorinator.POWER`
- Soll-pH: `7.2`
- Fördermenge: `16 ml/min`
- Konzentration: `14.7 %`
- Prüfzeiten: `12:00,15:00`
- ORP EIN/AUS: `720 / 780`

### Pumpen-/Chlorinator-Skript
- Pumpe EIN: `11:00`
- Chlorinator AUS: `15:30`
- Pumpe AUS: `17:00`

Hinweis: Das Icon ist jetzt als sichtbares Platzhalter-Icon enthalten.
