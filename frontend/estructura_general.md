# Estructura General de Vistas - Plataforma EmpreTech

## Tipos de Usuario

La plataforma EmpreTech está diseñada para tres tipos de usuarios con necesidades y funciones distintas:

1. **Cliente**: Usuario final que compra productos o servicios en la plataforma.
2. **Emprendedor**: Propietario de negocio que vende sus productos y utiliza herramientas de marketing.
3. **Administrador**: Gestor de la plataforma con acceso a todas las funcionalidades y datos.

## Organización de Rutas

Las rutas de la plataforma siguen una estructura jerárquica basada en el tipo de usuario:

- **Rutas Públicas**: Accesibles para cualquier visitante (ya implementadas)
  - `/`: Página principal
  - `/productos`: Listado de productos
  - `/productos/[id]`: Detalle de un producto específico
  - `/sobre-nosotros`: Información institucional
  - `/contacto`: Formulario de contacto
  - `/auth/*`: Rutas de autenticación (login, registro, recuperación)

- **Rutas de Cliente**:
  - `/cliente/dashboard`: Panel principal del cliente
  - `/profile`: Perfil de usuario (ruta existente a extender)
  - `/cliente/historial-compras`: Historial de pedidos
  - `/cliente/historial-compras/[id]`: Detalle de un pedido específico
  - `/cliente/carrito`: Carrito de compras
  - `/cliente/pago`: Proceso de pago
  - `/cliente/pago/confirmacion`: Confirmación de compra

- **Rutas de Emprendedor**:
  - `/emprendedor/dashboard`: Panel principal del emprendedor
  - `/emprendedor/productos`: Gestión de productos
  - `/emprendedor/productos/nuevo`: Crear nuevo producto
  - `/emprendedor/productos/[id]`: Editar producto existente
  - `/emprendedor/publicidad`: Gestión de publicidad
  - `/emprendedor/publicidad/nueva`: Crear nueva campaña
  - `/emprendedor/publicidad/[id]`: Editar campaña existente
  - `/emprendedor/leads`: Análisis de leads generados
  - `/emprendedor/pagos`: Gestión financiera
  - `/emprendedor/perfil`: Perfil del emprendimiento

- **Rutas de Administrador**:
  - `/admin/dashboard`: Panel principal del administrador
  - `/admin/emprendimientos`: Gestión de emprendimientos
  - `/admin/emprendimientos/[id]`: Detalle de emprendimiento
  - `/admin/usuarios`: Gestión de usuarios
  - `/admin/usuarios/[id]`: Editar usuario
  - `/admin/roles`: Gestión de roles
  - `/admin/roles/[id]`: Editar rol y permisos
  - `/admin/facturacion`: Control financiero global

## Navegación y Accesibilidad

La navegación entre estas vistas estará organizada mediante:

1. **Menú Principal**: En el header con opciones adaptadas según el tipo de usuario
2. **Menús Contextuales**: Para secciones específicas (ej: submenú de productos)
3. **Breadcrumbs**: Para navegar jerárquicamente y entender la ubicación actual
4. **Enlaces Rápidos**: En el dashboard de cada tipo de usuario

Para esta implementación inicial, todas las rutas estarán accesibles de manera pública sin validación de roles, permitiendo explorar todas las funcionalidades. En una fase posterior, se implementará la autenticación y validación de roles para restringir el acceso según corresponda.

## Consistencia Visual

Todas las vistas seguirán la paleta de colores y tipografía definidas para EmpreTech:

- **Colores principales**: 
  - Azul Profundo (#2E4057)
  - Azul Turquesa (#048BA8)
  - Naranja Enérgico (#F18F01)
  - Verde Crecimiento (#99C24D)
  - Blanco Hueso (#F4F4F8)

- **Tipografía**:
  - Títulos y encabezados: Montserrat
  - Texto general: Open Sans
  - Datos numéricos: Roboto Mono

Cada vista mantendrá una estructura coherente con elementos comunes como encabezados, tarjetas de información, tablas de datos y botones de acción, aprovechando los componentes UI ya existentes en el proyecto. 