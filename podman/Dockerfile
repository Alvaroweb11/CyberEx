# Dockerfile
FROM kalilinux/kali-rolling

# Actualizar el sistema e instalar los paquetes necesarios
RUN apt-get update && apt-get install -y \
    supervisor \
    xfce4 \
    tightvncserver \
    net-tools \
    dbus-x11 \
    nmap \
    metasploit-framework \
    wireshark \
    aircrack-ng \
    hydra \
    john \
    steghide \
    outguess

# Configurar vncserver
RUN mkdir -p ~/.vnc && echo "CyberWeb" | vncpasswd -f > ~/.vnc/passwd && chmod 600 ~/.vnc/passwd

# Crear el archivo xstartup
RUN echo "#!/bin/bash" > ~/.vnc/xstartup
RUN echo "dbus-launch --exit-with-session startxfce4 &" >> ~/.vnc/xstartup
RUN chmod +x ~/.vnc/xstartup

# Crear el archivo .Xauthority
RUN touch ~/.Xauthority

# Crear directorio para herramientas en el escritorio
RUN mkdir -p ~/Desktop/tools/nmap
RUN mkdir -p ~/Desktop/tools/metasploit
RUN mkdir -p ~/Desktop/tools/wireshark
RUN mkdir -p ~/Desktop/tools/aircrack-ng
RUN mkdir -p ~/Desktop/tools/hydra
RUN mkdir -p ~/Desktop/tools/john
RUN mkdir -p ~/Desktop/tools/steghide
RUN mkdir -p ~/Desktop/tools/outguess

# Nmap
RUN echo "[Desktop Entry]" > ~/Desktop/tools/nmap/nmap.desktop
RUN echo "Version=1.0" >> ~/Desktop/tools/nmap/nmap.desktop
RUN echo "Name=Nmap" >> ~/Desktop/tools/nmap/nmap.desktop
RUN echo "Comment=Network exploration tool and security/port scanner" >> ~/Desktop/tools/nmap/nmap.desktop
RUN echo "Exec=nmap" >> ~/Desktop/tools/nmap/nmap.desktop
RUN echo "Icon=utilities-terminal" >> ~/Desktop/tools/nmap/nmap.desktop
RUN echo "Terminal=true" >> ~/Desktop/tools/nmap/nmap.desktop
RUN echo "Type=Application" >> ~/Desktop/tools/nmap/nmap.desktop
RUN echo "Categories=Application;Network;" >> ~/Desktop/tools/nmap/nmap.desktop
RUN chmod +x ~/Desktop/tools/nmap/nmap.desktop

# Metasploit
RUN echo "[Desktop Entry]" > ~/Desktop/tools/metasploit/metasploit.desktop
RUN echo "Version=1.0" >> ~/Desktop/tools/metasploit/metasploit.desktop
RUN echo "Name=Metasploit" >> ~/Desktop/tools/metasploit/metasploit.desktop
RUN echo "Comment=Penetration testing framework" >> ~/Desktop/tools/metasploit/metasploit.desktop
RUN echo "Exec=msfconsole" >> ~/Desktop/tools/metasploit/metasploit.desktop
RUN echo "Icon=utilities-terminal" >> ~/Desktop/tools/metasploit/metasploit.desktop
RUN echo "Terminal=true" >> ~/Desktop/tools/metasploit/metasploit.desktop
RUN echo "Type=Application" >> ~/Desktop/tools/metasploit/metasploit.desktop
RUN echo "Categories=Application;Network;Security;" >> ~/Desktop/tools/metasploit/metasploit.desktop
RUN chmod +x ~/Desktop/tools/metasploit/metasploit.desktop

# Wireshark
RUN echo "[Desktop Entry]" > ~/Desktop/tools/wireshark/wireshark.desktop
RUN echo "Version=1.0" >> ~/Desktop/tools/wireshark/wireshark.desktop
RUN echo "Name=Wireshark" >> ~/Desktop/tools/wireshark/wireshark.desktop
RUN echo "Comment=Network Protocol Analyzer" >> ~/Desktop/tools/wireshark/wireshark.desktop
RUN echo "Exec=wireshark" >> ~/Desktop/tools/wireshark/wireshark.desktop
RUN echo "Icon=wireshark" >> ~/Desktop/tools/wireshark/wireshark.desktop
RUN echo "Terminal=false" >> ~/Desktop/tools/wireshark/wireshark.desktop
RUN echo "Type=Application" >> ~/Desktop/tools/wireshark/wireshark.desktop
RUN echo "Categories=Application;Network;" >> ~/Desktop/tools/wireshark/wireshark.desktop
RUN chmod +x ~/Desktop/tools/wireshark/wireshark.desktop

