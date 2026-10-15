import psutil, subprocess
from datetime import datetime

def collect_os_data():
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')

    id_raspi = open('/sys/firmware/devicetree/base/model').read().replace('\x00', '').strip()

    ip_local = subprocess.check_output(["hostname", "-I"], text=True).strip()

    uptime = subprocess.check_output(["uptime", "-p"], text=True).strip()

    cpu_usage = f"{psutil.cpu_percent(interval=1)} %"

    cpu_temp = f"{round(int(open("/sys/class/thermal/thermal_zone0/temp").read()) / 1000, 2)} C"

    ram_usage_used = f"{round(memory.used / (1024 ** 3), 2)} GB"
    ram_usage_total = f"{round(memory.total / (1024 ** 3), 2)} GB"
    ram_usage_percent = f"{memory.percent} %"

    storage_usage_used = f"{round(disk.used / (1024 ** 3), 1)} GB"
    storage_usage_total = f"{round(disk.total / (1024 ** 3), 1)} GB"
    storage_usage_percent = f"{disk.percent} %"
    
    current_date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    
    return {
        "id_raspi": id_raspi,
        "ip_local": ip_local,
        "uptime": uptime,
        "cpu_usage": cpu_usage,
        "cpu_temp": cpu_temp,
        "ram_usage": {
            "ram_usage_used": ram_usage_used,
            "ram_usage_total": ram_usage_total,
            "ram_usage_percent": ram_usage_percent
        },
        "storage_usage": {
            "storage_usage_used": storage_usage_used,
            "storage_usage_total": storage_usage_total,
            "storage_usage_percent": storage_usage_percent
        },
        "current_date": current_date
    }
