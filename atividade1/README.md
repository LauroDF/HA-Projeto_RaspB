# Atividade 1 — Painel Web de Status da Raspberry Pi

## Sobre a atividade

Esta atividade consiste no desenvolvimento de um painel web para consultar informações do sistema operacional e do hardware da Raspberry Pi. Os dados são coletados pelo backend em Python e disponibilizados por meio de uma API, que é consultada pelo frontend para atualizar as informações exibidas na tela.

## Funcionalidades

O painel foi desenvolvido para apresentar informações como:

- Identificação do equipamento.
- Temperatura da CPU.
- Uso da CPU.
- Utilização da memória RAM.
- Uso do armazenamento.
- Tempo de atividade do sistema.
- Data e hora da consulta, quando disponibilizadas pelo backend.

Os dados exibidos dependem das informações coletadas e retornadas pela API.

## Tecnologias utilizadas

- **Python:** coleta e processamento das informações do sistema.
- **Flask:** criação do servidor e da API.
- **HTML:** estrutura da interface.
- **CSS:** organização e aparência do painel.
- **JavaScript:** consulta à API e atualização dos dados.

## Organização dos arquivos

```text
atividade1/
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

O backend coleta as informações da Raspberry Pi e disponibiliza os resultados em formato JSON por meio de uma rota da API. O frontend realiza uma requisição para essa rota, recebe os dados e apresenta as informações em um painel web.

Essa separação permite manter a lógica de coleta de dados no backend e a apresentação das informações no frontend.

## Como executar

1. Acesse a pasta da atividade na Raspberry Pi.
2. Ative o ambiente virtual Python utilizado pelo projeto.
3. Instale as dependências necessárias, conforme a configuração do backend.
4. Inicie o servidor Flask.
5. Abra o frontend pelo endereço disponibilizado pelo servidor ou pela configuração utilizada para servir os arquivos.

O endereço e a porta dependem da configuração do servidor no momento da execução.

## Objetivo

O objetivo desta atividade é praticar a coleta de informações do sistema usando Python e a apresentação desses dados em uma interface web, utilizando uma API para a comunicação entre o backend e o frontend.