Universidad de Medellín · Desarrollo Web
Proyecto de Aula
Desarrollo Web Full-Stack


Modalidad: Individual
Valor: 25% de la nota final
Fecha: Jueves 4 de junio de 2026, 16:00 – 20:00
Escala: 0–100 pts → reportados sobre 50
Conversión: nota = (puntos / 100) × 50  ·  Ejemplo: 84 pts → 42 / 50
¿Qué debo entregar?
Una aplicación web full-stack compuesta por dos repositorios independientes en GitHub (ambos públicos). Ambos deben estar escritos en TypeScript.



Repositorio
Tecnologías
Backend
Node.js + Express + TypeScript + PostgreSQL
Frontend
React / Next.js + TypeScript
Antes de la sustentación debes entregar por los dos canales:

UVirtual (Moodle) — subir en la actividad habilitada con los cuatro links.
Correo al docente — enviar los mismos links al correo institucional.


Qué
Dónde
Repositorio backend (GitHub)
URL del repo
Repositorio frontend (GitHub)
URL del repo
Demo backend desplegado
URL del servicio (Render, Railway…)
Demo frontend desplegado
URL del sitio (Vercel, Netlify…)
Criterios y puntaje


#
Criterio
Pts
1
Backend — API REST
18
2
Backend — Base de datos
10
3
Backend — Autenticación JWT
10
4
Backend — Protección de rutas
7
5
Backend — Validaciones y errores
10
6
Frontend — Autenticación y sesión
8
7
Frontend — Protección de rutas
7
8
Frontend — Vistas y UX
10
9
Frontend — Consumo de la API
5
10
Arquitectura (Clean Architecture)
5
11
Calidad del código
5
12
Repositorio y documentación
5
TOTAL
100


Nivel
Puntos del criterio
🟢
Excelente
100 %
🔵
Bueno
75 %
🟡
Aceptable
50 %
🔴
Insuficiente
0–25 %
1. Backend — API REST18 pts
Lo que se espera: CRUD completo para al menos dos recursos del dominio de tu proyecto. Cada endpoint usa el verbo HTTP correcto (GET, POST, PUT/PATCH, DELETE) y retorna el código de estado apropiado. Las rutas siguen la convención /api/v1/recursos. Al menos un recurso soporta filtros y paginación con la estructura { data, meta }.



🟢
CRUD completo en ≥ 2 recursos. Verbos y códigos HTTP correctos. Paginación con { data, meta }. Respuestas consistentes.
18
🔵
CRUD completo pero algún verbo o código de estado incorrecto. Paginación sin meta completa o filtros parciales.
13
🟡
≥ 1 recurso con crear y listar. Faltan editar o eliminar. Sin paginación.
9
🔴
Menos de 2 endpoints funcionales o la API no inicia.
0–4
2. Backend — Base de datos10 pts
Lo que se espera: Conexión real a PostgreSQL (Supabase, Neon, Railway o local). Uso de Prisma, Sequelize o SQL con pg. Al menos dos tablas relacionadas con FK. Tipos de datos apropiados. Sin datos hardcodeados.



🟢
PostgreSQL real + ORM correcto. ≥ 2 tablas con FK. Tipos apropiados (uuid, text, numeric, timestamptz). Sin hardcoding.
10
🔵
Conexión y ORM funcionando pero schema con inconsistencias o sin migraciones.
7
🟡
BD conectada pero solo una tabla o sin relaciones correctas.
5
🔴
Datos en memoria, sin BD real o la conexión falla.
0–2
3. Backend — Autenticación JWT10 pts
Lo que se espera: POST /auth/register y POST /auth/login funcionales. Contraseñas con hash (bcrypt). JWT generado con JWT_SECRET en variables de entorno y con tiempo de expiración. Tokens inválidos o expirados retornan 401.



🟢
Register y login retornan JWT con expiración. Contraseñas con bcrypt. JWT_SECRET en .env. Token inválido/expirado → 401.
10
🔵
Login y registro funcionan, JWT implementado, pero falta expiración o firma hardcodeada.
7
🟡
Login genera token pero sin hash de contraseña o sin expiración.
5
🔴
Sin autenticación o contraseñas en texto plano.
0–2
4. Backend — Protección de rutas7 pts
Lo que se espera: Middleware de autenticación centralizado que verifica el JWT en el header Authorization: Bearer. Endpoints POST/PUT/DELETE protegidos. Al menos una ruta restringida por rol: sin permiso → 403.



