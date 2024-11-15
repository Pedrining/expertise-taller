const api = require('../../handler.js');
const apiGatewayGenerator = require('../utils/apiGatewayGenerator.js');

jest.setTimeout(10000);
describe('Creación de test para la prueba de talleres - Caso D10', () => {
  test('Debería retornar 200 y validar que la respuesta sea la esperada', (done) => {
    const event = apiGatewayGenerator({
      body: {
        payload: {
          operacion: 'obtenerDeducible',
          codigo: 'D10',
          text: '* Por Evento 15% del monto del siniestro, mínimo US$ 150.00 en Talleres Afiliados Multimarca * Por Evento 15% del monto del siniestro, mínimo US$ 250.00 en Talleres Afiliados'
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
                    deducible: '15',
                    copago: '150.00',
                    moneda: 'USD',
                    tipo: 'Multimarca',
                    marca: 'NO MARCA',
                    taller: 'NO TALLER'
                },{
                  deducible: '15',
                  copago: '250.00',
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