import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'employees',
      columns: [
        { name: 'first_name', type: 'string' },
        { name: 'last_name', type: 'string'},
        { name: 'skills', type: 'string'}
      ]
    })
  ]
})