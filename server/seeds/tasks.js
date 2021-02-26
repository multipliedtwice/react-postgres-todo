exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { parent_id: null, title: 'Create first task', status: 'pending' },
        { parent_id: 1, title: 'Make subtask', status: 'pending' },
        { parent_id: 1, title: 'Test update', status: 'pending' },
        { parent_id: 1, title: 'Try to delete', status: 'pending' },
        { parent_id: null, title: 'Create second task', status: 'pending' },
        { parent_id: 1, title: 'First parent subtask', status: 'completed' },
        { parent_id: 5, title: 'Second thing to do', status: 'pending' },
        { parent_id: 5, title: 'Lorem ipsum', status: 'pending' },
      ])
    })
}
