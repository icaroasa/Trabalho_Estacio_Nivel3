import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu'; 
import styles from '../styles/Home.module.css'; // Importando os estilos
import ControleEditora, { editoras } from '../classes/controle/ControleEditora'; 
import Livro from '../classes/modelo/Livro';
import { useRouter } from 'next/router'; // Importando o Hook useRouter


const LivroDados: React.FC = () => {

    const controleEditora = new ControleEditora(editoras); // Instanciando ControleEditora
    const baseURL = "http://localhost:3000/api/livros"; // URL da API

    const [opcoes, setOpcoes] = useState<{ value: number; text: String }[]>([]); // Estado para as opções de editoras
    const [titulo, setTitulo] = useState<string>(''); // Estado para o título
    const [resumo, setResumo] = useState<string>(''); // Estado para o resumo
    const [autores, setAutores] = useState<string>(''); // Estado para os autores
    const [codEditora, setCodEditora] = useState<number>(0); // Estado para codEditora
    const router = useRouter(); // Instanciando o Router

    // Função para incluir um livro via API
    const incluirLivro = async (livro: Livro) => {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
        });
        return response.ok; // Retorna true se a inclusão foi bem-sucedida
    };

    // Efeito para carregar as editoras ao montar o componente
    useEffect(() => {
        const carregarEditoras = async () => {
            const editoras = await controleEditora.getEditoras();
            setOpcoes(editoras.map(({ codEditora, nome }) => ({ value: codEditora, text: nome }))); // Mapeando as editoras
            if (editoras.length > 0) {
                setCodEditora(editoras[0].codEditora); // Define a editora padrão
            }
        };

        carregarEditoras();
    }, []);

    // Método para tratar a mudança de seleção da editora
    const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(evento.target.value)); // Atualiza codEditora com o valor selecionado
    };

    // Método para incluir o livro no formulário
    const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault(); // Previne o comportamento padrão do formulário
        const livro: Livro = {
            codigo: 0, // O código será gerado pela API
            titulo,
            resumo,
            autores: autores.split('\n'), // Autores separados por linha
            codEditora,
        };

        const sucesso = await incluirLivro(livro);
        if (sucesso) {
            router.push('/LivroLista'); // Navega para a página LivroLista
        }
    };

    // Retorno do componente
    return (
        <div className="container">
            <Head>
                <title>Incluir Livro</title>
            </Head>
            <Menu />
            <main className='col-9 mx-auto'>
                <h1 className={styles.h1}>Dados do Livro</h1>
                <form onSubmit={incluir}>
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resumo" className="form-label">Resumo</label>
                        <textarea
                            className="form-control"
                            id="resumo"
                            value={resumo}
                            onChange={(e) => setResumo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="autores" className="form-label">Autores (separados por linha)</label>
                        <textarea
                            className="form-control"
                            id="autores"
                            value={autores}
                            onChange={(e) => setAutores(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="codEditora" className="form-label">Editora</label>
                        <select
                            id="codEditora"
                            className="form-select"
                            value={codEditora}
                            onChange={tratarCombo}
                            required
                        >
                            {opcoes.map(opcao => (
                                <option key={opcao.value} value={opcao.value}>
                                    {opcao.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Salvar Dados</button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados; // Exportando o componente