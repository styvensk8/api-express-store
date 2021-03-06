const express = require('express');

const BookService = require('../services/book.service');

const validator = require('../middlewares/validator.data');
const {
  getValidator,
  createValidator,
  updateValidator,
} = require('../schemas/book.schema');

const router = express.Router();
const service = new BookService();

//Find
router.get('/', async (req, res, next) => {
  try {
    const book = await service.find();
    res.json(book);
  } catch (error) {
    next(error);
  }
});

//FindOne
router.get(
  '/:id',
  validator(getValidator, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await service.findOne(id);
      res.json(book);
    } catch (error) {
      next(error);
    }
  }
);

//Create
router.post('/', validator(createValidator, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newBook = await service.create(body);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

//Update
router.patch(
  '/:id',
  validator(getValidator, 'params'),
  validator(updateValidator, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const book = await service.update(id, body);
      res.json(book);
    } catch (error) {
      next(error);
    }
  }
);

//Delete
router.delete(
  '/:id',
  validator(getValidator, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
