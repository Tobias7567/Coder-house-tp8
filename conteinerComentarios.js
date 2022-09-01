const { Console } = require("console");
const fs = require("fs");
const { options } = require("./sqlite3/conextionsqlite3");
const knex = require("knex")(options);
class ConteinerComentarios {
  async crearTabla() {
    try {
      await knex.schema.createTable("comentarios", (table) => {
        table.increments("id");
        table.string("gmail");
        table.string("mensaje");
        table.string("hora");
      });
    } catch (error) {
      console.log(error);
    }
  }

  async save(obj) {
    try {
      await knex("comentarios").insert({
        gmail: obj.gmail,
        mensaje: obj.mensaje,
        hora: obj.hora,
      });
      return console.log("guardado con  exito");
    } catch (error) {
      console.log(error);
    }
  }
  async seeall() {
    try {
      let rows = await knex().from("comentarios").select("*");
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ConteinerComentarios;