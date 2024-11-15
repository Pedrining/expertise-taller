module.exports = function (tipo, mensaje, data, indMostrarMensaje) {
  let obj = {
    payload: []
  };
  obj.payload.push(...data)
  console.log('body', JSON.stringify(obj));
    return {
      statusCode: 200,
      body: JSON.stringify(obj),
    };
  };