🟢
Middleware centralizado en el router. Sin token → 401. Token inválido → 401. Ruta de admin sin permiso → 403.
7
🔵
Middleware cubre la mayoría de rutas pero falta protección por rol o alguna ruta privada es accesible sin token.
5
🟡
Verificación manual del token en algunos controladores (no centralizada). Sin distinción de roles.
3
🔴
Sin protección de rutas o todas son públicas.
0–1
5. Backend — Validaciones y errores10 pts
Lo que se espera: Validar body (campos requeridos, tipos, formatos como email o fechas ISO), params (id válido) y query params (page, limit numéricos). Cada error retorna el código HTTP correcto con mensaje descriptivo. Stack trace nunca expuesto. Errores del ORM capturados.



🟢
Validación de body, params y query. Código HTTP correcto por tipo de error. Sin stack trace expuesto. Errores del ORM capturados.
10
🔵
Validaciones en la mayoría de endpoints pero algún caso borde sin cubrir. Mensajes genéricos.
7
🟡
Validaciones solo en campos críticos. Sin manejo de errores del ORM/BD.
5
🔴
Sin validaciones o los errores causan crash del servidor.
0–2
6. Frontend — Autenticación y sesión8 pts
Lo que se espera: Formularios de registro y login conectados a tu propia API. JWT persistido en localStorage o cookie. La sesión sobrevive al refrescar la página. Logout limpia el token. 401 redirige automáticamente al login. Errores del backend junto al campo, no en un alert.



🟢
Registro, login y logout funcionan. Sesión persistente al refrescar. 401 redirige automáticamente. Errores junto al campo.
8
🔵
Registro, login y logout con persistencia. Falta manejo de 401 automático o algún error no se muestra.
6
🟡
Login y registro funcionan pero la sesión se pierde al refrescar o el logout no limpia bien.
4
🔴
Sin autenticación en el frontend o el token no se envía en las requests.
0–2
7. Frontend — Protección de rutas7 pts
Lo que se espera: Componente o wrapper de ruta privada: sin token → redirige a /login. Ruta de admin verifica el rol: sin permiso → redirige. Con sesión activa, login/registro redirigen al dashboard. Existe página 404.



🟢
Ruta privada implementada. Sin sesión → login. Sin rol → redirige. Con sesión en login/registro → dashboard. Página 404.
7
🔵
Rutas privadas redirigen a login, pero falta protección por rol o redirección desde login con sesión activa.
5
🟡
Rutas básicas pero las privadas son accesibles escribiendo la URL sin sesión.
3
🔴
Sin protección de rutas o cualquier usuario accede a cualquier página.
0–1
8. Frontend — Vistas y UX10 pts
Lo que se espera: Al menos: login/registro, dashboard o listado principal, formulario crear/editar, y vista de admin o detalle. Componentes reutilizables separados de páginas. Estados de UI: loading, vacío, error. Responsive. Diseño coherente. Accesibilidad básica (labels, contraste).



🟢
≥ 4 vistas. Componentes reutilizables separados. Estados loading/vacío/error. Responsive. Diseño coherente. Labels y contraste correctos.
10
🔵
Vistas completas y componentes separados, pero falta algún estado de UI o el responsive tiene problemas.
7
🟡
Vistas funcionales sin componentes reutilizables o solo funciona en desktop.
5
🔴
Sin estilos o con problemas graves de usabilidad.
0–2
9. Frontend — Consumo de la API5 pts
Lo que se espera: Capa de servicios o cliente HTTP centralizado (no fetch disperso en los componentes). Token inyectado automáticamente en los headers. Errores de la API capturados y mostrados al usuario.



