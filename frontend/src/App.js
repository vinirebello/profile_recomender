import React, { useState } from 'react';

// --- Estilos CSS básicos para o formulário (pode ser separado em um arquivo .css)
const formStyles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#0077b5', // Cor do LinkedIn
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#0077b5',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  }
};
// --- Fim dos Estilos CSS

const LinkedInProfileAnalyzer = () => {
  const [formData, setFormData] = useState({
    escolaridade: '',
    conhecimentosDesejados: '',
    conhecimentosObrigatorios: '',
    tempoExperiencia: '',
    outrasObservacoes: ''
  });

  // Função genérica para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Analisador Enviados:', formData);
    
    // Aqui você integraria a lógica de análise real,
    // como enviar os dados para uma API, salvar no banco, etc.
    
    alert('Formulário enviado com sucesso! Verifique o console para os dados.');
    // Se desejar, adicione aqui uma lógica para limpar o formulário:
    // setFormData({
    //   escolaridade: '',
    //   conhecimentosDesejados: '',
    //   conhecimentosObrigatorios: '',
    //   tempoExperiencia: '',
    //   outrasObservacoes: ''
    // });
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.title}>Analisador de Perfil do LinkedIn</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Campo: Grau de escolaridade */}
        <div style={formStyles.formGroup}>
          <label style={formStyles.label} htmlFor="escolaridade">Grau de Escolaridade</label>
          <input
            type="text"
            id="escolaridade"
            name="escolaridade"
            value={formData.escolaridade}
            onChange={handleChange}
            style={formStyles.input}
            placeholder="Ex: Pós-graduação em Engenharia de Software"
            required
          />
        </div>

        {/* Campo: Conhecimentos obrigatórios */}
        <div style={formStyles.formGroup}>
          <label style={formStyles.label} htmlFor="conhecimentosObrigatorios">Conhecimentos Obrigatórios (separar por vírgula)</label>
          <input
            type="text"
            id="conhecimentosObrigatorios"
            name="conhecimentosObrigatorios"
            value={formData.conhecimentosObrigatorios}
            onChange={handleChange}
            style={formStyles.input}
            placeholder="Ex: React, JavaScript, Node.js"
            required
          />
        </div>
        
        {/* Campo: Conhecimentos desejados */}
        <div style={formStyles.formGroup}>
          <label style={formStyles.label} htmlFor="conhecimentosDesejados">Conhecimentos Desejados (separar por vírgula)</label>
          <input
            type="text"
            id="conhecimentosDesejados"
            name="conhecimentosDesejados"
            value={formData.conhecimentosDesejados}
            onChange={handleChange}
            style={formStyles.input}
            placeholder="Ex: AWS, Docker, Metodologias Ágeis"
          />
        </div>
        
        {/* Campo: Tempo de experiência */}
        <div style={formStyles.formGroup}>
          <label style={formStyles.label} htmlFor="tempoExperiencia">Tempo de Experiência (em anos)</label>
          <input
            type="number"
            id="tempoExperiencia"
            name="tempoExperiencia"
            value={formData.tempoExperiencia}
            onChange={handleChange}
            style={formStyles.input}
            placeholder="Ex: 5"
            min="0"
            required
          />
        </div>
        
        {/* Campo: Outras observações */}
        <div style={formStyles.formGroup}>
          <label style={formStyles.label} htmlFor="outrasObservacoes">Outras Observações</label>
          <textarea
            id="outrasObservacoes"
            name="outrasObservacoes"
            value={formData.outrasObservacoes}
            onChange={handleChange}
            style={formStyles.textarea}
            placeholder="Informações adicionais que podem ser relevantes para a análise..."
          />
        </div>

        <button type="submit" style={formStyles.button}>
          Analisar Perfil
        </button>
      </form>
    </div>
  );
};

export default LinkedInProfileAnalyzer;