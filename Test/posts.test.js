const request = require('supertest');
const app = require('../index');

describe('Pruebas de la API de posts', () => {
    test('Debe crear una publicación', async () => {
        const res = await request(app).post('/posts/create').send({
            title: "Título de prueba",
            body: "Cuerpo de la publicación"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Título de prueba");
    });
});
