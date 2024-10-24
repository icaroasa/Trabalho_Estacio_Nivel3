import type {NextPage} from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu'; // Ajuste o caminho se necessário
import styles from '../styles/Home.module.css'; // Importando os estilos
import { LinhaLivro } from '../componentes/LinhaLivro'; // Importar o componente LinhaLivro
import Livro from '../classes/modelo/Livro'; // Importando a interface Livro, ajuste o caminho se necessário

const baseURL = "http://localhost:3000/api/livros"; // URL da API

const obter = async () => {
    const response = await fetch(baseURL);
    return await response.json(); // Retornando a resposta no formato JSON
};

const excluirLivro = async (codigo: number) => {
    const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE'
    });
    return response.ok; // Retorna true se a exclusão foi bem-sucedida
};

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]); // Estado para armazenar os livros
    const [carregado, setCarregado] = useState<boolean>(false); // Estado para controle de carregamento

    useEffect(() => {
        obter()
            .then(data => {
                setLivros(data); // Alimenta a propriedade de estado livros
                setCarregado(true); // Altera carregado para true
            })
            .catch(error => {
                console.error("Erro ao obter livros:", error);
            });
    }, []);

    const excluir = async (codigo: number) => {
        const sucesso = await excluirLivro(codigo);
        if (sucesso) {
            setLivros(livros.filter(livro => livro.codigo !== codigo)); // Remove o livro da lista
            setCarregado(false); // Força o redesenho da página
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Lista de Livros</title>
            </Head>
            <Menu />
            <main className='col-9 mx-auto'>
                <h1 className={styles.h1}>Catálogo</h1>
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
                        {livros.map(livro => (
                            <LinhaLivro
                                key={livro.codigo}
                                livro={livro}
                                excluir={() => excluir(livro.codigo)} // Passando o código do livro
                            />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default LivroLista;