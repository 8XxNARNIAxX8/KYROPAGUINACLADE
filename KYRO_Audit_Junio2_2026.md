# KYRO OS — AUDIT REPORT
**Fecha:** 2 de Junio 2026  
**Servidor:** 95.111.244.121 (Hetzner VPS)  
**Versión Gateway:** 3.1.0  
**Generado:** automáticamente por Claude Code

---

## 1. GIT LOG — Últimos 10 commits (kyro_gateway)

```
00cc004  Junio 2 - CORS, /api/stats|budgets|alerts|movements, fix datetime import
af9353a  Junio 2 - N8N workflow Drive Certificados, registrar_logro auto Google Doc
64d5289  Junio 2 - apuntes_clase, perfil_profesional, materias 2026-1, 4 endpoints conocimiento
b694a7f  cleanup: remove backup files
1e97e11  Junio 2 - 20 modos especializados, SearXNG todos los modos, alimentos industriales, Ollama phi3:mini
31bde4f  Junio 2 - Ollama, recetas, vocabulario, proveedores, AGENTS.md mejorado
ff18986  Junio 2 - Agua recordatorios, chequeos medicos, POST /api/chat con 5 keys Groq rotacion y datos reales por modo
9e295df  Junio 1 - Plan alimentacion, rutina gym personalizada, sobrecarga progresiva, correlacion modulos, presupuestos inteligentes, modos especializados, N8N workflows activos
5e0c66e  Junio 1 2026 - Dashboard vida, CEO mode, universidad, vision vida, EOQ, modos especializados, repaso ingles, credito clientes, proyeccion financiera
7e80a20  Kyro OS - 9 modulos completos - Mayo 31 2026
```

**kyro_web últimos commits:**
```
7eda651  Junio 2 - fix api.ts: read data.reply from chat endpoint
c129067  Start repository
```

---

## 2. BASE DE DATOS — kyros_os (182 tablas)

### Tablas con datos (rows > 0)

| Tabla | Rows | Tabla | Rows |
|-------|------|-------|------|
| agua_hidratacion | 1 | ejercicios | 42 |
| alimentos | 22 | ejercicios_rutina | 74 |
| apuntes_clase | 1 | entradas_diario | 1 |
| ayuno_intermitente | 1 | evaluacion_diaria | 1 |
| bucket_list_viajes | 1 | gastos_recurrentes | 5 |
| categorias_personalizadas | 1 | habitos | 2 |
| checklist_viaje | 6 | habitos_espirituales | 1 |
| chequeos_medicos | 3 | historial_medico_salud | 1 |
| cuentas | 10 | ideas | 1 |
| cumpleanos_eventos_sociales | 3 | ideas_contenido | 1 |
| cuotas_tarjeta | 1 | idiomas | 1 |
| deudas | 4 | interacciones_sociales | 1 |
| deudas_sociales | 1 | inversiones | 1 |
| inversiones_cripto | 1 | kyro_config | 1 |
| kyro_memoria | 3 | kyro_settings | 7 |
| libros | 1 | medidas_corporales | 2 |
| metas_financieras | 2 | movimientos | 3 |
| nexus_caja_diaria | 1 | nexus_clientes | 1 |
| nexus_cotizaciones | 1 | nexus_creditos_clientes | 1 |
| nexus_gastos_negocio | 1 | nexus_ingredientes_receta | 3 |
| nexus_inventario | 2 | nexus_items_cotizacion | 2 |
| nexus_items_venta | 3 | nexus_movimientos_inventario | 1 |
| nexus_negocio | 2 | nexus_ordenes_produccion | 1 |
| nexus_pagos_credito_cliente | 1 | nexus_productos | 2 |
| nexus_proveedores | 10 | nexus_recetas_produccion | 2 |
| nexus_sesion | 1 | nexus_ventas | 7 |
| okrs | 1 | patrimonio_neto | 2 |
| peliculas_series | 1 | perfil_fisico | 1 |
| perfil_profesional | 1 | personas_importantes | 3 |
| plan_alimentacion | 28 | plan_entrenamiento | 1 |
| presupuestos | 7 | proyectos | 2 |
| recetas | 25 | reflexiones_fe | 2 |
| registro_comidas | 7 | registro_habitos_espirituales | 2 |
| registros_habitos | 1 | rutinas | 8 |
| salud_general | 1 | sesiones_enfoque | 1 |
| sesiones_entrenamiento | 1 | sesiones_gaming | 1 |
| sesiones_idioma | 1 | sobrecarga_progresiva | 2 |
| suscripciones | 1 | tabla_fechas_universidad | 1 |
| tarjetas | 15 | tareas | 1 |
| universidad | 6 | viajes | 1 |
| videojuegos | 1 | vision_vida | 3 |
| vocabulario | 50 | | |

