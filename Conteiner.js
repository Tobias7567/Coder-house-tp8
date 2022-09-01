const { Console } = require("console");
const fs = require("fs");
const { options } = require("./mariaDB/conextionDB");
const knex = require("knex")(options);
class Conteiner {
  async crearTabla() {
    try {
      await knex.schema.createTable("productos", (table) => {
        table.increments("id");
        table.string("name");
        table.string("description");
        table.string("price");
      });
    } catch (error) {
      console.log(error);
    }
  }

  async save(obj) {
    try {
      await knex("productos").insert({
        name: obj.nombre,
        price: obj.precio,
        description: obj.descripcion,
      });
      return console.log("guardado con  exito");
    } catch (error) {
      console.log(error);
    }
  }
  async seeall() {
    try {
      let rows = await knex().from("productos").select("*");
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Conteiner;
