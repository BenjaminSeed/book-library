const { where } = require('sequelize');
const { getAllItems, createItem, updateItem, getItemById, deleteItem } = require('./helpers')

const getAuthor = (_, res) => getAllItems(res, 'author');
const createAuthors = (req, res) => createItem(res, 'author', req.body);
const updateAuthors = (req, res) => updateItem(res, 'author', req.body, req.params.id);
const getAuthorById = (req, res) => getItemById(res, 'author', req.params.id);
const deleteAuthor = (req, res) => deleteItem(res, 'author', req.params.id);

module.exports = { getAuthor, createAuthors, updateAuthors, getAuthorById, deleteAuthor }