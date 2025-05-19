import os
import requests
import random
import time
import logging
from sqlmodel import Session, select
from src.models.enterprise import Enterprise
from src.models.user import User
from src.models.role import Role
from src.models.product import Product, ProductStatus, Category
from src.config.settings import settings
from src.config.security import get_password_hash

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(message)s")

STATIC_IMG_DIR = "static/images/products"
BASE_IMAGE_URL = "http://localhost:8080/static/images/products"
SAMPLE_IMAGE_DATA = [
    {
        "name": "Café Orgánico Premium",
        "description": "Café 100% orgánico cultivado en las montañas colombianas, con un sabor suave y aroma intenso.",
        "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        "enterprise": "Montaña Café"
    },
    {
        "name": "Tomates Rojos Frescos",
        "description": "Tomates maduros seleccionados a mano, ideales para ensaladas y salsas caseras.",
        "image": "https://images.unsplash.com/photo-1502236876560-243e78f715f7",
        "enterprise": "Finca Natural"
    },
    {
        "name": "Ramo de Flores Artesanales",
        "description": "Flores naturales cuidadosamente arregladas para decoración o regalo especial.",
        "image": "https://images.unsplash.com/photo-1628076674561-6e9a0b56f2c3",
        "enterprise": "FlorArte"
    },
    {
        "name": "Cuaderno Hecho a Mano",
        "description": "Cuaderno artesanal con diseño rústico, ideal para notas, diarios o regalos personalizados.",
        "image": "https://images.unsplash.com/photo-1630948198694-c3cd4df3c9bb",
        "enterprise": "Tinta Viva"
    },
    {
        "name": "Pastel de Chocolate Artesanal",
        "description": "Delicioso pastel de chocolate oscuro, decorado con frutos secos y cacao natural.",
        "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        "enterprise": "Dulce Cacao"
    },
    {
        "name": "Pimientos Rojos Seleccionados",
        "description": "Pimientos rojos frescos, ricos en vitamina C y perfectos para saltear o asar.",
        "image": "https://images.unsplash.com/photo-1632446087139-e93c41c11f56",
        "enterprise": "Finca Natural"
    },
    {
        "name": "Lámparas Decorativas de Noche",
        "description": "Lámparas de diseño minimalista ideales para crear ambientes cálidos y modernos.",
        "image": "https://images.unsplash.com/photo-1693329428271-3742bd8220cc",
        "enterprise": "Luz & Diseño"
    },
    {
        "name": "Pastel de Fresas con Crema",
        "description": "Pastel casero con base esponjosa y fresas frescas, cubierto de crema natural.",
        "image": "https://images.unsplash.com/photo-1616986035206-90bc396686c7",
        "enterprise": "Dulce Cacao"
    },
    {
        "name": "Naranjas Jugosas del Campo",
        "description": "Naranjas seleccionadas directamente de cultivos locales, dulces y llenas de vitamina C.",
        "image": "https://plus.unsplash.com/premium_photo-1671119151604-d2af993980ad",
        "enterprise": "Finca Natural"
    },
    {
        "name": "Fresas Naturales Seleccionadas",
        "description": "Fresas dulces y frescas cosechadas a mano, perfectas para postres y smoothies.",
        "image": "https://images.unsplash.com/photo-1647924124055-5256a05159e6",
        "enterprise": "Finca Natural"
    }
]


def ensure_static_folder():
    os.makedirs(STATIC_IMG_DIR, exist_ok=True)


def download_sample_images():
    ensure_static_folder()
    for i, item in enumerate(SAMPLE_IMAGE_DATA):
        path = os.path.join(STATIC_IMG_DIR, f"sample_{i+1}.jpg")
        if not os.path.exists(path):
            ts = int(time.time() * 1000)
            url = f'{item["image"]}?w=600&t={ts}'
            headers = {"User-Agent": "Mozilla/5.0"}
            try:
                response = requests.get(
                    url, headers=headers, stream=True, timeout=10)
                if response.status_code == 200:
                    with open(path, "wb") as f:
                        for chunk in response.iter_content(1024):
                            f.write(chunk)
                    logger.info(f"Descargada imagen {path}")
                else:
                    logger.warning(
                        f"Error al descargar imagen:\n"
                        f"↳ URL: {response.url}\n"
                        f"↳ Status: {response.status_code} {response.reason}"
                    )
            except Exception as e:
                logger.error(f"Excepción en descarga de {url}: {e}")
            time.sleep(1.5)


