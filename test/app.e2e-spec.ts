import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';


describe('Testes no Módulo de Tarefas (e2e)', () => {
  let app: INestApplication;
  let tarefaId = Number;
  let tarefaNome= String;
  let categoriaId = Number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: 
      [
        TypeOrmModule.forRoot
        ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Root1234',
        database: 'db_test_todo',
        autoLoadEntities: true,
        synchronize: true,
        dropSchema: true,
        logging:false
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('1º Teste - Cadastrando Tarefas', async () => {
    let response = await request(app.getHttpServer())
      .post('/tarefa')
      .send
      ({
        nome: 'Lavar louça',
        descricao: 'Lavar as louças de todas as refeições realizadas durante o dia',
        responsavel: 'Matoso',
        data: '2022-09-15',
        status: true
      })
      .expect(201)

      tarefaId = response.body.id
      tarefaNome = response.body.nome
  });

  it('2º Teste - Buscar Dados Pelo Id', async () => {
    return request (app.getHttpServer())
    .get('/tarefa/' + tarefaId)
    .expect(200)
  })

  it('3º Teste - Buscando Dados Pelo Nome', async () => {
    return request (app.getHttpServer())
    .get('/tarefa/nome/' + tarefaNome)
    .expect (200)
  })

  it('4º Teste - Buscando Tarefas', async () => {
    return request (app.getHttpServer())
    .get('/tarefa')
    .expect (200)
  })

  it('5º Teste - Atualizando Dados de uma Tarefa', async () => {
    return request(app.getHttpServer())
    .put('/tarefa')
    .send
    ({
      id: 1,
      nome: 'Lavar louça',
      descricao: 'Lavar as louças de todas as refeições realizadas durante o dia',
      responsavel: 'Lulu',
      data: '2022-09-15',
      status: true
    })
    .expect (200)
    .then(response => {
      expect ('Lulu').toEqual(response.body.responsavel)
    })
  })


    it('6º Teste - Não Atualizando Dados de uma Tarefa', async () => {
      return request(app.getHttpServer())
      .put('/tarefa')
      .send
      ({
        id: 2,
        nome: 'Lavar louça',
        descricao: 'Lavar as louças de todas as refeições realizadas durante o dia',
        responsavel: 'Lulu',
        data: '2022-09-15',
        status: true
      })
      .expect (404)
      })


  it('7º Teste - Deletando Tarefa', async () => {
    return request (app.getHttpServer())
    .delete('/tarefa/' + tarefaId)
    .expect(204)
  })


// ------------TESTANDO TABELA DE CATEGORIA-------------

it('1º Teste - Cadastrando Categorias', async () => {
  let response = await request(app.getHttpServer())
    .post('/categoria')
    .send
    ({
      nome: 'Limpeza',
      descricao: 'Limpezas Gerais',
    })
    .expect(201)

    categoriaId = response.body.id
});

it('2º Teste - Buscar Dados Pelo Id', async () => {
  return request (app.getHttpServer())
  .get('/categoria/' + categoriaId)
  .expect(200)
})

it('3º Teste - Não Buscando Dados Pela Descrição', async () => {
  return request (app.getHttpServer())
  .get('/tarefa/descricao/')
  .expect (400)
})

it('4º Teste - Não Atualizando Dados de uma Categoria', async () => {
  return request(app.getHttpServer())
  .put('/categoria')
  .send
  ({
    id: 3,
    nome: 'Limpeza',
    descricao: 'Limpezas do dia a dia',
  })
  .expect (404)
})

  it('5º Teste - Não Deletando Categorias', async () => {
  return request (app.getHttpServer())
  .delete('/tarefa/3')
  .expect(404)
  })

  afterAll (async () => {
    await app.close ()
  })

});
