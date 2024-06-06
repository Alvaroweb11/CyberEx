#!/bin/bash

# Iniciar el servicio DBUS
sudo service dbus start

# Iniciar xfce4-session
startxfce4 &
sleep 5

# Mantener el contenedor en ejecución
tail -f /dev/null
