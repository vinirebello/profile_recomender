# Projeto: Analisador de Perfis (Simulador)

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido como um sistema de análise de perfis, simulando uma ferramenta de pesquisa. A aplicação permite que um usuário (recrutador) preencha um formulário detalhando os requisitos da vaga, como nível de escolaridade, tempo de experiência e conhecimentos obrigatórios.

Ao enviar o formulário, o front-end consome uma API em Flask que, por sua vez, analisa e filtra uma base de candidatos, retornando os perfis mais compatíveis.

### O Desafio: Dados Reais vs. Dados Simulados

O conceito original do projeto previa a integração com uma LLM (Large Language Model) ou um serviço de busca ("protocolo MCP") para analisar dados reais e públicos do LinkedIn.

No entanto, devido às fortes restrições técnicas e de Termos de Serviço da API do LinkedIn (que não permite a busca aberta de perfis de terceiros), esta versão do projeto foca na **arquitetura do sistema**. Para isso, utilizamos um **banco de dados simulado (um arquivo `profile_data.json`)** com candidatos fictícios para que a lógica de "match" possa ser desenvolvida e testada de forma funcional.

## ✨ Funcionalidades Principais

* **Formulário de Busca Detalhado:** Interface em React para inserir os requisitos da vaga.
* **Consumo de API:** Comunicação assíncrona entre front-end e back-end.
* **API RESTful:** Back-end em Flask com endpoint `/api/recommend` para processar as requisições.
* **Lógica de "Match":** Script em Python que filtra os perfis do JSON com base nos critérios recebidos.
* **Conversão de Dados:** O front-end trata os inputs de texto (ex: "Python, React, SQL") e os envia como arrays JSON (ex: `["Python", "React", "SQL"]`).

## 🛠️ Tecnologias Utilizadas

* **Front-End:**
    * React.js
    * JavaScript (ES6+)
    * Fetch API
* **Back-End:**
    * Python 3
    * Flask
    * Flask-CORS
* **Formato de Dados:**
    * JSON

## 🚀 Como Executar o Projeto

Para rodar este projeto localmente, você precisará de dois terminais: um para o back-end (Flask) e outro para o front-end (React).

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (que inclui o `npm`)
* [Python 3](https://www.python.org/downloads/) (que inclui o `pip`)

---

### 1. Back-End (Servidor Flask)

```bash
# 1. Clone o repositório
git clone [URL-DO-SEU-REPOSITORIO]
cd [PASTA-DO-PROJETO]/backend  # Navegue até a pasta do back-end

# 2. (Opcional, mas recomendado) Crie um ambiente virtual
python -m venv venv
source venv/bin/activate  # No Windows: .\venv\Scripts\activate

# 3. Instale as dependências
pip install Flask flask-cors

# 4. Rode o servidor
# (Assumindo que seu arquivo se chama 'app.py')
python app.py

# O servidor estará rodando em http://localhost:5001
