const api = require('../../handler.js');
const apiGatewayGenerator = require('../utils/apiGatewayGenerator.js');

jest.setTimeout(10000);
describe('Creación de test para la prueba de talleres - Caso D314', () => {
  test('Debería retornar 200 y validar que la respuesta sea la esperada', (done) => {
    const event = apiGatewayGenerator({
      body: {
        payload: {
          operacion: 'obtenerDeducible',
          codigo: 'D314',
          text: '10% del monto del siniestro, minimo US$ 500.00 en Talleres Nissan Maquinarias\n10% del monto del siniestro, minimo US$ 700.00 en Otros Talleres\nEn caso de discrepancia prevalece el mayor. No incluye I.G.V.'
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
                    deducible: '10',
                    copago: '500.00',
                    moneda: 'USD',
                    tipo: 'NO TIPO',
                    marca: 'NO MARCA',
                    taller: 'Nissan Maquinarias'
                },{
                  deducible: '10',
                  copago: '700.00',
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