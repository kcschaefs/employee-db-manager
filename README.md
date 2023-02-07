# Employee Database Manager

[Video Link]()

## User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Tasks
- Connect the SQL database to the CLI
- Build out the Inquirer questions
- Build out the functionality to grab and cache database info to use for Inquirer questions
- Figure out how to grab the correct names, id's, etc. for display as well as feeding back to the db + updating the cached info
- Build out the functionality to update the db

## Learnings
- Joining tables through mysql2 to display through the console.table on the CLI
- Grabbing the correct bits of information that are displayed on the CLI and tying it to the correct information needed to update the database
- Using prepared statements to add and update SQL databases

## Future Improvements
- Adding funcitonality to delete employees, roles, and departments
- Adding functionality to allow for more managers to be created and selected
- Changing from cached data functionality to asynch functionality
- Utilizing modules to make the maintenance of the app more feasible