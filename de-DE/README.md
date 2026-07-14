# macOS Simulator (de-DE)

```
========================================================================
             macOS Resource Simulator (SysSim-macOS) v1.0
========================================================================

Ein leichtgewichtiges Kommandozeilen-Werkzeug (CLI) für macOS, um gezielt 
künstliche CPU- und RAM-Auslastungen zu simulieren. Ideal zum Testen von 
Monitoring-Tools, Lüftersteuerungen oder Energiespar-Szenarien.

------------------------------------------------------------------------
1. SYSTEMVORAUSSETZUNGEN
------------------------------------------------------------------------

* Betriebssystem: macOS 12.0 (Monterey) oder neuer
* Prozessor: Intel oder Apple Silicon (M1/M2/M3/M4)
* Python: Version 3.9 oder höher vorinstalliert (Standard unter macOS)

------------------------------------------------------------------------
2. SCHNELLSTART (INSTALLATION)
------------------------------------------------------------------------

Da der Simulator auf Python basiert, ist keine komplexe Installation nötig.

1. Öffne das Terminal auf deinem Mac (Programme -> Dienstprogramme -> Terminal).
2. Navigiere in das Projektverzeichnis:
   $ cd /Pfad/zu/deinem/Projektordner

3. Installiere (optional) die Abhängigkeiten für die grafische CLI-Darstellung:
   $ pip3 install -r requirements.txt

------------------------------------------------------------------------
3. BEDIENUNG UND ANWENDUNG
------------------------------------------------------------------------

Starte den Simulator direkt über das Terminal. 

Syntax:
  python3 syssim.py [Optionen]

Wichtige Parameter:
  --cpu <Prozent>     Simuliert eine dauerhafte CPU-Auslastung (z.B. --cpu 75)
  --cores <Anzahl>    Bestimmt die Anzahl der zu belastenden CPU-Kerne
  --ram <Gigabyte>    Belegt die angegebene Menge an Arbeitsspeicher (z.B. --ram 4)
  --duration <Sek>    Laufzeit der Simulation in Sekunden (Standard: unendlich)

Beispiele:

* Einen einzelnen CPU-Kern zu 50% für 30 Sekunden auslasten:
  $ python3 syssim.py --cpu 50 --cores 1 --duration 30

* 4 GB Arbeitsspeicher belegen, bis das Programm manuell beendet wird:
  $ python3 syssim.py --ram 4

* Volllast-Simulation (8 Kerne bei 100%):
  $ python3 syssim.py --cpu 100 --cores 8

------------------------------------------------------------------------
4. SICHERHEITSHINWEISE
------------------------------------------------------------------------

> ACHTUNG: Hohe CPU-Auslastungen erzeugen Hitze. Die Lüfter deines Macs 
> werden hochdrehen. Dies ist ein normales Verhalten. 
> Der Simulator besitzt eine automatische Schutzabschaltung bei kritischen 
> Systemzuständen, dennoch erfolgt die Nutzung auf eigene Gefahr.

Um eine laufende Simulation jederzeit sofort abzubrechen, drücke im 
Terminal die Tastenkombination:

  [ Control ] + [ C ]

------------------------------------------------------------------------
5. DEINSTALLATION
------------------------------------------------------------------------

Um den Simulator rückstandslos zu entfernen, lösche einfach den gesamten
Projektordner. Es werden keine systemweiten Hintergrunddienste (LaunchDaemons)
installiert.

------------------------------------------------------------------------
Lizenz: MIT License | Entwickelt für macOS (de-DE)
========================================================================
```