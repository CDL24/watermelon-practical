import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { mySchema } from './schema'
import Employee from './Employee'

const adapter = new SQLiteAdapter({
  schema: mySchema
})

export const database = new Database({
  adapter,
  modelClasses: [Employee],
  actionEnabled: true
})