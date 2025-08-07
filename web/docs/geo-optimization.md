# Otimizações Geoespaciais

## Índices Criados
- `GistIndex` no campo `location` do modelo Driver

## Consultas Otimizadas
```sql
-- Busca motoristas em 10km de raio
SELECT * FROM drivers_driver 
WHERE ST_DWithin(
  location, 
  ST_MakePoint(-25.96, 32.58)::geography, 
  10000
);