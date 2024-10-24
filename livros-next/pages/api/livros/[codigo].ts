import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'DELETE') {
            const codigo = Number(req.query.codigo); // capturar o código do livro
            controleLivro.excluir(codigo); // excluir o livro
            res.status(200).json({ message: 'Livro excluído com sucesso' });
        } else {
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};