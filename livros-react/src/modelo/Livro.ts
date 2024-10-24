class Livro {
    codigo: number;
    codEditora: number;
    titulo: String;
    resumo: String;
    autores: String[];
    constructor(codigo:number, codEditora:number, titulo:String, resumo:String, autores:String[]){
        this.codigo = codigo;
        this.codEditora = codEditora;
        this.titulo = titulo;
        this.resumo = resumo;
        this.autores = autores;

    }
}

export default Livro;