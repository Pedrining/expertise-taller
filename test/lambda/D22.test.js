const api = require('../../handler');
const apiGatewayGenerator = require('../utils/apiGatewayGenerator.js');

jest.setTimeout(10000);
describe('Creación de test para la prueba de talleres - Caso D22', () => {
  test('Debería retornar 200 y validar que la respuesta sea la esperada', (done) => {
    const event = apiGatewayGenerator({
      body: {
        payload: {
          operacion: 'obtenerDeducible',
          codigo: 'D22',
          text: '(No Inclueye I.G.V.) Por evento 10 % del monto a indemnizar, mínimo US$200 .00 Excepto para: Robo Parcial 10 % del monto a indemnizar, mínimo US$150 .00 Siniestros atendidos en talleres preferenciales 10 % del monto a indemnizar, mínimo US$150 .00 Robo de accesorios Musicales 10 % del monto a indemnizar, mínimo 150.00 Responsabilidad civil 10 % del monto a indemnizar, mínimo 150.00 Robo total solo se aseguran con GPS obligatorio hasta el segundo año de antigüedad,sin coaseguro.Tercer año, coaseguro 80 / 20'
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