"""Add column token_created_at to users table

Revision ID: 6bf60f5ce212
Revises: 1d50461fde35
Create Date: 2020-04-29 07:40:11.535787

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6bf60f5ce212'
down_revision = '1d50461fde35'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('token_created_at', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'token_created_at')
    # ### end Alembic commands ###