**Total tablas:** 182 | **Tablas con datos:** ~70 | **Tablas vacías:** ~112

---

## 3. ROUTERS — Endpoints por módulo

| Router | Líneas | @router endpoints | Módulo |
|--------|--------|-------------------|--------|
| finanzas.py | 1,595 | 70 | M1 — Finanzas personales |
| nexus.py | 1,956 | 70 | M5 — NEXUS ERP (Brasa 24) |
| salud.py | 2,211 | 44 | M3 — Salud & Fitness |
| conocimiento.py | 839 | 34 | M4 — Conocimiento |
| contenido.py | 485 | 23 | M6 — Contenido digital |
| proyectos.py | 700 | 30 | M2 — Proyectos & Hábitos |
| relaciones.py | 335 | 15 | M8 — Relaciones |
| viajes.py | 240 | 11 | M9 — Viajes |
| fe.py | 180 | 10 | M10 — Fe |
| heartbeat.py | 712 | 8 | Heartbeat & alertas |
| sistema.py | 1,759 | 6 router + 6 api_router | Sistema, Chat, Modos |
| **TOTAL** | **11,012** | **~327 endpoints** | |

### Modos de operación activos (GET /sistema/modo)
**20 modos** disponibles: finanzas, ceo, coach, fit, scholar, contenido, medico, abogado, chef, gym_coach, compras, tecnologia, investigador, negocios, lol_coach, automatizacion, tutor, psicologia, viajes_planner, alimentos_industriales

**SearXNG integrado:** activa búsqueda web en TODOS los modos cuando el mensaje contiene: `busca`, `buscar`, `qué es`, `precio de`, `últimas noticias`, `noticia`

---

## 4. SERVICIOS — Estado systemctl

### kyro-gateway
```
● kyro-gateway.service — Kyro Gateway API Central
   Active: active (running) — uptime desde Jun 2 20:32:30 -05
   PID: 906399 (python3)
   Memory: 50.0M | CPU: 9.657s
   Puerto: 0.0.0.0:8090
```
**Últimas requests (log en vivo):**
```
GET  /api/budgets    200 OK
GET  /api/movements  200 OK
GET  /api/alerts     200 OK
POST /api/chat       200 OK
GET  /finanzas/resumen 200 OK
GET  /api/stats      200 OK
```

### kyro-cerebro
```
● kyro-cerebro.service — Kyro Cerebro Central M7
   Active: active (running) — uptime desde Jun 2 18:20:37 -05
   PID: 886009 (nanobot)
   Memory: 79.2M | CPU: 20.753s
   Cron: heartbeat cada 30min | dream cada 30min
```

---

## 5. DOCKER — Contenedores activos

| Nombre | Imagen | Estado | Puertos |
|--------|--------|--------|---------|
| searxng | searxng/searxng:latest | Up 3 hours | 0.0.0.0:8082->8080 |
| duplicati | duplicati/duplicati | Up 2 months | 0.0.0.0:8200->8200 |
| pgadmin | dpage/pgadmin4 | Up 2 months | 0.0.0.0:5050->80 |
| vaultwarden | vaultwarden/server:latest | Up 2 months (healthy) | 0.0.0.0:8080->80 |
| uptime-kuma | louislam/uptime-kuma:1 | Up 2 months (healthy) | 0.0.0.0:3001->3001 |
| n8n | n8nio/n8n | Up 2 months | 0.0.0.0:5678->5678 |
| ngrok | ngrok/ngrok | Up 2 months | 0.0.0.0:4040->4040 |
| postgresql | postgres:15 | Up 6 days | 0.0.0.0:5432->5432 |
| portainer | portainer/portainer-ce:latest | Up 2 months | 0.0.0.0:8000, 9443 |

