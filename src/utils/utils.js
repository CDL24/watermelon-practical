//Save Records

import { database } from "../model/database"

export const onSaveData = async(postData) =>{
    console.log('postData',postData)
    
    await database.write(async () => {
        const employee = await database.get('employees').create(employee => {
            employee.firstName = postData.first_name
            employee.lastName = postData.last_name
            employee.skills = postData.skills
          })
      })
      console.log('Saved...')
}
export const onEditData = async(postData, id) =>{
    console.log('postData',postData)
    
    await database.write(async () => {
        const employee = await database.get('employees').find(id)
        console.log('Update, ',employee)
        await employee.update(() => {
            employee.firstName = postData.first_name
            employee.lastName = postData.last_name
            employee.skills = postData.skills
          })
        // const employee = await database.get('employees').create(employee => {
        //     employee.firstName = postData.first_name
        //     employee.lastName = postData.last_name
        //     employee.skills = postData.skills
        //   })
      })
      console.log('Updated...Success')
}
