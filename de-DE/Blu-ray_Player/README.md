# Blu-ray Player für macOS (de-DE)

```
===============================================================================
                       BLU-RAY PLAYER SIMULATOR (macOS)
                                Version 1.0
===============================================================================

Dieses Projekt simuliert die Umgebung und das Verhalten eines physischen 
Blu-ray-Players auf macOS. Da macOS keine native Blu-ray-Unterstützung bietet,
nutzt dieser Simulator Open-Source-Bibliotheken, um verschlüsselte und 
unverschlüsselte Blu-ray-Discs (oder ISO-Abbilder) direkt im System abzuspielen.

-------------------------------------------------------------------------------
1. VORAUSSETZUNGEN & ARCHITEKTUR
-------------------------------------------------------------------------------

Der Simulator setzt sich aus folgenden Komponenten zusammen:

* Wiedergabe-Engine: VLC Media Player (macOS-Version)
* Entschlüsselungs-Layer: Libbluray + Libaacs (für kommerzielle Discs)
* Paketmanager: Homebrew (zur einfachen Installation der Bibliotheken)

-------------------------------------------------------------------------------
2. INSTALLATIONSANLEITUNG (SCHRITT-FÜR-SCHRITT)
-------------------------------------------------------------------------------

Befolgen Sie diese Schritte, um die Simulator-Umgebung einzurichten:

Schritt 1: Homebrew installieren (falls nicht vorhanden)
-------------------------------------------------------
Öffnen Sie das Terminal (Programme -> Dienstprogramme -> Terminal) und 
geben Sie folgenden Befehl ein:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Schritt 2: VLC Media Player installieren
----------------------------------------
Laden Sie VLC für macOS von der offiziellen Website (videolan.org) herunter 
oder installieren Sie es über Homebrew:
brew install --cask vlc

Schritt 3: Libbluray & Libaacs installieren
-------------------------------------------
Geben Sie im Terminal folgenden Befehl ein, um die Emulations-Bibliotheken zu laden:
brew install libbluray libaacs

Schritt 4: AACS-Schlüssel konfigurieren (Wichtig für kommerzielle Discs)
----------------------------------------------------------------------
Blu-ray-Player benötigen Schlüssel, um Discs zu entschlüsseln. Erstellen Sie das
Verzeichnis für die Key-Datenbank:

mkdir -p ~/.config/aacs/

Laden Sie eine aktuelle „KEYDB.cfg“ (z. B. von findvuk.xyz oder vlc-bluray.whoknowsmy.name)
herunter und kopieren Sie sie in das neu erstellte Verzeichnis:

cp ~/Downloads/KEYDB.cfg ~/.config/aacs/

-------------------------------------------------------------------------------
3. BEDIENUNGSANLEITUNG (SIMULATION STARTEN)
-------------------------------------------------------------------------------

Szenario A: Simulation mit einer ISO-Datei (Blu-ray-Abbild)
1. Starten Sie VLC.
2. Drücken Sie Cmd + D (Medium öffnen).
3. Wählen Sie den Reiter „File“ oder „Blu-ray“.
4. Suchen Sie die ISO-Datei auf Ihrer Festplatte.
5. Aktivieren Sie das Kontrollkästchen „Blu-ray-Menüs aktivieren“ (BD-J).
6. Klicken Sie auf „Öffnen“.

Szenario B: Simulation mit einem externen Blu-ray-Laufwerk
1. Schließen Sie Ihr externes USB-Blu-ray-Laufwerk an den Mac auf.
2. Legen Sie die Blu-ray-Disc ein.
3. Starten Sie VLC und drücken Sie Cmd + D.
4. Wählen Sie den Reiter „Disc“ -> „Blu-ray“.
5. Wählen Sie Ihr Laufwerk aus und klicken Sie auf „Öffnen“.

-------------------------------------------------------------------------------
4. FUNKTIONSWEISE & SIMULATIONS-STEUERUNG
-------------------------------------------------------------------------------

Der Simulator unterstützt folgende Standard-Player-Funktionen über VLC-Hotkeys:

* Menü-Navigation:   Nutzen Sie die Maus oder die Pfeiltasten + Enter, um
                       im simulierten Java-Menü (BD-J) zu navigieren.
* Wiedergabe/Pause:  Leertaste
* Kapitel vor/zurück: Cmd + Pfeiltaste rechts / Cmd + Pfeiltaste links
* Audio-Spur ändern: Tastaturkürzel [ L ]
* Untertitel ein/aus: Tastaturkürzel [ S ]

-------------------------------------------------------------------------------
5. FEHLERBEHEBUNG (TROUBLESHOOTING)
-------------------------------------------------------------------------------

Fehler: "Diese Blu-ray-Disc benötigt eine Bibliothek für die AACS-Entschlüsselung"
-> Lösung: Die Datei `KEYDB.cfg` fehlt im Ordner `~/.config/aacs/` oder ist veraltet.
   Laden Sie eine aktuellere Key-Datenbank herunter.

Fehler: Das Blu-ray-Menü (BD-J) lädt nicht oder stürzt ab.
-> Lösung: BD-J benötigt Java (JRE) auf Ihrem Mac. Installieren Sie das offizielle
   Java Runtime Environment für macOS von oracle.com oder über Homebrew:
   brew install --cask temurin

Fehler: Das Laufwerk wird von macOS nicht erkannt.
-> Lösung: Viele externe Blu-ray-Laufwerke benötigen mehr Strom, als ein einzelner
   USB-Port liefert. Nutzen Sie ein Y-USB-Kabel oder einen USB-Hub mit eigener
   Stromversorgung.

-------------------------------------------------------------------------------
6. RECHTLICHER HINWEIS
-------------------------------------------------------------------------------
Dieses Projekt dient ausschließlich zu Simulations- und Bildungszwecken. Das 
Umgehen von Kopierschutzmechanismen für kommerzielle Zwecke ist illegal. Bitte 
nutzen Sie den Simulator nur mit eigenen, rechtmäßig erworbenen Medien.
===============================================================================
```