**Total:** 9 contenedores | **SearXNG** añadido esta sesión

---

## 6. GET /sistema/estado

```json
{
  "kyro_os": "operativo",
  "gateway_version": "3.1.0",
  "database": "conectada",
  "modulos_activos": [
    "M1_finanzas", "M2_proyectos", "M3_salud", "M4_conocimiento",
    "M5_nexus", "M6_contenido", "M8_relaciones", "M9_viajes",
    "M10_fe", "heartbeat", "sistema"
  ],
  "estadisticas": {
    "movimientos": 3,
    "cuentas": 10,
    "memorias_activas": 2,
    "heartbeat_activo": "true"
  },
  "timestamp": "2026-06-02T20:59:53.337787"
}
```

---

## 7. KYRO WEB — Frontend React

**Repositorio:** `https://github.com/8XxNARNIAxX8/KYROPAGUINACLADE`  
**Ruta en servidor:** `/root/kyro_web`  
**Build:** `/root/kyro_web/dist` (533 kB JS + 26 kB CSS)  
**Servido en:** `http://95.111.244.121:3000` (Nginx)  
**Stack:** React 18 + Vite 5 + TypeScript + Tailwind + Recharts

### src/pages/
| Archivo | Tamaño | Descripción |
|---------|--------|-------------|
| Chat.tsx | 11,042 B | Chat multi-modo con 20 modos, historial por modo |
| Dashboard.tsx | 11,695 B | Stats + Recharts + Presupuestos + Alertas + Movimientos |
| Finanzas.tsx | 11,421 B | Módulo finanzas completo con cuentas, objetivos, movimientos |
| Placeholder.tsx | 2,192 B | Pantalla "en construcción" para módulos pendientes |

### src/components/
| Archivo | Tamaño | Descripción |
|---------|--------|-------------|
| Sidebar.tsx | 10,011 B | Nav lateral, 11 secciones, submenu NEXUS, mobile overlay |
| VoiceButton.tsx | 13,984 B | Orb flotante 80px → overlay 500px con neural connections |
| Skeletons.tsx | 1,413 B | SkeletonCard, SkeletonBar, SkeletonRow, SkeletonAlert |

### Endpoints conectados (api.ts)
```
API_BASE = http://95.111.244.121:8090
GET  /api/stats      → 4 StatCards (patrimonio, caja, hábitos, calorías)
GET  /api/budgets    → Presupuestos con gasto real del mes
GET  /api/alerts     → Alertas presupuesto >80%, deudas próximas, stock bajo
GET  /api/movements  → Últimos 20 movimientos
POST /api/chat       → Chat LLM con 20 modos (Groq llama-3.3-70b)
```

---

## 8. N8N — Workflows

**Total:** 16 workflows | **Activos:** 7 | **Inactivos:** 9

| Estado | ID | Nombre |
|--------|----|--------|
| ACTIVE | Yz8DdjaRyPFwFDjT | Kyro — Alerta Deudas Próximas |
| ACTIVE | TQedY1nepqgXJl5s | Kyro — Alerta Presupuesto 80% |
| ACTIVE | DYaSJ1cr9cscXwyn | Kyro — Auto Cobro Recurrentes |
| ACTIVE | CCSR4VHCzPQO1Yls | Kyro — Drive Certificados *(nuevo — pendiente credencial Google Drive)* |
| ACTIVE | W0fSSTYVOMlb6PqU | Kyro — Gmail Auto Gastos |
| ACTIVE | 6IA8z3yQqG5EwJ0F | Kyro — Rentabilidad Semanal Inversiones |
| ACTIVE | jy4TD3H1iZLbRKtv | Kyro — Reporte Semanal Finanzas |
| inactive | 09icZc1v4tms8DQ1 | Kyro Alerta Deudas Proximas (legacy) |
| inactive | DKPfKWmwwASA8E9M | Kyro Alerta Presupuesto 80% (legacy) |
| inactive | jxx6mZA3wW8ggflS | Kyro Auto Cobro Recurrentes (legacy) |
| inactive | NFR1vNd1RV9amzJt | Kyro Gmail Auto Gastos (legacy) |
| inactive | wifn9FUPqVTKrksA | Kyro Rentabilidad Semanal Inversiones (legacy) |
| inactive | g8FhvCBcY5N8MUim | Kyro Reporte Semanal Finanzas (legacy) |
| inactive | bF5m0mg2jJujxLuZ | Kyro — Cerebro |
| inactive | QFBEaayCkxgEvYjh | Kyro — Finanzas |
| inactive | RfwWGeonScQpYNqa | test |

