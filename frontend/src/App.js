import React, { useState } from 'react';
import './App.css'; // Certifique-se de importar seu arquivo CSS

function App() { // Assumindo que este é o seu componente principal
  const [formData, setFormData] = useState({
    escolaridade: '',
    conhecimentosObrigatorios: '',
    conhecimentosDesejados: '',
    tempoExperiencia: '',
    outrasObservacoes: '',
  });

  // Novo estado para armazenar o resultado da análise
  const [analysisResult, setAnalysisResult] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); // Novo estado para loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o estado de carregamento
    setAnalysisResult(null); // Limpa resultados anteriores

    // Simulando uma chamada de API (substitua pela sua lógica real)
    try {
      // Exemplo de como você enviaria os dados para um backend:
      // const response = await fetch('/api/recommend', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      // setAnalysisResult(data);

      // --- SIMULANDO UM RESULTADO FICTÍCIO ---
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Espera 1.5s para simular carregamento

      const mockResult = {
        compatibilidade: '85%',
        pontosFortes: [
          'Forte formação em Engenharia de Software.',
          'Experiência sólida com React e Node.js.',
          'Conhecimento em metodologias ágeis.',
        ],
        pontosDeMelhoria: [
          'Aprofundar em Docker e AWS.',
          'Explorar outras tecnologias de backend.',
        ],
        resumo: 'Candidato com alto potencial, alinhado com a vaga, mas pode otimizar conhecimentos em nuvem e conteinerização.',
      };
      setAnalysisResult(mockResult);
      // --- FIM DA SIMULAÇÃO ---

    } catch (error) {
      console.error('Erro ao analisar perfil:', error);
      // Aqui você pode definir um estado de erro para exibir ao usuário
      setAnalysisResult({ error: 'Ocorreu um erro ao analisar o perfil. Tente novamente.' });
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="container">
      <h2 className="title">Analisador de Perfil do LinkedIn</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (Seus campos de formulário, como no exemplo anterior, usando className) ... */}

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
            placeholder="Ex: Pós-graduação em Engenharia de Software"
            required
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
          <label className="label" htmlFor="tempoExperiencia">Tempo de Experiência (em anos)</label>
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
        
        {/* Campo: Outras observações */}
        <div className="formGroup">
          <label className="label" htmlFor="outrasObservacoes">Outras Observações</label>
          <textarea
            id="outrasObservacoes"
            name="outrasObservacoes"
            value={formData.outrasObservacoes}
            onChange={handleChange}
            className="textarea"
            placeholder="Informações adicionais que podem ser relevantes para a análise..."
          />
        </div>

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Analisando...' : 'Analisar Perfil'}
        </button>
      </form>

      {/* Seção de Exibição de Resultados */}
      {isLoading && (
        <div className="loadingMessage">
            <div className="spinner"></div>
            Analisando perfil...
        </div>
      )}

      {analysisResult && !isLoading && (
        <div className="resultsContainer">
          {analysisResult.error ? (
            <div className="errorMessage">{analysisResult.error}</div>
          ) : (
            <>
              <h3 className="resultsTitle">Resultado da Análise</h3>
              <div className="resultItem">
                <strong>Compatibilidade:</strong> <span className="compatibilityScore">{analysisResult.compatibilidade}</span>
              </div>
              <div className="resultItem">
                <strong>Resumo:</strong> <p>{analysisResult.resumo}</p>
              </div>
              <div className="resultItem">
                <strong>Pontos Fortes:</strong>
                <ul className="pointsList">
                  {analysisResult.pontosFortes.map((ponto, index) => (
                    <li key={index}>{ponto}</li>
                  ))}
                </ul>
              </div>
              <div className="resultItem">
                <strong>Pontos de Melhoria:</strong>
                <ul className="pointsList">
                  {analysisResult.pontosDeMelhoria.map((ponto, index) => (
                    <li key={index}>{ponto}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;