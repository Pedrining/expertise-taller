const api = require('../../handler.js');
const apiGatewayGenerator = require('../utils/apiGatewayGenerator.js');

jest.setTimeout(10000);
describe('Creación de test para la prueba de talleres - Caso D4514', () => {
  test('Debería retornar 200 y validar que la respuesta sea la esperada', (done) => {
    const event = apiGatewayGenerator({
      body: {
        payload: {
          operacion: 'obtenerDeducible',
          codigo: 'D4514',
          text: 'Por evento 15.00% del monto a indemnizar, mínimo S/. 560.00, en talleres afiliados Excepto para: Siniestros atendidos en red de talleres afiliados multimarca 10.00% del monto a indemnizar, mínimo S/. 420.00 Robo Parcial 15% del monto a indemnizar, mínimo S/. 420.00 Accesorios musicales 10.00% del monto a indemnizar, mínimo S/. 420.00 Conductor varón menor  de 25 años, 20% del monto del siniestro mínimo S/. 840.00, para todo evento (incluído pédida total) Toyota Rav4, Land Cruiser, Land Crusier Prado, FJ Cruiser, Fortuner, Nissan Patrol, Pathfinder, Suzuki Grand Nomade, Honda CRV nuevas y hasta 2 años con Sistema de Rastreo Vehicular Obligatorio para cobertura de robo total. Camionetas Rurales/SUV mayores a S/. 140,000 Sistema de Rastreo Vehicular obligatorio para la cobertura de robo total. Por evento, Marca Mercedes Benz, BMW, Audi: 20% del monto a indemnizar, mínimo S/. 560.00 en talleres afiliados. Por evento, Marca Mercedes Benz, BMW, Audi: 15% del monto a indemnizar, mínimo S/. 420.00 en talleres afiliados multimarca. Para Volcaduras incluyendo Xtrail, Pathfinder, Patrol, rurales y suv: 20%, monto del siniestro, mínimo S/. 420.00+ IGV Imprudencia culposa 20% del siniestro mínimo S/. 840.00'
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
                    deducible: '15.00',
                    copago: '560.00',
                    moneda: 'PEN',
                    tipo: 'Multimarca',
                    marca: 'NO MARCA',
                    taller: 'NO TALLER'
                },{
                  deducible: '20',
                  copago: '560.00',
                  moneda: 'PEN',
                  tipo: 'NO TIPO',
                  marca: 'Marca Mercedes Benz, BMW, Audi',
                  taller: 'NO TALLER'
              },{
                deducible: '15',
                copago: '420.00',
                moneda: 'PEN',
                tipo: 'Multimarca',
                marca: 'Marca Mercedes Benz, BMW, Audi',
                taller: 'NO TALLER'
            }]
        })
        done();
      }
    };

    api.obtenerDeducible(event, context, callback);
  });
});