import logging
from sqlmodel import Session

logger = logging.getLogger(__name__)

def create_initial_permissions(session: Session) -> None:
    logger.info("No hay permisos iniciales que crear por el momento")
    pass

def create_initial_roles(session: Session) -> None:
    logger.info("No hay roles iniciales que crear por el momento")
    pass 