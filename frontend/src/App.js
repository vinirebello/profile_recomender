import React, { useState } from 'react';
// A importação do './App.css' foi removida para corrigir o erro de compilação.
// Os estilos estão incluídos abaixo.

// --- CSS Styles Injetados ---
// Para corrigir o erro de compilação (onde o './App.css' não podia ser encontrado),
// os estilos precisam ser incluídos diretamente no arquivo JS para este ambiente.
const AppStyles = () => (
  <style>
    {`
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #f4f7f6;
        color: #333;
        margin: 0;
        padding: 2rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .container {
        max-width: 700px;
        margin: 0 auto;
        padding: 2rem;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
      .title {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 2rem;
        font-weight: 700;
      }
      .formGroup {
        margin-bottom: 1.25rem;
      }
      .label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #555;
      }
      .input,
      .textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #dcdcdc;
        border-radius: 8px;
        font-size: 1rem;
        box-sizing: border-box; /* Garante que o padding não quebre o layout */
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .input:focus,
      .textarea:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
      }
      .textarea {
        min-height: 100px;
        resize: vertical;
      }
      .button {
        display: block;
        width: 100%;
        padding: 0.85rem 1rem;
        font-size: 1.1rem;
        font-weight: 700;
        color: #ffffff;
        background-color: #3498db;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s;
      }
      .button:hover:not(:disabled) {
        background-color: #2980b9;
      }
      .button:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
        opacity: 0.7;
      }
      .button:active:not(:disabled) {
         transform: translateY(1px);
      }

      /* --- Resultados --- */
      .loadingMessage {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        font-size: 1.1rem;
        color: #555;
        gap: 1rem;
      }
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border-left-color: #3498db;
        animation: spin 1s ease infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .resultsContainer {
        margin-top: 2.5rem;
        border-top: 1px solid #eee;
        padding-top: 1.5rem;
      }
      .resultsTitle {
        color: #2c3e50;
        margin-bottom: 1.5rem;
      }
      .errorMessage {
        padding: 1rem;
        background-color: #fbeae5;
        color: #c0392b;
        border: 1px solid #e74c3c;
        border-radius: 8px;
        text-align: center;
      }
      
      /* --- Profile Card --- */
      .profileCard {
        background-color: #fafafa;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
        transition: box-shadow 0.2s;
      }
      .profileCard:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      }
      .profileName {
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: #2980b9; /* Tom de azul mais escuro */
      }
      .profileCard p {
        margin: 0.25rem 0;
        color: #333;
        line-height: 1.5;
      }
      .skillsList {
        list-style-type: none;
        padding-left: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.75rem;
      }
      .skillItem {
        background-color: #e0eaf1;
        color: #2c3e50;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 500;
      }
    `}
  </style>
);


