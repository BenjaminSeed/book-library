const { where } = require('sequelize');
const { Book, Reader } = require('../models');

exports.create = async (req, res) => {
  const newBook = await Book.create(req.body);
  res.status(201).json(newBook);
};

exports.read = async (req, res) => {
    const result = await Book.findAll();
    res.status(200).json(result);
};

exports.readById = async (req, res) => {
    const result = await Book.findByPk(req.params.id)
    if (!result) {res.status(404).send({ error: 'The book could not be found.'})
    } else {
    {res.status(200).json(result)};
    }
};
 
exports.update = async (req, res) => {
    const newData = req.body
    const params = req.params.id
    const updateBook = await Book.update(newData, { where: {id: params}, })
    if (updateBook !=0) {
        res.status(200).send()
    } else {
        res.status(404).send({ 'error': 'The book could not be found.'})
    };
};

 exports.destroy = async (req, res) => {
   const params = req.params.id
   const deletedBookId= await Book.destroy( {where: { id: params} })
   // return boolean value using !!
   if (!!deletedBookId) {
     res.status(204).send()
     }
     else {
     res.status(404).send({ 'error': 'The book could not be found.' })
     }
 };
 