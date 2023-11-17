import { createContainer, asClass, asValue, Lifetime } from 'awilix';

const container = createContainer();

container.loadModules(
  ['src/**/*.service.ts', 'src/**/*.repository.ts', 'src/**/*.controller.ts'],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
      register: asClass,
    },
  },
);

container.loadModules(['src/**/*.entity.ts', 'src/**/*.model.ts'], {
  formatName: 'camelCase',
  resolverOptions: {
    register: asValue,
  },
});

export { container };
