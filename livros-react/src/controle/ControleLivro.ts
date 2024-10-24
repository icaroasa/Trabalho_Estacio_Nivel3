import Livro from "../modelo/Livro";
import {editoras} from "./ControleEditora";
// Definindo a variável livros como Array<Livro>

export let livros: Array<Livro> = [
    { codigo: 1, codEditora: (editoras[0].codEditora), titulo: "Use a Cabeça: Java", resumo: "Use a Cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos (OO) e Java.", autores: ["Bert Bates", "Kathy Sierra"] },
    { codigo: 2, codEditora: (editoras[1].codEditora), titulo: "Java, como Programar", resumo: "Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software com os livros Deitel", autores: ["Paul Deitel", "Harvey Deitel"] },
    { codigo: 3, codEditora: (editoras[2].codEditora), titulo: "Core Java for the Impatient", resumo: "eaders familiar with Horstmann's original, two-volume \"Core Java\" books who are looking for a comprehensive, but condensed guided to all of the new features and functions of Java SE 9 will learn how these new features impact the language and core libraries", autores: ["Cay Horstmann"] },
];

// Criando a classe ControleLivro
class ControleLivros {
    livros: Array<Livro>;

    constructor(livros: Array<Livro>) {
        this.livros = livros;
    }

    // Método para retornar o vetor livros
    public obterLivros(): Array<Livro> {
        return this.livros;
    }

    // Método para incluir um novo livro
    public incluir(livro: Livro): void {
        // Encontrando o código mais alto e incrementando
        const novoCod = this.livros.length > 0 
            ? Math.max(...this.livros.map(l => l.codigo)) + 1 
            : 1;
        
        livro.codigo = novoCod; // Atualiza o código do livro
        this.livros.push(livro); // Adiciona o livro ao vetor
    }

    // Método para excluir um livro pelo código
    public excluir(codLivro: number): void {
        const indice = this.livros.findIndex(l => l.codigo === codLivro);
        if (indice !== -1) {
            this.livros.splice(indice, 1); // Remove o livro pelo índice encontrado
        }
    }
}

export default ControleLivros;