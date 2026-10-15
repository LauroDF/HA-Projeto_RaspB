import psutil, socket, subprocess
from datetime import datetime

def collect_os_data():
    id_raspi = open('/sys/firmware/devicetree/base/model').read().replace('\x00', '').strip()

    net_interface = subprocess.check_output("ip route show default", shell=True, text=True).strip().split("dev")[1].split()[0]

    dict_state_connection = {}
    state_connection = subprocess.check_output("ip -br link | grep -E '^(eth|wlan)[0-9]+' | awk '{print $1, $2}'", shell=True, text=True).strip().splitlines()
    for line in state_connection:
        interface, status = line.split()
        dict_state_connection[interface] = status

    ip_raspi = subprocess.check_output(["hostname", "-I"], text=True).strip()

    netmask = None
    interfaces = psutil.net_if_addrs()
    if net_interface in interfaces:
        for address in interfaces[net_interface]:
            if address.family == socket.AF_INET:
                netmask = address.netmask
                break

    gateway_addr = subprocess.check_output("ip route show default | awk '{print $3}'", shell=True, text=True).strip()

    dns_servers = subprocess.check_output("grep nameserver /etc/resolv.conf | awk '{print $2}'", shell=True, text=True).strip().splitlines()

    current_date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    return {
        "id_raspi": id_raspi,
        "net_interface": net_interface,
        "state_connection": dict_state_connection,
        "ip_raspi": ip_raspi,
        "netmask": netmask, 
        "gateway_addr": gateway_addr, 
        "dns_servers": dns_servers, 
        "current_date": current_date
    }

def collect_connections_data():
        gateway_addr = subprocess.check_output("ip route show default | awk '{print $3}'", shell=True, text=True).strip()

        destinations = [
            gateway_addr,
            "10.1.25.111",
            "google.com"
        ]

        connections_list = []
        for destination in destinations:
            command = f"ping -c 1 -W 2 {destination}"
            result = subprocess.run(command, shell=True, text=True)

            state = "Online" if result.returncode == 0 else "Offline"
            current_time = datetime.now().strftime("%H:%M:%S")

            connections_list.append({
                "destination": destination,
                "state": state,
                "current_time": current_time
            })
        return connections_list
    