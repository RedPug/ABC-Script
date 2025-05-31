const modules = import.meta.glob([
  './expressions/*.ts',
  './literals/*.ts'
], { eager: true });

for (const path in modules) {
  const mod = modules[path] as { default?: { register?: () => void} };
  if (mod.default && typeof mod.default.register === 'function') {
    mod.default.register();
  }
}