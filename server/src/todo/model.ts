import knex from 'knex'
import pgConfig from '../../knexfile'
import { TodoInput } from './types'

const db = knex(pgConfig)

const addTask = async (todo: TodoInput) => {
  return await db('tasks').insert(todo).returning('id')
}

const updateTask = async (todo: TodoInput) => {
  return await db('tasks').update(todo).where({ id: todo.id }).returning('id')
}

const deleteTaskById = async (id: number) => {
  return await db('tasks').where({ id }).del().returning('id')
}

const getTasks = async () => {
  return await db(db.raw('tasks as t'))
    .select(
      'id',
      db.raw(`(
        SELECT
          count(id)
        FROM
          tasks
        WHERE
          parent_id = t.id
          AND status = 'completed') total_completed`),
      db.raw(`(
        SELECT
          count(id)
        FROM
          tasks
        WHERE
          parent_id = t.id) total`),
      db.raw(`	(
        SELECT
          json_agg(json_build_object('id', id, 'title', title, 'status', status, 'created_at', created_at) ORDER BY id)
        FROM
          tasks
        WHERE
          parent_id = t.id
        ) AS subtasks `),
      'title',
      'status',
      'created_at'
    )
    .where('parent_id', null)
    .orderBy('id', 'desc')
}

export const Todos = {
  addTask,
  getTasks,
  updateTask,
  deleteTaskById,
}
