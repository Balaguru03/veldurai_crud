const express = require('express')

const app = express.Router();
const crudController = require('./crud.controller')
app.post('/create_Data_to_push_in_Database_table',crudController.createOperation)
app.get('/get_all_data_from_database_table',crudController.list_of_data)
app.get('/get_particular_data_from_database_table/:id',crudController.specific_data_or_one_data)
app.put('/update_Data_in_Database_table/:id',crudController.update)
app.delete('/delete_Data_in_Database_table/:id',crudController.delete_data)

module.exports = app;