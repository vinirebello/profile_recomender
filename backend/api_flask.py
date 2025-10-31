import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Configura o CORS para permitir requisições do seu front-end React
# (Ajuste 'http://localhost:3000' se o seu React rodar em outra porta)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# --- Banco de Dados Simulado (Exemplo) ---
# Na vida real, isso viria de um banco de dados (SQLite, PostgreSQL, etc.)
MOCK_PROFILES = [
    {
        "id": 1,
        "nome": "Ana Silva",
        "escolaridade": "Mestrado",
        "experiencia_anos": 5,
        "conhecimentos": ["Python", "Flask", "React", "SQL"]
    },
    {
        "id": 2,
        "nome": "Bruno Costa",
        "escolaridade": "Graduação",
        "experiencia_anos": 2,
        "conhecimentos": ["JavaScript", "React", "Node.js"]
    },
    {
        "id": 3,
        "nome": "Carla Dias",
        "escolaridade": "Doutorado",
        "experiencia_anos": 8,
        "conhecimentos": ["Python", "Machine Learning", "TensorFlow", "Pandas"]
    }
]
# --- Fim do Banco Simulado ---


@app.route('/api/recommend', methods=['POST'])
def handle_recommendation():
    
    
    """
    Este endpoint recebe os critérios do formulário React
    e retorna uma lista de perfis recomendados.
    """
    try:
        # 1. Obter os dados JSON enviados pelo React
        data = request.json
        
        # Extrai os campos do formulário
        educationLevel = data.get('escolaridade')
        requiredKnowledge = data.get('conhecimentosObrigatorios', []) # Espera uma lista
        desireKnowledge = data.get("conhecimentosDesejados")
        experienceTime = int(data.get('tempoExperiencia', 0))

        print(f"Buscando perfis com: {data}")

        # 2. Lógica de "Match"
        # 
        # ***************************************************************
        # AQUI é onde você chamaria o seu "protocolo MCP"
        # OU (mais recomendado) faria a consulta no seu banco de dados
        # ***************************************************************
        
        # Exemplo de lógica de filtro com o banco simulado:
        perfis_encontrados = []
        for perfil in MOCK_PROFILES:
            # Filtro 1: Experiência
            if perfil['experiencia_anos'] < experienceTime:
                continue
            
            # Filtro 2: Conhecimentos Obrigatórios
            # Verifica se TODOS os conhecimentos obrigatórios estão na lista do perfil
            requiredKnowledge_set = set(requiredKnowledge)
            conhecimentos_perfil_set = set(perfil['conhecimentos'])
            
            if not requiredKnowledge_set.issubset(conhecimentos_perfil_set):
                continue
                
            # (Adicionar lógica para 'nivel de escolaridade' se necessário)
            
            # Se passou em todos os filtros, adiciona à lista
            perfis_encontrados.append(perfil)

        # 3. Retornar os resultados para o React
        # O jsonify converte a lista de dicionários Python em JSON
        return jsonify({
            "success": True,
            "perfis": perfis_encontrados
        }), 200

    except Exception as e:
        # Em caso de erro, retorna uma mensagem de erro
        return jsonify({
            "success": False,
            "message": f"Ocorreu um erro no servidor: {str(e)}"
        }), 500

# Rota de teste para verificar se o servidor está no ar
@app.route('/api/test', methods=['GET'])
def test_route():
    return jsonify({"message": "API do Flask está funcionando!"})

# Roda o servidor
if __name__ == '__main__':
    # 'debug=True' faz o servidor reiniciar automaticamente após salvar o arquivo
    app.run(host='0.0.0.0', port=5001, debug=True)