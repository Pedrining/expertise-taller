const api = require('../../handler.js');
const apiGatewayGenerator = require('../utils/apiGatewayGenerator.js');

jest.setTimeout(10000);
describe('Creación de test para la prueba de talleres - Caso D86', () => {
  test('Debería retornar 200 y validar que la respuesta sea la esperada', (done) => {
    const event = apiGatewayGenerator({
      body: {
        payload: {
          operacion: 'obtenerDeducible',
          codigo: 'D86',
          text: '- Ausencia de control: 25.00% del monto indemnizar, mínimo US$ 500.00 (Talleres Afiliados). - Ausencia de control: 25.00% del monto indemnizar, mínimo US$ 300.00 (Talleres Afiliados Multimarca). -Pérdida total por ausencia de control: 25.00% del monto a i'
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
                    deducible: '25.00',
                    copago: '500.00',
                    moneda: 'USD',
                    tipo: 'NO TIPO',
                    marca: 'NO MARCA',
                    taller: 'NO TALLER'
                },{
                  deducible: '25.00',
                  copago: '300.00',
                  moneda: 'USD',
                  tipo: 'Multimarca',
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