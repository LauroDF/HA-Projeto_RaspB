async function atualizarDados() {
    const statusEl = document.querySelector('.status');
    const tabelaBody = document.querySelector('#tabela-conexoes tbody');

    try {
        statusEl.textContent = 'Atualizando...';
        console.log("1 - Iniciando requisição");

        // URL da API da Raspberry Pi
        const resposta = await fetch('http://10.1.25.108:8000/api/status');

        console.log("2 - Resposta recebida:", resposta);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log("3 - Dados:", dados);

        // ==========================================
        // 1. Preencher Informações do Servidor (server_info)
        // ==========================================
        const info = dados.server_info;

        document.getElementById('server-id').textContent = info.id_raspi || 'N/A';
        document.getElementById('server-ip').textContent = info.ip_raspi || 'N/A';
        document.getElementById('server-iface').textContent = info.net_interface || 'N/A';
        document.getElementById('server-netmask').textContent = info.netmask || 'N/A';
        document.getElementById('server-gateway').textContent = info.gateway_addr || 'N/A';
        
        // DNS é um array, juntamos com vírgula
        const dnsList = info.dns_servers ? info.dns_servers.join(', ') : 'N/A';
        document.getElementById('server-dns').textContent = dnsList;
        
        document.getElementById('server-date').textContent = info.current_date || 'N/A';
        document.getElementById('api-status').textContent = dados.status || 'API rodando';

        // ==========================================
        // 2. Preencher Estado das Interfaces (state_connection)
        // ==========================================
        const estado = info.state_connection;
        document.getElementById('state-eth0').textContent = estado.eth0 || 'N/A';
        document.getElementById('state-wlan0').textContent = estado.wlan0 || 'N/A';

        // ==========================================
        // 3. Preencher Tabela de Conexões (connection_attempts)
        // ==========================================
        tabelaBody.innerHTML = ''; // Limpa a tabela antes de preencher

        if (dados.connection_attempts && dados.connection_attempts.length > 0) {
            dados.connection_attempts.forEach(tentativa => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid #edf0f4';

                // Define a cor do texto baseado no estado
                let corEstado = '#202938'; // cor padrão
                if (tentativa.state === 'Online') corEstado = '#12b76a'; // verde
                if (tentativa.state === 'Offline') corEstado = '#f04438'; // vermelho

                tr.innerHTML = `
                    <td style="padding: 10px;">${tentativa.destination}</td>
                    <td style="padding: 10px;">${tentativa.current_time}</td>
                    <td style="padding: 10px; color: ${corEstado}; font-weight: bold;">${tentativa.state}</td>
                `;
                tabelaBody.appendChild(tr);
            });
        } else {
            tabelaBody.innerHTML = '<tr><td colspan="3" style="padding: 10px; text-align: center;">Nenhum teste de conexão realizado.</td></tr>';
        }

        // Atualiza o status global no cabeçalho
        statusEl.textContent = 'Online';

    } catch (erro) {
        console.error("ERRO COMPLETO:", erro);
        statusEl.textContent = 'Erro ao conectar';
        
        // Limpa a tela em caso de erro
        document.getElementById('server-id').textContent = '--';
        document.getElementById('server-ip').textContent = '--';
        document.getElementById('server-iface').textContent = '--';
        document.getElementById('server-netmask').textContent = '--';
        document.getElementById('server-gateway').textContent = '--';
        document.getElementById('server-dns').textContent = '--';
        document.getElementById('server-date').textContent = '--';
        document.getElementById('api-status').textContent = '--';
        document.getElementById('state-eth0').textContent = '--';
        document.getElementById('state-wlan0').textContent = '--';
        
        if (tabelaBody) {
            tabelaBody.innerHTML = '<tr><td colspan="3" style="padding: 10px; text-align: center; color: #f04438;">Falha na comunicação com o servidor.</td></tr>';
        }
    }
}

// Executa a função assim que a página carregar
document.addEventListener('DOMContentLoaded', atualizarDados);