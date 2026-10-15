const INTERVALO_ATUALIZACAO_MS = 5000;
const API_STATUS_URL =
    `${window.location.protocol}//${window.location.hostname}:5000/api/status`;

async function atualizarDados() {
    try {
        console.log("Buscando dados da Raspberry...");

        const resposta = await fetch(API_STATUS_URL);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        console.log("Dados recebidos:", dados);

        const hardware = dados.server_info;

        // Identificação
        document.getElementById('id-raspi').textContent =
            hardware.id_raspi;

        document.getElementById('ip-local').textContent =
            hardware.ip_local;

        // CPU
        document.getElementById('cpu-usage').textContent =
            hardware.cpu_usage;

        document.getElementById('cpu-temp').textContent =
            hardware.cpu_temp;

        // Barra da CPU
        const cpuPercentual = Number.parseFloat(hardware.cpu_usage);

        document.getElementById('cpu-barra').style.width =
            `${Math.min(100, Math.max(0, cpuPercentual || 0))}%`;

        // Memória
        document.getElementById('ram-usage').textContent =
            hardware.ram_usage.ram_usage_used;

        document.getElementById('ram-percent').textContent =
            `Utilização: ${hardware.ram_usage.ram_usage_percent} — Total: ${hardware.ram_usage.ram_usage_total}`;

        // Armazenamento
        document.getElementById('storage-usage').textContent =
            hardware.storage_usage.storage_usage_used;

        document.getElementById('storage-percent').textContent =
            `Utilização: ${hardware.storage_usage.storage_usage_percent} — Total: ${hardware.storage_usage.storage_usage_total}`;

        // Uptime
        document.getElementById('uptime').textContent =
            hardware.uptime;

        // Data
        document.getElementById('current-date').textContent =
            hardware.current_date;

        // Status
        document.querySelector('.status').textContent =
            'Online';

    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);

        document.querySelector('.status').textContent =
            'Erro ao conectar';
    } finally {
        window.setTimeout(atualizarDados, INTERVALO_ATUALIZACAO_MS);
    }
}

atualizarDados();