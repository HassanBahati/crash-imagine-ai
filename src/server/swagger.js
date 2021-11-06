const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/task/': {
      get: {
        summary: 'Lists all the tasks',
        tags: ['task'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      post: {
        summary: 'Creates a task',
        tags: ['task'],
        parameters: [
          {
            name: 'task',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new task',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        },
      },
    },
    '/task/{id}': {
      get: {
        summary: 'Gets a task by its primary key',
        tags: ['task'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a task with primary key',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a task by its primary key',
        tags: ['task'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a task',
        tags: ['task'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Task',
            },
          },
          {
            name: 'task',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a task',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      patch: {
        tags: ['task'],
        summary: 'patch a task',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
          {
            name: 'task',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a task and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
    },

    '/project/': {
      get: {
        summary: 'Lists all the projects',
        tags: ['project'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Project',
            },
          },
        },
      },
      post: {
        summary: 'Creates a project',
        tags: ['project'],
        parameters: [
          {
            name: 'project',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateProject',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new project',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateProject',
            },
          },
        },
      },
    },
    '/project/{projectName}': {
      get: {
        summary: 'Gets a project by its primary key',
        tags: ['project'],
        parameters: [
          {
            name: 'projectName',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a project with primary key',
            schema: {
              $ref: '#/definitions/Project',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a project by its primary key',
        tags: ['project'],
        parameters: [
          {
            name: 'projectName',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a project',
        tags: ['project'],
        parameters: [
          {
            name: 'projectName',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Project',
            },
          },
          {
            name: 'project',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateProject',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a project',
            schema: {
              $ref: '#/definitions/Project',
            },
          },
        },
      },
      patch: {
        tags: ['project'],
        summary: 'patch a project',
        parameters: [
          {
            name: 'projectName',
            in: 'path',
            schema: {
              $ref: '#/definitions/Project',
            },
          },
          {
            name: 'project',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateProject',
            },
          },
        ],
        responses: {
          200: {
            description:
              'Returns a project and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Project',
            },
          },
        },
      },
    },

    '/user/': {
      get: {
        summary: 'Lists all the users',
        tags: ['user'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      post: {
        summary: 'Creates a user',
        tags: ['user'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new user',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        },
      },
    },
    '/user/{id}': {
      get: {
        summary: 'Gets a user by its primary key',
        tags: ['user'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a user with primary key',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a user by its primary key',
        tags: ['user'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a user',
        tags: ['user'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/User',
            },
          },
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a user',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      patch: {
        tags: ['user'],
        summary: 'patch a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a user and its partially overwritten values',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },

    '/team/': {
      get: {
        summary: 'Lists all the teams',
        tags: ['team'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Team',
            },
          },
        },
      },
      post: {
        summary: 'Creates a team',
        tags: ['team'],
        parameters: [
          {
            name: 'team',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTeam',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new team',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTeam',
            },
          },
        },
      },
    },
    '/team/{id}': {
      get: {
        summary: 'Gets a team by its primary key',
        tags: ['team'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a team with primary key',
            schema: {
              $ref: '#/definitions/Team',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a team by its primary key',
        tags: ['team'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a team',
        tags: ['team'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Team',
            },
          },
          {
            name: 'team',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTeam',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a team',
            schema: {
              $ref: '#/definitions/Team',
            },
          },
        },
      },
      patch: {
        tags: ['team'],
        summary: 'patch a team',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Team',
            },
          },
          {
            name: 'team',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTeam',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a team and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Team',
            },
          },
        },
      },
    },
  },
  definitions: {
    Task: {
      required: ['title', 'status', 'project', 'creator', 'assignedPrimary'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        title: {
          type: 'string',
          maxLength: 20,
        },
        body: {
          type: 'string',
          maxLength: 1000,
        },
        dueDate: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          enum: ['To do', 'In progress', 'Done'],
        },
        creation: {
          type: 'string',
          format: 'date-time',
        },
        priority: {
          type: 'integer',
          format: 'int32',
          minimum: 1,
          maximum: 5,
        },
        storyPoint: {
          type: 'number',
          format: 'float',
        },
        project: {
          type: 'string',
          uniqueItems: true,
          maxLength: 30,
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        assignedPrimary: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        assignedSecondary: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        parentTask: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        subtasks: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    Project: {
      required: ['projectName', 'creator'],
      properties: {
        projectName: {
          type: 'string',
          uniqueItems: true,
          maxLength: 30,
        },
        creation: {
          type: 'string',
          format: 'date-time',
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        tasks: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    User: {
      required: ['username'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        username: {
          type: 'string',
          maxLength: 80,
        },
        firstName: {
          type: 'string',
          maxLength: 80,
        },
        lastName: {
          type: 'string',
          maxLength: 80,
        },
        createdTasks: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
        assignedTasksPrimary: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
        assignedTasksSecondary: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
        createdProjects: {
          type: 'array',
          items: {
            type: 'string',
            maxLength: 30,
          },
          uniqueItems: true,
        },
        memberOf: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    Team: {
      required: ['name'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          maxLength: 80,
        },
        members: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },
  },
  createUpdateDef: {
    CreateUpdateTask: {
      required: ['title', 'status', 'project', 'creator', 'assignedPrimary'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        title: {
          type: 'string',
          maxLength: 20,
        },
        body: {
          type: 'string',
          maxLength: 1000,
        },
        dueDate: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          enum: ['To do', 'In progress', 'Done'],
        },
        creation: {
          type: 'string',
          format: 'date-time',
        },
        priority: {
          type: 'integer',
          format: 'int32',
          minimum: 1,
          maximum: 5,
        },
        storyPoint: {
          type: 'number',
          format: 'float',
        },
        project: {
          type: 'string',
          uniqueItems: true,
          maxLength: 30,
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        assignedPrimary: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        assignedSecondary: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        parentTask: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
      },
    },

    CreateUpdateProject: {
      required: ['projectName', 'creator'],
      properties: {
        projectName: {
          type: 'string',
          uniqueItems: true,
          maxLength: 30,
        },
        creation: {
          type: 'string',
          format: 'date-time',
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
      },
    },

    CreateUpdateUser: {
      required: ['username'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        username: {
          type: 'string',
          maxLength: 80,
        },
        firstName: {
          type: 'string',
          maxLength: 80,
        },
        lastName: {
          type: 'string',
          maxLength: 80,
        },
        memberOf: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    CreateUpdateTeam: {
      required: ['name'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          maxLength: 80,
        },
        members: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },
  },
};

export { swaggerDocument };
