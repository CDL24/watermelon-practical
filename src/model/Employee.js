import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Employee extends Model {
  static table = 'employees'
  @text('first_name') firstName
  @text('last_name') lastName
  @text('skills') skills
}