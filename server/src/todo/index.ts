import express from 'express'
import { addTask, deleteTaskById, getTasks, updateTask } from './controller'

export const todos = express.Router()
todos
  .get('/', getTasks)
  .post('/', addTask)
  .patch('/', updateTask)
  .delete('/', deleteTaskById)
