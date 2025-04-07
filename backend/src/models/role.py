from typing import List, Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from .permission_has_role import PermissionHasRole

if TYPE_CHECKING:
    from .user import User
    from .permission import Permission

class RoleBase(SQLModel):
    name: str = Field(max_length=100, unique=True)
    description: str = Field(max_length=255)

class Role(RoleBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    permissions: List["Permission"] = Relationship(
        back_populates="roles",
        link_model=PermissionHasRole
    )
    users: List["User"] = Relationship(back_populates="role")

class RoleCreate(RoleBase):
    pass

class RoleRead(RoleBase):
    id: int

class RoleUpdate(RoleBase):
    pass 