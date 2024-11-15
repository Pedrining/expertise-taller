var deducibleDAO = require("./dao/DeducibleDAO");
const parametro = require("./model/Parametro");
var funcion = require("./util/Util");
const constante = require("./util/Constante");
const respuesta = require("./model/Respuesta");

exports.obtenerDeducible = async (event, context, callback) => {

  var obtenerRespuesta = function (err, response) {
    var retorna = {};
     if (err) {
      retorna = respuesta (constante.TIPO_MENSAJE.ERROR, constante.MENSAJE.ERROR_GENERAL);
    } else {
      console.log(response)
      retorna = respuesta (constante.TIPO_MENSAJE.SUCCESS, constante.TIPO_MENSAJE.SUCCESS, response);
    }
    callback(null, retorna);
    context.succeed();
  };
 

  let body = JSON.parse(event.body);
  try {
    
    let payload = JSON.stringify(body.payload)
    let operacion = JSON.parse(payload).operacion
    let codDeducible = JSON.parse(payload).codigo
    let texto = JSON.parse(payload).text
    parametro.deducible = codDeducible
    console.log('operacion', operacion)
    if( operacion === "obtenerDeducible"){
      deducibleDAO.obtenerDeducible(texto,parametro,obtenerRespuesta);
    }
    
  } catch (err) {
    console.log('err', err);
    let retorna = respuesta(constante.TIPO_MENSAJE.ERROR,
      constante.MENSAJE.ERROR_GENERAL,
      err);
    callback(null, retorna);
    context.succeed();
  }

};
