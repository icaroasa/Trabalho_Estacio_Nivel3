import React, { useState, useEffect } from 'react';
import ControleEditora, { editoras } from './controle/ControleEditora';
import ControleLivros, { livros } from './controle/ControleLivro';

// Instanciando os controladores de livros e editoras
const controleLivro = new ControleLivros(livros);
const controleEditora = new ControleEditora(editoras);

// Definição do componente auxiliar LinhaLivro
const LinhaLivro = (props) => {
    const { livro, excluir } = props;

    // Definindo nomeEditora a partir de getNomeEditora
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            {/* Adicionando o botão de exclusão */}
            <td>
                <div>{livro.titulo}</div>
                <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>Excluir</button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            {/* Exibindo autores como uma lista */}
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

// Definição do componente LivroLista
const LivroLista = () => {
    // Definindo as propriedades 'livros' e 'carregado'
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    // Hook useEffect para carregar livros
    useEffect(() => {
        if (!carregado) {
            const livrosObtidos = controleLivro.obterLivros();
            setLivros(livrosObtidos);
            setCarregado(true);
        }
    }, [carregado]);

    // Método excluir
    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false); // Forçar o redesenho da página
    };

    // Retorno do componente com a área principal
    return (
        <main className='col-9 mx-auto'>
            <h1>Catálogo de Livros</h1>
            <table className="table table-striped">
                <thead className='table-dark'>
                    <tr>
                        <th className="col-2">Título</th>
                        <th className="col-6">Resumo</th>
                        <th className="col-2">Editora</th>
                        <th className="col-2">Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Gerar as linhas de livros com map */}
                    {livros.map((livro) => (
                        <LinhaLivro
                            key={livro.codigo}
                            livro={livro}
                            excluir={excluir}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;
