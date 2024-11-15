const api = require('../../handler.js');
const apiGatewayGenerator = require('../utils/apiGatewayGenerator.js');

jest.setTimeout(10000);
describe('Creación de test para la prueba de talleres - Caso D5936', () => {
  test('Debería retornar 200 y validar que la respuesta sea la esperada', (done) => {
    const event = apiGatewayGenerator({
      body: {
        payload: {
          operacion: 'obtenerDeducible',
          codigo: 'D5936',
          text: 'Por evento 15.00% del monto a indemnizar, mínimo US$ 150.00, en talleres afiliados Siniestros atendidos en red de talleres afiliados multimarca  10.00% del monto a indemnizar, mínimo US$ 150.00 Robo Parcial 15% del monto a indemnizar, mínimo US$ 150.00 Accesorios musicales 10.00% del monto a indemnizar, mínimo US$ 150.00 Conductor varón menor  de 25 años, 20% del monto del siniestro mínimo US$ 300, para todo evento (incluido pérdida total) Todo autos y SW mayores a US$ 50,000, Sistema de Rastreo Vehicular obligatorio para la cobertura de robo total. Toda Camioneta Rural/SUV mayor a US$ 50,000, Sistema de Rastreo Vehicular obligatorio para la cobertura de robo total Toyota Rav4, Land Cruiser, Land Crusier Prado, FJ Cruiser, Fortuner, Nissan Patrol, Pathfinder, Suzuki Grand Nomade, Honda CRV nuevas y hasta 2 años de antiguedad con Sistema de Rastreo Vehicular Obligatorio para cobertura de robo total (instalado y debidamente operativo con los mantenimientos solicitados por el proveedor). Reposición de lunas nacionales, sin deducible Por evento, Marca Mercedes Benz, BMW, Audi: 20% del monto a indemnizar, mínimo US$ 200.00 en talleres afiliados Por evento, Marca Mercedes Benz, BMW, Audi: 15% del monto a indemnizar, mínimo US$ 150.00 en talleres afiliados multimarca.'
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
                    copago: '150.00',
                    moneda: 'USD',
                    tipo: 'Multimarca',
                    marca: 'NO MARCA',
                    taller: 'NO TALLER'
                },{
                  deducible: '20',
                  copago: '200.00',
                  moneda: 'USD',
                  tipo: 'NO TIPO',
                  marca: 'Marca Mercedes Benz, BMW, Audi',
                  taller: 'NO TALLER'
              },{
                deducible: '15',
                copago: '150.00',
                moneda: 'USD',
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