def initialize_sample_data(session: Session):
    existing_user = session.exec(select(User).limit(1)).first()
    if existing_user:
        return

    logger.info("Creando datos de ejemplo...")

    role = session.exec(select(Role).where(Role.name == "EMPLOYEE")).first()

    enterprise_data = {
        "Montaña Café": Enterprise(
            name="Montaña Café",
            NIT="900001",
            email="contacto@montanacafe.com",
            phone_number="3101111111",
            currency="COP",
            description="Productores de café artesanal de origen colombiano.",
            address="Vereda El Retiro, Manizales"
        ),
        "Finca Natural": Enterprise(
            name="Finca Natural",
            NIT="900002",
            email="ventas@fincanatural.com",
            phone_number="3102222222",
            currency="COP",
            description="Frutas y verduras frescas directo del campo a tu mesa.",
            address="Kilómetro 12 vía Pereira, Villamaría"
        ),
        "FlorArte": Enterprise(
            name="FlorArte",
            NIT="900003",
            email="ventas@florarte.com",
            phone_number="3103333333",
            currency="COP",
            description="Flores cultivadas y arregladas artesanalmente.",
            address="Carrera 7 #21-33, Armenia"
        ),
        "Tinta Viva": Enterprise(
            name="Tinta Viva",
            NIT="900004",
            email="hola@tintaviva.co",
            phone_number="3104444444",
            currency="COP",
            description="Papelería creativa y productos hechos a mano.",
            address="Calle 12 #45-67, Medellín"
        ),
        "Dulce Cacao": Enterprise(
            name="Dulce Cacao",
            NIT="900005",
            email="dulces@dulcecacao.com",
            phone_number="3105555555",
            currency="COP",
            description="Repostería artesanal con ingredientes naturales.",
            address="Carrera 10 #34-90, Cali"
        ),
        "Luz & Diseño": Enterprise(
            name="Luz & Diseño",
            NIT="900006",
            email="info@luzydiseno.com",
            phone_number="3106666666",
            currency="COP",
            description="Decoración e iluminación para espacios modernos.",
            address="Calle 98 #22-31, Bogotá"
        )
    }

    for e in enterprise_data.values():
        session.add(e)
    session.commit()

    # Crear usuario ADMIN asociado a empresa ID 5 (Dulce Cacao)
    admin_role = session.exec(select(Role).where(Role.name == "ADMIN")).first()
    target_enterprise = session.get(Enterprise, 5)

    if admin_role and target_enterprise:
        admin_user = User(
            name="Administrador General",
            email="admin@empretech.com",
            phone_number="3107778888",
            document_id="9999999999",
            address="Calle Principal 999",
            password=get_password_hash("admin123"),
            is_active=True,
            document_verified=True,
            role_id=admin_role.id,
            enterprise_id=target_enterprise.id
        )
        session.add(admin_user)
        session.commit()
        logger.info("Usuario administrador creado.")

    category = Category(name="General", description="Categoría de prueba")
    session.add(category)
    session.commit()
    session.refresh(category)

    download_sample_images()

    for i, product_data in enumerate(SAMPLE_IMAGE_DATA):
        enterprise = enterprise_data[product_data["enterprise"]]
        product = Product(
            name=product_data["name"],
            description=product_data["description"],
            status=ProductStatus.ACTIVE,
            stock=int(random.uniform(1, 100)),
            production_cost=int(random.uniform(1.0, 100.0)),
            public_price=int(random.uniform(1.0, 100.0)),
            thumbnail=f"{BASE_IMAGE_URL}/sample_{i+1}.jpg",
            bar_code=f"BARCODE{i+1}",
            minimal_safe_stock=int(random.uniform(1, 100)),
            discount=int(random.uniform(0.0, 15)),
            enterprise_id=enterprise.id,
            category_id=category.id
        )
        session.add(product)
    session.commit()

    logger.info("Datos de ejemplo creados correctamente.")