---

## 9. INFRAESTRUCTURA — Resumen de puertos

| Puerto | Servicio | Estado |
|--------|---------|--------|
| 80 / 443 | Nginx (proxy reverso) | activo |
| 3000 | Nginx → kyro_web/dist (React) | **nuevo esta sesión** |
| 3001 | Uptime Kuma (monitoreo) | activo |
| 4040 | Ngrok (tunelado) | activo |
| 5050 | pgAdmin (DB admin) | activo |
| 5432 | PostgreSQL (kyros_os) | activo |
| 5678 | N8N (automatizaciones) | activo |
| 8000 | Portainer (Docker UI) | activo |
| 8080 | Vaultwarden (contraseñas) | activo |
| 8082 | SearXNG (búsqueda web) | **nuevo esta sesión** |
| 8090 | Kyro Gateway (FastAPI) | activo |
| 8200 | Duplicati (backups) | activo |
| 9443 | Portainer HTTPS | activo |
| 11434 | Ollama (LLM local phi3) | activo (localhost) |
| 18790 | Nanobot / kyro-cerebro | activo (localhost) |

---

## 10. RESUMEN DE SESIÓN — Junio 2, 2026

### Lo implementado hoy

| # | Cambio | Archivos |
|---|--------|----------|
| 1 | 14 nuevos modos especializados (total 20) | routers/sistema.py |
| 2 | SearXNG desplegado (docker, puerto 8082) | Docker |
| 3 | Búsqueda web integrada en /api/chat para todos los modos | routers/sistema.py |
| 4 | Modo `alimentos_industriales` con expertise INVIMA/embutidos | routers/sistema.py |
| 5 | N8N workflow "Drive Certificados" (POST /webhook/kyro-drive) | N8N |
| 6 | GET /conocimiento/registrar/logro → auto crea Google Doc | routers/conocimiento.py |
| 7 | Tablas `apuntes_clase` y `perfil_profesional` creadas | DB |
| 8 | 4 endpoints /conocimiento (apuntes, perfil, registrar) | routers/conocimiento.py |
| 9 | 5 materias semestre 2026-1 insertadas en `universidad` | DB |
| 10 | CORS habilitado en kyro_gateway (allow_origins=["*"]) | kyro_gateway.py |
| 11 | 4 endpoints /api/* para Dashboard React | routers/sistema.py |
| 12 | kyro_web clonado y buildeado (npm run build) | /root/kyro_web |
| 13 | Nginx sirviendo React en puerto 3000 | /etc/nginx/sites-available/kyros |
| 14 | api.ts corregido para leer data.reply | src/api.ts |
| 15 | Backups .bak eliminados del repo | git |

### Pendientes / Próxima sesión

- [ ] **Google Drive credential**: crear en n8n UI (Credentials → New → Google Drive OAuth2 API) y asignar al workflow `CCSR4VHCzPQO1Yls`
- [ ] **Dashboard datos reales**: los 4 endpoints /api/* funcionan pero la DB tiene pocos movimientos (solo 3) — datos crecerán con uso
- [ ] **VoiceButton real**: implementar Web Speech API en VoiceButton.tsx (actualmente es UI-only)
- [ ] **Páginas pendientes**: Salud, Proyectos, Conocimiento, Viajes, Relaciones, Fe, Brasa24 en kyro_web
- [ ] **Chat historial**: actualmente se pierde al recargar — considerar persistencia en DB
- [ ] **Autenticación**: kyro_web es público — considerar añadir auth básica o token

---

*Reporte generado: 2026-06-02 — Kyro OS Gateway v3.1.0*