🟢
Cliente HTTP centralizado. Token inyectado automáticamente. Todos los endpoints relevantes consumidos. Errores mostrados al usuario.
5
🔵
Servicios presentes pero algunas llamadas dispersas en componentes. Manejo de errores genérico.
4
🟡
fetch directo en los componentes, token pasado manualmente cada vez.
2
🔴
No consume la API propia o las respuestas no se reflejan en la UI.
0–1
10. Arquitectura — Clean Architecture5 pts
Lo que se espera: Ambos lados aplican Clean Architecture, adaptada a su naturaleza.



Backend — 4 capas estrictas
domain/      → entidades, repositorios (interfaces)
application/ → casos de uso, DTOs
infrastructure/ → ORM, implementaciones
interface/   → controladores, rutas
Frontend — aplicación flexible
services/ → llamadas a la API
hooks/    → lógica reutilizable
components/ → UI sin lógica de negocio
pages/    → composición
types/    → interfaces y tipos


🟢
Backend: 4 capas correctas, lógica de negocio fuera de controladores. Frontend: servicios separados, hooks para lógica, tipos definidos. TypeScript correcto en ambos lados.
5
🔵
Separación presente en ambos lados pero alguna capa mezcla responsabilidades (ej. fetch en componentes, lógica en controladores).
4
🟡
Hay carpetas organizadas pero controladores acceden al ORM directamente, o componentes contienen toda la lógica.
2
🔴
Todo en pocos archivos. Sin separación de capas. Sin TypeScript significativo.
0–1
11. Calidad del código5 pts
Lo que se espera: Nombres claros y consistentes. Funciones con una sola responsabilidad. Sin console.log olvidados, sin any indiscriminado, sin código muerto. Formato uniforme (Prettier / ESLint).



🟢
Nombres claros. Funciones pequeñas. Sin código muerto ni console.log. Sin any. Formato uniforme. Sin warnings en consola.
5
🔵
Código legible con detalles menores (algún nombre confuso, console.log olvidados).
4
🟡
Funcional pero descuidado: nombres genéricos (data, temp), funciones largas, varios warnings.
2
🔴
Código difícil de leer, sin ninguna convención.
0–1
12. Repositorio y documentación5 pts
Lo que se espera: Dos repositorios públicos en GitHub, cada uno con README (descripción, setup, variables de entorno, link o screenshots). .env.example en el backend. El .env real no debe estar commiteado.



🟢
Dos repos públicos con README completo. .env.example en el backend. Demo accesible.
5
🔵
Dos repos con README adecuado pero sin despliegue o con algún problema menor.
4
🟡
Repositorios entregados con README mínimo. Solo corre en local.
2
🔴
Falta algún repositorio, sin README o .env real commiteado.
0–1
Penalizaciones


Situación
Descuento
Entrega después de las 20:00 del 4 de junio
No se acepta
Backend sin TypeScript (JavaScript puro)
−15 pts
Frontend sin TypeScript (JavaScript puro)
−15 pts
Uso de any de forma generalizada (>30% de los tipos)
−5 pts
Credenciales commiteadas (.env con valores reales)
−10 pts
Plagio (código copiado de otro estudiante)
Nota 0 + reporte
Backend con datos en memoria en vez de BD real
−15 pts
Frontend consume una API ajena en vez de la propia
−20 pts
Bonificaciones (opcionales, hasta +10 pts extra)


Bonus
Pts
Pruebas unitarias o de integración significativas
+5
Dark mode funcional
+2
Filtros avanzados combinados (fechas, monto, texto)
+2
Animaciones / micro-interacciones bien logradas
+2
Internacionalización (i18n, mínimo 2 idiomas)
+2
Los puntos extra no superan los 100 totales; se usan para compensar descuentos.

Checklist antes de entregar


