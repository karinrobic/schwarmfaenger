# Schwarmfänger

Ein Arcade-Shooter im Stil der klassischen Insektenschwarm-Spiele, mit einer Wendung: **Der Fangstrahl gehört dir.**

**Jetzt spielen:** https://karinrobic.github.io/schwarmfaenger/

## Die Wendung

Jeder Abschuss lädt deinen Fangstrahl auf. Ist er voll, fängst du damit einen Angreifer im Sturzflug ein. Er dreht um und fliegt als Flügelmann neben dir, mit seiner eigenen Schussart:

| Gegner   | Punkte (Formation / Sturzflug) | Als Flügelmann                 |
|----------|--------------------------------|--------------------------------|
| Wächter  | 150 / 400                      | Doppelschüsse, braucht 2 Treffer |
| Stachler | 80 / 160                       | zwei Schrägschüsse             |
| Qualle   | 50 / 100                       | gerader Schuss                 |

Bis zu zwei Flügelmänner passen in deine Staffel. Jeder, der eine Stufe überlebt, bringt 500 Bonuspunkte.

## Steuerung

| Taste         | Aktion                               |
|---------------|--------------------------------------|
| ← → / A D     | Bewegen                              |
| Leertaste     | Feuern (gedrückt halten)             |
| X / ↑         | Fangstrahl, wenn die Leiste voll ist |
| P             | Pause                                |
| M             | Ton an/aus                           |

Auf dem Handy erscheinen Touch-Tasten unter dem Spielfeld.

## Als App installieren

- **Handy:** Seite im Browser öffnen, dann „Zum Startbildschirm hinzufügen“ (iPhone: Teilen-Menü in Safari; Android: Chrome-Menü). Das Spiel läuft danach auch offline.
- **PC:** In Chrome oder Edge auf das Installieren-Symbol in der Adressleiste klicken.

## Technik

Eine einzige HTML-Datei mit Canvas und JavaScript, ohne Abhängigkeiten. Dazu kommen ein Web-App-Manifest und ein Service Worker (`sw.js`) für den Offline-Betrieb. Nach Änderungen am Spiel `VERSION` in `sw.js` erhöhen, damit installierte Apps die neue Version laden.
