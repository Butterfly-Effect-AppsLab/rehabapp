"""Add column front_name and back_name to areas table

Revision ID: a004515a4c29
Revises: 121d3f923987
Create Date: 2020-05-20 00:39:24.199690

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a004515a4c29'
down_revision = '121d3f923987'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('areas', sa.Column('back_name', sa.String(), nullable=True))
    op.add_column('areas', sa.Column('front_name', sa.String(), nullable=True))
    op.drop_column('areas', 'name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('areas', sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('areas', 'front_name')
    op.drop_column('areas', 'back_name')
    # ### end Alembic commands ###