# Aircrack-ng
RUN echo "[Desktop Entry]" > ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop
RUN echo "Version=1.0" >> ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop
RUN echo "Name=Aircrack-ng" >> ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop
RUN echo "Comment=Wireless network audit tool" >> ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop
RUN echo "Exec=aircrack-ng" >> ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop
RUN echo "Icon=utilities-terminal" >> ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop
RUN echo "Terminal=true" >> ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop
RUN echo "Type=Application" >> ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop
RUN echo "Categories=Application;Network;" >> ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop
RUN chmod +x ~/Desktop/tools/aircrack-ng/aircrack-ng.desktop

# Hydra
RUN echo "[Desktop Entry]" > ~/Desktop/tools/hydra/hydra.desktop
RUN echo "Version=1.0" >> ~/Desktop/tools/hydra/hydra.desktop
RUN echo "Name=Hydra" >> ~/Desktop/tools/hydra/hydra.desktop
RUN echo "Comment=Network logon cracker" >> ~/Desktop/tools/hydra/hydra.desktop
RUN echo "Exec=hydra" >> ~/Desktop/tools/hydra/hydra.desktop
RUN echo "Icon=utilities-terminal" >> ~/Desktop/tools/hydra/hydra.desktop
RUN echo "Terminal=true" >> ~/Desktop/tools/hydra/hydra.desktop
RUN echo "Type=Application" >> ~/Desktop/tools/hydra/hydra.desktop
RUN echo "Categories=Application;Network;Security;" >> ~/Desktop/tools/hydra/hydra.desktop
RUN chmod +x ~/Desktop/tools/hydra/hydra.desktop

# John the Ripper
RUN echo "[Desktop Entry]" > ~/Desktop/tools/john/john.desktop
RUN echo "Version=1.0" >> ~/Desktop/tools/john/john.desktop
RUN echo "Name=John the Ripper" >> ~/Desktop/tools/john/john.desktop
RUN echo "Comment=Password cracker" >> ~/Desktop/tools/john/john.desktop
RUN echo "Exec=john" >> ~/Desktop/tools/john/john.desktop
RUN echo "Icon=utilities-terminal" >> ~/Desktop/tools/john/john.desktop
RUN echo "Terminal=true" >> ~/Desktop/tools/john/john.desktop
RUN echo "Type=Application" >> ~/Desktop/tools/john/john.desktop
RUN echo "Categories=Application;Security;" >> ~/Desktop/tools/john/john.desktop
RUN chmod +x ~/Desktop/tools/john/john.desktop

# Steghide
RUN echo "[Desktop Entry]" > ~/Desktop/tools/steghide/steghide.desktop
RUN echo "Version=1.0" >> ~/Desktop/tools/steghide/steghide.desktop
RUN echo "Name=Steghide" >> ~/Desktop/tools/steghide/steghide.desktop
RUN echo "Comment=Steganography tool" >> ~/Desktop/tools/steghide/steghide.desktop
RUN echo "Exec=steghide" >> ~/Desktop/tools/steghide/steghide.desktop
RUN echo "Icon=utilities-terminal" >> ~/Desktop/tools/steghide/steghide.desktop
RUN echo "Terminal=true" >> ~/Desktop/tools/steghide/steghide.desktop
RUN echo "Type=Application" >> ~/Desktop/tools/steghide/steghide.desktop
RUN echo "Categories=Application;Security;" >> ~/Desktop/tools/steghide/steghide.desktop
RUN chmod +x ~/Desktop/tools/steghide/steghide.desktop

# Outguess
RUN echo "[Desktop Entry]" > ~/Desktop/tools/outguess/outguess.desktop
RUN echo "Version=1.0" >> ~/Desktop/tools/outguess/outguess.desktop
RUN echo "Name=Outguess" >> ~/Desktop/tools/outguess/outguess.desktop
RUN echo "Comment=Steganographic tool" >> ~/Desktop/tools/outguess/outguess.desktop
RUN echo "Exec=outguess" >> ~/Desktop/tools/outguess/outguess.desktop
RUN echo "Icon=utilities-terminal" >> ~/Desktop/tools/outguess/outguess.desktop
RUN echo "Terminal=true" >> ~/Desktop/tools/outguess/outguess.desktop
RUN echo "Type=Application" >> ~/Desktop/tools/outguess/outguess.desktop
RUN echo "Categories=Application;Security;" >> ~/Desktop/tools/outguess/outguess.desktop
RUN chmod +x ~/Desktop/tools/outguess/outguess.desktop

# Configurar la variable de entorno USER
ENV USER cyberweb

# Copiar el archivo de configuración de supervisord al contenedor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Exponer el puerto VNC
EXPOSE 5901

# Iniciar supervisord al inicio del contenedor
CMD ["/usr/bin/supervisord"]