Backend
☐
El proyecto está en TypeScript (tsconfig.json presente, archivos .ts)
☐
La API inicia con npm run dev sin errores
☐
.env.example presente — .env real no commiteado
☐
CRUD completo para al menos dos recursos
☐
Registro y login retornan JWT con expiración
☐
Contraseñas almacenadas con bcrypt
☐
Middleware centralizado: sin token → 401, token inválido → 401
☐
Ruta de admin protegida por rol: sin permiso → 403
☐
Validaciones retornan 400 con mensajes descriptivos
☐
404 para recursos no encontrados, 500 controlado
Frontend
☐
El proyecto está en TypeScript (tsconfig.json presente, archivos .ts / .tsx)
☐
Login persiste sesión al refrescar la página
☐
Logout limpia el token y redirige a login
☐
Rutas privadas redirigen a login si no hay sesión
☐
Ruta de admin redirige si el rol es insuficiente
☐
Recibir 401 → redirige automáticamente al login
☐
Crear, ver, editar y eliminar actualizan la UI sin recargar
☐
Formularios validan en el cliente y muestran errores junto al campo
☐
Sin console.log ni any regados
Entrega
☐
Repositorio de backend público en GitHub con README
☐
Repositorio de frontend público en GitHub con README
☐
Backend desplegado y accesible (Render, Railway…)
☐
Frontend desplegado y accesible (Vercel, Netlify…)
☐
Los cuatro links enviados en UVirtual (Moodle) antes de la sustentación
☐
Los mismos cuatro links enviados al correo del docente
Sustentación — 4 de junio
Hay dos grupos que sustentan en franjas distintas. Cada franja tiene 110 minutos efectivos (inicia 5 min después y termina 5 min antes), lo que da 6 minutos por estudiante.



Grupo 1 — 16:05 a 17:55 · 17 estudiantes
1
Agudelo Carmona Violeta
16:05 – 16:11
2
Bedoya Cano Andrés
16:11 – 16:17
3
Bermúdez Bedoya Alejandro
16:17 – 16:23
4
Berrío Díaz Juan Pablo
16:23 – 16:29
5
Córdoba Urquijo Tomás
16:29 – 16:35
6
Gallego Meneses Samuel David
16:35 – 16:41
7
Gómez Guzmán Juan Diego
16:41 – 16:47
8
Guerra Herrera Luis Carlos
16:47 – 16:53
9
Henao Metaute Tomás
16:53 – 16:59
10
López Arenas Jorge Steven
16:59 – 17:05
11
Meneses Montoya Samuel
17:05 – 17:11
12
Ortiz Ortiz Daniel
17:11 – 17:17
13
Ospina Lamprea Lenin
17:17 – 17:23
14
Rivera Masmela David Alejandro
17:23 – 17:29
15
Rivera Murillo Jerónimo
17:29 – 17:35
16
Sanabria Gómez Diego Alberto
17:35 – 17:41
17
Valencia Valencia Sebastián
17:41 – 17:47
Colchón: 17:47 – 17:55 (~8 min)
Grupo 2 — 18:05 a 19:55 · 16 estudiantes
1
Calad Correa Emmanuel
18:05 – 18:11
2
Espinosa Arias Samuel
18:11 – 18:17
3
Franco Alzate Juliana
18:17 – 18:23
4
Giraldo Hurtado Luis Miguel
18:23 – 18:29
5
González Marín Santiago
18:29 – 18:35
6
Londoño Ortega Ana Sofía
18:35 – 18:41
7
Monsalve Aguilar Víctor Manuel
18:41 – 18:47
8
Orozco Gallego Emanuel
18:47 – 18:53
9
Ospina Arroyave Edison
18:53 – 18:59
10
Peña Restrepo Alejandro
18:59 – 19:05
11
Prada Moreno Félix Fabián
19:05 – 19:11
12
Rincón Granda Juana Valentina
19:11 – 19:17
13
Rodríguez Ruiz David Santiago
19:17 – 19:23
14
Ruiz Arias Ximena
19:23 – 19:29
15
Vélez Pino David
19:29 – 19:35
16
Villa Zuleta Sebastián
19:35 – 19:41
Colchón: 19:41 – 19:55 (~14 min)
Distribución de los 6 minutos por estudiante
No hay presentación de diapositivas. Todo ocurre dentro de la aplicación en vivo.



¿Qué construí y para qué?
Explicado navegando la app (el dashboard o la página de inicio funciona como portada)
1 min
Demo en vivo
Registro → login → CRUD completo → ruta protegida por rol
4 min
Pregunta del docente
—
1 min
El código lo revisa el docente por separado con esta rúbrica sobre el repositorio entregado. Si el estudiante no se presenta, la nota máxima es 50 / 100.