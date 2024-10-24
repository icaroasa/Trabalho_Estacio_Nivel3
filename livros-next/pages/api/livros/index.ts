import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro, { livros } from '../../../classes/controle/ControleLivro';

export const controleLivro = new ControleLivro(livros);

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const livros = controleLivro.obterLivros();
            res.status(200).json(livros);
        } else if (req.method === 'POST') {
            const novoLivro = req.body; // captura os dados do livro no corpo da requisição
            controleLivro.incluir(novoLivro); // adiciona o livro ao vetor de livros
            res.status(200).json({ message: 'Livro incluído com sucesso' });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};