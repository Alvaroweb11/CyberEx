FROM kalilinux/kali-rolling

# Instalar herramientas básicas y de GUI
RUN apt-get update && \
    apt-get install -y xfce4 xfce4-goodies xorg dbus-x11 x11-xserver-utils && \
    apt-get install -y sudo && \
    apt-get clean

# Crear un usuario no root y agregarlo al grupo sudo
RUN useradd -ms /bin/bash kali && echo "kali:kali" | chpasswd && adduser kali sudo

# Copiar el script de inicio y cambiar los permisos
COPY start.sh /tmp/start.sh
RUN chmod +x /tmp/start.sh

# Mover el script de inicio al directorio /home/kali
RUN mv /tmp/start.sh /home/kali/start.sh

# Agregar la configuración allowed_users=anybody al archivo de configuración de Xorg
RUN echo "allowed_users=anybody" >> /etc/X11/Xwrapper.config

# Configuración del entorno de trabajo
WORKDIR /home/kali
USER kali

CMD ["/home/kali/start.sh"]