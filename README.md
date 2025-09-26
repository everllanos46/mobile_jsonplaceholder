# JSONPlaceholder Mobile (React Native)

Aplicación móvil desarrollada con **React Native (Expo)** y **TypeScript** que replica en dispositivos móviles las funcionalidades de la prueba web usando **JSONPlaceholder** como única fuente de datos.

## 🚀 Tecnologías y Stack

- **React Native con Expo** (TypeScript)
- **React Navigation** (Tabs + Stack)
- **React Query** para manejo de datos remotos
- **FlatList** para listas virtualizadas
- **AsyncStorage** para persistencia local (favoritos opcional)
- Estilos: StyleSheet / Tailwind React Native

Base URL: `https://jsonplaceholder.typicode.com/`

## 📱 Funcionalidades

### Pestaña “Usuarios”
- Lista de usuarios con `GET /users`.
- Muestra `name`, `username`, `email`.
- Filtro/búsqueda por `name` o `username`.
- Pull-to-refresh.
- Estados: cargando, error (reintentar), vacío.

### Detalle de usuario
- Datos ampliados (`phone`, `website`, `address.city`, `company.name`).
- Posts del usuario: lista secundaria con `GET /posts?userId=:id`.
- Tap en post → abre detalle del post.

### Pestaña “Posts”
- Lista de posts con `GET /posts`.
- Muestra `title` + primeras líneas de `body`.
- Búsqueda por título.
- Orden asc/desc por título.
- Paginación/infinite scroll.
- Estados: cargando, error (reintentar), vacío.

### Detalle de post
- `GET /posts/:id` con `title` y `body`.
- Comentarios `GET /posts/:id/comments` (nombre, email, contenido).
- Agregar comentario local: formulario `name`, `email`, `body` (mock local con etiqueta `(local)`).

### (Opcional) Favoritos
- Marcar usuarios o posts como favoritos.
- Persistencia con AsyncStorage.
- Vista “Favoritos” desde el header/tercera tab.
- Estado de favorito sincronizado.

## 📂 Estructura del proyecto

```
src/
  api/                # llamadas a JSONPlaceholder
  lib/                # declaraciones de Comentary, Post y User
  hooks/              # hooks React Query (useUsers, useUser, usePosts...)
  screens/            # pantallas (UsersList, UserDetail, PostsList, PostDetail)
  components/         # componentes reutilizables (UserCard, PostCard...)
  utils/              # helpers (filterAndSort)
  tests/              # tests unitarios y de componentes
```

## 🛠 Instalación y uso

Requisitos:
- Node.js >= 18
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)

Clonar e instalar:
```bash
git clone https://github.com/everllanos46/mobile_jsonplaceholder.git
cd mobile_jsonplaceholder
npm install
```

Levantar la app:
```bash
npx expo start
```

## 🧪 Testing

Se usan **Jest** y **@testing-library/react-native**.

Ejecutar tests:
```bash
npm test
```
## 📝 Decisiones técnicas

- **React Query**: simplifica la gestión de datos, estados de carga y refresco.
- **FlatList**: listas virtualizadas para rendimiento.
- **Paginación/infinite scroll**: client-side cargando en páginas de 20 ítems.
- **Mocks locales**: comentarios locales y (opcional) favoritos sin necesidad de POST real.
- **Tipado con TS**: mayor seguridad en datos y props.
- **Tests básicos**: validar funciones puras y componentes clave.