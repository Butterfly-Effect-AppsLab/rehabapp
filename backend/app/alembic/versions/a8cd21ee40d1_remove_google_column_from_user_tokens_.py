"""Remove google column from user_tokens table

Revision ID: a8cd21ee40d1
Revises: d72424d9a7a8
Create Date: 2020-06-26 12:36:12.581500

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a8cd21ee40d1'
down_revision = 'd72424d9a7a8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user_tokens', 'google')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_tokens', sa.Column('google', sa.BOOLEAN(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
