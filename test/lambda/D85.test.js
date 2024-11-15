const api = require('../../handler.js');
const apiGatewayGenerator = require('../utils/apiGatewayGenerator.js');

jest.setTimeout(10000);
describe('Creación de test para la prueba de talleres - Caso D85', () => {
  test('Debería retornar 200 y validar que la respuesta sea la esperada', (done) => {
    const event = apiGatewayGenerator({
      body: {
        payload: {
          operacion: 'obtenerDeducible',
          codigo: 'D85',
          text: '*Los siniestros, serán atendidos únicamente en la relación de talleres especiales descritos en la cláusula  VEHA07 20% del monto indemnizable, mínimo US$ 200 20% del monto indemnizable para pérdida total'
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
                    deducible: '20',
                    copago: '200',
                    moneda: 'USD',
                    tipo: 'NO TIPO',
                    marca: 'NO MARCA',
                    taller: 'NO TALLER'
                }]
        })
        done();
      }
    };

    api.obtenerDeducible(event, context, callback);
  });
});