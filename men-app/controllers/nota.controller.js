import '../db/connection.js';
import Nota from '../db/models/nota.schema.js';

const notaManagement = {};

notaManagement.findNota = async (req, res) => {
    try {
        const nota = await Nota.findOne();
        res.json(nota);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

notaManagement.createNota = async (req, res) => {
    try {
        
        const nota = new Nota({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            author: req.user_id
        });

        const newNota = await nota.save();
        res.status(201).json(newNota);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

notaManagement.updateNota = async (req, res) => {
    try {

        const title = req.body.title;

        const nota = await Nota.findOne({title});
        if (!nota) {
            return res.status(404).json({ message: 'Nota not found' });
        }
        nota.title = req.body.title;
        nota.content = req.body.content;
        nota.status = req.body.status;
        // Decoment in case of trying to chande the author
        // nota.author = req.user;
        const updatedNota = await nota.save();
        res.status(200).json(updatedNota);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

notaManagement.listAuthorNotas = async (req, res) => {
    try {
        const notas = await Nota.find({ author : req.user_id });
        res.json(notas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

notaManagement.deleteNota = async (req, res) => {
    try {
        const title = req.body.title;
        const nota = await Nota.findOneAndDelete({ title });
        if (!nota) {
            return res.status(404).json({ message: 'Nota not found' });
        }
        res.status(200).json({ message: 'Nota deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Nota Example

//  {
//     "title": "Sample Title",
//     "content": "Sample Content",
//     "status": 1
//   }

export default notaManagement;
