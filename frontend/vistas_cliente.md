# Vistas del Cliente

## Dashboard del Cliente

El Dashboard del Cliente debe mostrar una vista general del estado de cuenta y actividad reciente del usuario. Debe contener un resumen de las últimas compras realizadas mostrando la fecha, estado, y total de cada una, permitiendo acceder al detalle de cualquier pedido con un clic. Debe incluir una sección de notificaciones recientes donde el usuario pueda ver alertas sobre el estado de sus pedidos, promociones y otras comunicaciones importantes. También debe presentar una sección destacada con ofertas personalizadas basadas en el historial de compras y preferencias del usuario, mostrando productos con imágenes atractivas, descripciones breves y precios con descuentos aplicados.

## Perfil del Cliente

La vista de Perfil del Cliente debe permitir la gestión completa de la información personal. Debe incluir un formulario para editar los datos básicos como nombre, correo electrónico, número de teléfono y contraseña, con validación adecuada para cada campo. Debe contener una sección para administrar las direcciones de envío donde el usuario pueda añadir, editar, eliminar y marcar como predeterminada cualquier dirección. Finalmente, debe incluir una sección de preferencias de contacto donde el usuario pueda configurar cómo desea recibir notificaciones y qué tipo de comunicaciones quiere recibir, incluyendo opciones para suscripción a newsletter.

## Historial de Compras

El Historial de Compras debe presentar una lista ordenada cronológicamente de todos los pedidos realizados por el cliente. Cada pedido debe mostrar claramente su número identificador, fecha de compra, estado actual (enviado, recibido, cancelado), y monto total. La vista debe incluir filtros por fecha, estado y posibilidad de búsqueda por número de pedido. Al seleccionar un pedido específico, debe expandirse o dirigir a una vista detallada que muestre los productos adquiridos con sus cantidades y precios individuales, información de envío, método de pago utilizado y un timeline con el progreso del pedido. Debe incluir acceso para ver y descargar la factura correspondiente en formato PDF.

## Carrito de Compras

El Carrito de Compras debe mostrar todos los productos seleccionados para compra, presentando para cada uno una imagen representativa, nombre descriptivo, precio unitario, cantidad seleccionada con opción para modificarla, y subtotal. El usuario debe poder eliminar productos individualmente o vaciar todo el carrito. Al final de la lista de productos, debe aparecer un resumen del costo total desglosado en subtotal de productos, costo de envío (si aplica), impuestos y total a pagar. Debe incluir un botón prominente para proceder al pago que dirija al flujo de checkout. Si el carrito está vacío, debe mostrar un mensaje informativo y sugerir explorar productos.

## Proceso de Pago y Facturación

El Proceso de Pago debe implementarse como un flujo de pasos guiados. El primer paso debe permitir revisar los productos en el carrito una última vez. El segundo paso debe facilitar la selección o ingreso de una dirección de envío, mostrando las direcciones guardadas y permitiendo añadir una nueva. El tercer paso debe ofrecer la selección del método de pago con los campos requeridos según el método elegido. El paso final debe mostrar un resumen completo de la orden para confirmación, incluyendo productos, dirección de envío, método de pago y totales. Tras completar la compra, debe mostrar una pantalla de confirmación con el número de pedido, detalles del envío y acceso a la factura generada, además de ofrecer la opción de descargarla en formato PDF. 