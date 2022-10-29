const { where } = require('sequelize');
const { getAllItems, createItem, updateItem, getItemById, deleteItem } = require('./helpers')

const getReaders = (_, res) => getAllItems(res, 'reader');
const createReaders = (req, res) => createItem(res, 'reader', req.body);
const updateReaders = (req, res) => updateItem(res, 'reader', req.body, req.params.id);
const getReaderById = (req, res) => getItemById(res, 'reader', req.params.id);
const deleteReader = (req, res) => deleteItem(res, 'reader', req.params.id);

module.exports = { getReaders, createReaders, updateReaders, getReaderById, deleteReader }

// exports.create = async (req, res) => {
//   try {
//   const newReader = await Reader.create(req.body);
//   res.status(201).json(newReader)
//   } catch (error) {
//   const errorMessages = error.errors.map((e) => e.message);
//   res.status(404).json({ errors: errorMessages });
// }
//   };

// exports.read = async (req, res) => {
//       const result = await Reader.findAll();
//       res.status(200).json(result);
// };

// exports.readById = async (req, res) => {
//    const result = await Reader.findByPk(req.params.id)
//    if (!result) {res.status(404).send({ error: 'The reader could not be found.'})
//    } else {
//    {res.status(200).json(result)};
//   }
// };

// exports.update = async (req, res) => {
//       const newData = req.body
//       const params = req.params.id
//       const updateReader = await Reader.update(newData, { where: { id: params }, })
//       if (updateReader !=0) {
//           res.status(200).send()
//       }
//       else {
//           res.status(404).send({ 'error': 'The reader could not be found.' })
//       }
// };

// exports.destroy = async (req, res) => {
//   const params = req.params.id
//   const deletedReaderId = await Reader.destroy( {where: { id: params} })
//   // return boolean value using !!
//   if (!!deletedReaderId) {
//     res.status(204).send()
//     }
//     else {
//     res.status(404).send({ 'error': 'The reader could not be found.' })
//     }
// };


