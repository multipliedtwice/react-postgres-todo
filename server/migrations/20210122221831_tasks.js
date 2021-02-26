exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.bigIncrements('id').unique().primary()
    table.string('title').notNullable()
    table
      .integer('parent_id')
      .references('id')
      .inTable('tasks')
      .onDelete('CASCADE')
    table
      .enu('status', ['pending', 'completed'], {
        useNative: true,
        enumName: 'status_enum',
      })
      .defaultTo('pending')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.raw(`
    DROP TABLE IF EXISTS "tasks";
    DROP TYPE "status_enum";
  `)
}
