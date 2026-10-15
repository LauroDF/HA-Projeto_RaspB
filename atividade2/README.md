# Atividade 2 — Monitor de Rede Local

## Sobre a atividade

Esta atividade consiste no desenvolvimento de um monitor de rede local utilizando a Raspberry Pi. A aplicação apresenta as configurações de rede do equipamento e realiza testes de conectividade com destinos selecionados, permitindo visualizar se a comunicação está funcionando.

O projeto utiliza Python e Flask no backend, enquanto o frontend é responsável por apresentar as informações e os resultados dos testes em uma interface web.

## Funcionalidades

### Informações da rede

O monitor apresenta informações como:

- Identificação da Raspberry Pi.
- Endereço IP local.
- Interface de rede utilizada.
- Estado das interfaces de rede.
- Máscara de rede.
- Gateway padrão.
- Servidores DNS configurados.
- Data e hora da última verificação.

### Testes de conectividade

A aplicação realiza verificações de comunicação com diferentes destinos, incluindo:

- **Gateway:** verifica a conectividade com o gateway da rede.
- **Dispositivo local:** testa a comunicação com outro dispositivo ou serviço da rede local.
- **Destino externo:** verifica a conectividade com um endereço ou serviço externo.

Os resultados são apresentados com o destino consultado, o estado da conexão e o horário do teste. O tempo de resposta pode ser exibido quando estiver disponível nos dados fornecidos pelo backend.

A indisponibilidade de um destino deve ser apresentada como resultado do teste, sem impedir necessariamente a exibição das demais informações.

## Tecnologias utilizadas

- **Python:** coleta das informações de rede e execução dos testes.
- **Flask:** disponibilização dos dados por meio de uma API.
- **HTML:** estrutura da página.
- **CSS:** aparência e organização visual.
- **JavaScript:** requisições à API e atualização das informações.

## Organização dos arquivos

```text
atividade2/
├── README.md
├── backend/
│   ├── main.py
│   └── hardware.py
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

## Como funciona

O backend coleta as configurações de rede da Raspberry Pi e executa os testes de conectividade. Em seguida, disponibiliza as informações em formato JSON através da rota `/api/status`.

O frontend consulta essa rota e organiza os dados em seções, facilitando a visualização das configurações da rede e dos resultados dos testes.

## Como executar

1. Acesse a pasta da Atividade 2 na Raspberry Pi.
2. Ative o ambiente virtual Python utilizado pelo projeto.
3. Instale as dependências necessárias.
4. Inicie o backend Flask.
5. Abra o frontend pelo endereço disponibilizado pelo servidor.

Na configuração utilizada durante o desenvolvimento, o servidor da aplicação atende pela porta `8000`.

Para acessar o painel diretamente pela Raspberry Pi ou por outro computador autorizado na mesma rede, utilize o endereço IP da Raspberry Pi seguido da porta configurada.

Exemplo:

```text
http://IP_DA_RASPBERRY:8000/
```

A rota da API utilizada pelo frontend é:

```text
/api/status
```

Se o frontend for servido separadamente, em outra porta, o backend deve permitir a origem correspondente por meio da configuração de CORS.

## Objetivo

O objetivo desta atividade é praticar o monitoramento de uma rede local, a coleta de informações de conectividade e a apresentação dos resultados por meio de uma interface web, utilizando a Raspberry Pi como equipamento de monitoramento.