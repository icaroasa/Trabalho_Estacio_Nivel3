import React from 'react';
import ControleEditora, { editoras } from '../classes/controle/ControleEditora';
import  Livro  from '../classes/modelo/Livro';
import styles from '../styles/Home.module.css'; // Importando os estilos

const controleEditora = new ControleEditora(editoras); 

interface LinhaLivroProps {
    livro: Livro; // O livro que será exibido
    excluir: () => void; // Função de exclusão para o livro
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    const { livro, excluir } = props;
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora); // Obtém o nome da editora

    return (
        <tr>
            <td>
                <div>{livro.titulo}</div>
                <button className="btn btn-danger" onClick={excluir}>Excluir</button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul className={styles.ul}>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

export default LinhaLivro;