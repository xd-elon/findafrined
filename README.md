
[] Deve ser possivel criar um usuario
[] Deve ser possivel identificar o usuario entre as requisições

[] Deve ser possivel Registrar uma refeição feita, com as seguintes informações:
  * Nome, * Descrição, * Data e hora, * esta dentro ou fora da dieta

[] Deve ser possivel editar uma refeição, podendo alterar todos os dados acima
[] Deve ser possivel apagar uma refeição
[] Deve ser possivel listar todas as refeições de um usuario
[] Deve ser possivel visualizar uma unica refeição
[] Deve ser possivel recuperar as metricas de um usuario:
  * Quantidade total de refeições registradas
  * Quantidade total de refeições dentro da dieta
  * Quantidade total de refeiçoes fora da dieta
  * Melhor sequencia por dia de refeiçoes dentro da dieta

[] O usuario so pode visualizar, editar e apagar as refeições as qual ele criou


# estrutura do projeto 

  project-root/
  │
  ├── prisma/            # Diretório para os arquivos do Prisma
  │   ├── schema.prisma  # Esquema do banco de dados Prisma
  │   ├── migrations/    # Diretório contendo as migrações geradas pelo Prisma
  │   └── seeds/              # Scripts para popular o banco de dados com dados iniciais
  │
  ├── src/                   # Diretório principal do código fonte da aplicação
  │   ├── modules/            # Cada módulo do sistema (ex: users, products, etc.)
  │   │   ├── user/           # Módulo para User (exemplo)
  │   │   │   ├── user.controller.ts  # Controlador do usuário
  │   │   │   ├── user.service.ts     # Lógica de negócios do usuário
  │   │   │   ├── user.model.ts       # Definição de tipos e/ou classes de usuário
  │   │   │   └── user.routes.ts      # Rotas relacionadas a usuários
  │   │   └── ...                    # Outros módulos
  │   │
  │   ├── common/             # Utilitários e código compartilhado
  │   │   ├── middlewares/    # Middlewares globais
  │   │   ├── helpers/        # Funções utilitárias
  │   │   └── constants.ts    # Constantes globais
  │   │
  │   ├── config/             # Configurações de ambiente
  │   │   ├── db.ts           # Configuração do Prisma ou banco de dados
  │   │   └── env.ts          # Configuração de variáveis de ambiente
  │   │
  │   ├── interfaces/         # Definição de interfaces TypeScript
  │   │   └── user.interface.ts # Interfaces para o módulo de usuários (exemplo)
  │   │
  │   ├── server.ts           # Arquivo principal que inicia o servidor
  │   └── app.ts              # Configuração e inicialização do app (ex: Express)
  │
  ├── tests/                 # Testes do projeto
  │   ├── unit/              # Testes unitários
  │   └── integration/       # Testes de integração
  │
  ├── .env                   # Arquivo de variáveis de ambiente
  ├── .gitignore             # Arquivos e diretórios a serem ignorados pelo Git
  ├── package.json           # Dependências e scripts do Node.js
  ├── tsconfig.json          # Configurações do TypeScript
  └── README.md              # Documentação do projeto