const api = require('../../handler.js');
const apiGatewayGenerator = require('../utils/apiGatewayGenerator.js');

jest.setTimeout(10000);
describe('Creación de test para la prueba de talleres - Caso D1256', () => {
  test('Debería retornar 200 y validar que la respuesta sea la esperada', (done) => {
    const event = apiGatewayGenerator({
      body: {
        payload: {
          operacion: 'obtenerDeducible',
          codigo: 'D1256',
          text: 'AUSENCIA DE CONTROL EN TALLERES JAPAN AUTOS, 22% del DEL MONTO DEL SINIESTRO, Mínimo de US$500.00. AUSENCIA DE CONTROL'
        }
      }
    });

    const context = {
      succeed: jest.fn()
    };

    const callback = (error, result) => {
      if (error) {
        done(error);
      } else {
        expect(result.statusCode).toBe(200)
        const body = JSON.parse(result.body)
        expect(body).toEqual({
                payload: [{
                    deducible: '22',
                    copago: '500.00',
                    moneda: 'USD',
                    tipo: 'NO TIPO',
                    marca: 'NO MARCA',
                    taller: 'JAPAN AUTOS'
                }]
        })
        done();
      }
    };

    api.obtenerDeducible(event, context, callback);
  });
});