function App() {
  const [formData, setFormData] = useState({
    escolaridade: '',
    conhecimentosObrigatorios: '',
    conhecimentosDesejados: '',
    tempoExperiencia: '',
    outrasObservacoes: '',
  });

  // Armazena a lista de perfis recomendados vindos da API
  const [recommendedProfiles, setRecommendedProfiles] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  // Estado dedicado para erros
  const [error, setError] = useState(null); 
  // Estado para saber se uma busca já foi concluída (para mostrar "Nenhum resultado")
  const [searchCompleted, setSearchCompleted] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendedProfiles([]); // Limpa resultados anteriores
    setError(null); // Limpa erros anteriores
    setSearchCompleted(true); // Marca que uma busca foi iniciada

    // --- LÓGICA DE API REAL ---
    try {
      // 1. Preparar os dados para a API
      // A API espera listas (arrays) para conhecimentos, não strings.
      const payload = {
        ...formData,
        conhecimentosObrigatorios: formData.conhecimentosObrigatorios
          .split(',') // Converte a string em array
          .map(k => k.trim()) // Remove espaços em branco
          .filter(k => k), // Remove itens vazios (ex: "React,,Node")
        conhecimentosDesejados: formData.conhecimentosDesejados
          .split(',')
          .map(k => k.trim())
          .filter(k => k),
        tempoExperiencia: parseInt(formData.tempoExperiencia, 10) || 0
      };

      // 2. Chamar a rota POST para iniciar a análise
      // (Ajuste a URL/porta se sua API rodar em local diferente)
      const postResponse = await fetch('http://localhost:5001/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!postResponse.ok) {
        // Se o POST falhar, captura o erro
        const errorData = await postResponse.json();
        throw new Error(errorData.message || 'Falha ao processar a recomendação.');
      }

      // 3. Se o POST foi bem-sucedido, chamar a rota GET para buscar os resultados
      const getResponse = await fetch('http://localhost:5001/api/get-latest-recommendations');
      
      if (!getResponse.ok) {
        throw new Error('Falha ao buscar os resultados da análise.');
      }

      const data = await getResponse.json();

      if (data.success && data.perfis) {
        setRecommendedProfiles(data.perfis); // Sucesso! Salva os perfis no estado
      } else {
        throw new Error('A API retornou uma resposta inesperada.');
      }

    } catch (err) {
      console.error('Erro ao buscar recomendações:', err);
      // Define a mensagem de erro para ser exibida ao usuário
      setError(err.message || 'Ocorreu um erro de rede. Tente novamente.');
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="container">
      <AppStyles /> {/* ADICIONA OS ESTILOS AQUI */}
      <h2 className="title">Analisador de Perfil (MCP)</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Campo: Grau de escolaridade */}
        <div className="formGroup"> 
          <label className="label" htmlFor="escolaridade">Grau de Escolaridade</label>
          <input
            type="text"
            id="escolaridade"
            name="escolaridade"
            value={formData.escolaridade}
            onChange={handleChange}
            className="input"
            placeholder="Ex: Pós-graduação"
          />
        </div>

        {/* Campo: Conhecimentos obrigatórios */}
        <div className="formGroup">
          <label className="label" htmlFor="conhecimentosObrigatorios">Conhecimentos Obrigatórios (separar por vírgula)</label>
          <input
            type="text"
            id="conhecimentosObrigatorios"
            name="conhecimentosObrigatorios"
            value={formData.conhecimentosObrigatorios}
            onChange={handleChange}
            className="input"
            placeholder="Ex: React, JavaScript, Node.js"
            required
          />
        </div>
        
        {/* Campo: Conhecimentos desejados */}
        <div className="formGroup">
          <label className="label" htmlFor="conhecimentosDesejados">Conhecimentos Desejados (separar por vírgula)</label>
          <input
            type="text"
            id="conhecimentosDesejados"
            name="conhecimentosDesejados"
            value={formData.conhecimentosDesejados}
            onChange={handleChange}
            className="input"
            placeholder="Ex: AWS, Docker, Metodologias Ágeis"
          />
        </div>
        
        {/* Campo: Tempo de experiência */}
        <div className="formGroup">
          <label className="label" htmlFor="tempoExperiencia">Tempo de Experiência Mínimo (em anos)</label>
          <input
            type="number"
            id="tempoExperiencia"
            name="tempoExperiencia"
            value={formData.tempoExperiencia}
            onChange={handleChange}
            className="input"
            placeholder="Ex: 5"
            min="0"
            required
          />
        </div>
        
        {/* Campo: Outras observações (não utilizado pela API, mas mantido) */}
        <div className="formGroup">
          <label className="label" htmlFor="outrasObservacoes">Outras Observações</label>
          <textarea
            id="outrasObservacoes"
            name="outrasObservacoes"
            value={formData.outrasObservacoes}
            onChange={handleChange}
            className="textarea"
            placeholder="Informações adicionais (não afeta o ranking)..."
          />
        </div>

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Analisando...' : 'Buscar perfis'}
        </button>
      </form>

      {/* --- Seção de Exibição de Resultados --- */}

      {/* 1. Estado de Carregamento */}
      {isLoading && (
        <div className="loadingMessage">
            <div className="spinner"></div>
            Buscando e analisando perfis...
        </div>
      )}

      {/* 2. Estado de Erro */}
      {error && !isLoading && (
        <div className="resultsContainer">
          <div className="errorMessage">{error}</div>
        </div>
      )}

      {/* 3. Estado de Sucesso (com resultados) */}
      {!isLoading && !error && recommendedProfiles.length > 0 && (
        <div className="resultsContainer">
          <h3 className="resultsTitle">Buscar perfis</h3>
          
          {recommendedProfiles.map((perfil) => (
            // Recomendo criar um CSS para "profileCard"
            <div key={perfil.id} className="profileCard"> 
              <h4 className="profileName">{perfil.nome}</h4>
              <p><strong>Escolaridade:</strong> {perfil.escolaridade}</p>
              <p><strong>Experiência:</strong> {perfil.experiencia_anos} anos</p>
              <p><strong>Conhecimentos:</strong></p>
              {/* Recomendo criar CSS para "skillsList" e "skillItem" */}
              <ul className="skillsList">
                {perfil.conhecimentos.map((skill, index) => (
                  <li key={index} className="skillItem">{skill}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      )}
      
      {/* 4. Estado de Sucesso (sem resultados) */}
      {!isLoading && !error && recommendedProfiles.length === 0 && searchCompleted && (
        <div className="resultsContainer">
            <p>Nenhum perfil encontrado com os critérios obrigatórios mínimos.</p>
        </div>
      )}

    </div>
  );
}

export default App;

