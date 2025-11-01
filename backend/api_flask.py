import os
import json 
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Configura o CORS para permitir requisições do seu front-end React
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# --- Banco de Dados Simulado (Carregado do JSON) ---

MOCK_PROFILES = []
JSON_FILE_PATH = './profile_data.json' # 2. Definimos o caminho do arquivo

try:
    # 3. Abrimos e carregamos o arquivo JSON para a memória
    # 'encoding="utf-8"' é importante para ler acentos corretamente
    with open(JSON_FILE_PATH, 'r', encoding='utf-8') as f:
        MOCK_PROFILES = json.load(f)
    print(f"Sucesso: Carregados {len(MOCK_PROFILES)} perfis de {JSON_FILE_PATH}")
except FileNotFoundError:
    print(f"ERRO: Arquivo '{JSON_FILE_PATH}' não encontrado.")
    print("A API será executada, mas a busca de perfis não retornará resultados.")
except json.JSONDecodeError:
    print(f"ERRO: O arquivo '{JSON_FILE_PATH}' contém um JSON inválido.")
except Exception as e:
    print(f"Ocorreu um erro inesperado ao carregar os perfis: {e}")

# --- Fim do Banco Simulado ---

# 1. NOVO: Variável global para armazenar temporariamente os resultados
LATEST_RECOMMENDATIONS = []


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
        desireKnowledge = data.get("conhecimentosDesejados", []) # Garantir que seja uma lista
        experienceTime = int(data.get('tempoExperiencia', 0))

        print(f"Buscando perfis com: {data}")

        # 2. Lógica de "Match"
        # A lógica abaixo agora usa a variável MOCK_PROFILES
        # que foi preenchida com os dados do arquivo JSON.
        
        perfis_encontrados = []
        
        # 4. A sua lógica de filtro original funciona sem alterações!
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
        # Ex:
            # if educationLevel and educationLevel != "Qualquer" and perfil['escolaridade'] != educationLevel:
            #     continue
            
            # Se passou em todos os filtros, adiciona à lista
            perfis_encontrados.append(perfil)

        # 3. NOVO: Rankeamento e seleção dos Top 5
        
        perfis_pontuados = []
        desireKnowledge_set = set(desireKnowledge)

        for perfil in perfis_encontrados:
            score = 0
            conhecimentos_perfil_set = set(perfil['conhecimentos'])

            # Pontua por conhecimentos desejados (2 pontos cada)
            conhecimentos_desejados_match = conhecimentos_perfil_set.intersection(desireKnowledge_set)
            score += len(conhecimentos_desejados_match) * 2
            
            # Pontua por anos de experiência acima do mínimo (1 ponto cada)
            anos_extras = perfil['experiencia_anos'] - experienceTime
            if anos_extras > 0:
                score += anos_extras
            
            perfis_pontuados.append({'perfil': perfil, 'score': score})

        # Ordena os perfis pela pontuação (maior primeiro)
        perfis_ordenados = sorted(perfis_pontuados, key=lambda p: p['score'], reverse=True)
        
        # Extrai apenas os dados do perfil, limitando aos 5 primeiros
        melhores_perfis = [p['perfil'] for p in perfis_ordenados[:5]]


        # 4. NOVO: Salvar os resultados na variável global
        # Precisamos declarar 'global' para modificar a variável
        global LATEST_RECOMMENDATIONS
        LATEST_RECOMMENDATIONS = melhores_perfis

        # 5. Retornar uma mensagem de sucesso (sem os dados)
        return jsonify({
            "success": True,
            "message": f"{len(melhores_perfis)} perfis recomendados estão prontos para serem buscados."
        }), 200

    except Exception as e:
        # Em caso de erro, retorna uma mensagem de erro
        return jsonify({
            "success": False,
            "message": f"Ocorreu um erro no servidor: {str(e)}"
        }), 500

# 6. NOVO: Rota GET para o frontend buscar os resultados
@app.route('/api/get-latest-recommendations', methods=['GET'])
def get_latest_recommendations():
    """
    Este endpoint retorna a última lista de perfis
    que foi processada pela rota /api/recommend.
    """
    global LATEST_RECOMMENDATIONS
    
    return jsonify({
        "success": True,
        "perfis": LATEST_RECOMMENDATIONS
    }), 200

@app.route('/api/test', methods=['GET'])
def test_route():
    return jsonify({"message": "API do Flask está funcionando!"})

# Roda o servidor
if __name__ == '__main__':
    # 'debug=True' faz o servidor reiniciar automaticamente após salvar o arquivo
    app.run(host='0.0.0.0', port=5001, debug=True)