import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora, { editoras } from '../../../classes/controle/ControleEditora';

export const controleEditora = new ControleEditora(editoras);

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const editoras = controleEditora.getEditoras();
            res.status(200).json(editoras);
        } else {
            // Tratar status 405 para métodos não permitidos
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        // Tratar status 500 para exceções no servidor
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};