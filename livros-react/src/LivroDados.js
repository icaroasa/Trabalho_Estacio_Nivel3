import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivros, { livros } from './controle/ControleLivro';
import ControleEditora, { editoras } from './controle/ControleEditora';

// Instanciar controladores
const controleLivro = new ControleLivros(livros);
const controleEditora = new ControleEditora(editoras);

const LivroDados = () => {
    // Definir vetor opcoes com as editoras
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    // Definir estados para as propriedades
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState([]);
    const [codEditora, setCodEditora] = useState(opcoes[0].value);

    // Definir o hook navigate
    const navigate = useNavigate();

    // Método tratarCombo para a combo de editoras
    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value));
    };

    // Método incluir
    const incluir = (event) => {
        event.preventDefault(); // Previne o comportamento padrão de submit

        // Instanciar o livro com código zero e os valores do estado
        const livro = {
            codigo: 0,
            titulo: titulo,
            resumo: resumo,
            autores: autores.split('\n'), // Autores separados por linhas
            codEditora: codEditora
        };

        // Invocar o método incluir do controlador de livros
        controleLivro.incluir(livro);

        // Redirecionar para a página de listagem
        navigate('/');
    };

    // Retornar o formulário para inclusão do livro
    return (
        <main className='col-9 mx-auto'>
            <h1>Dados do Livro</h1>
            <form onSubmit={incluir}>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Resumo</label>
                    <textarea className="form-control" value={resumo} onChange={(e) => setResumo(e.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Autores (um por linha)</label>
                    <textarea className="form-control" value={autores} onChange={(e) => setAutores(e.target.value)} required/>
                </div>

                {/* Lista de seleção para editoras */}
                <div className="mb-3">
                    <label className="form-label">Editora</label>
                    <select className="form-select" value={codEditora} onChange={tratarCombo}>
                        {opcoes.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botão de submissão */}
                <button type="submit" className="btn btn-primary">
                    Salvar Dados
                </button>
            </form>
        </main>
    );
};

export default LivroDados;
