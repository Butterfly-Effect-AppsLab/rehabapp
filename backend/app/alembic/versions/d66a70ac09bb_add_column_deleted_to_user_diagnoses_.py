"""Add column deleted to user_diagnoses table

Revision ID: d66a70ac09bb
Revises: a8cd21ee40d1
Create Date: 2020-06-28 15:44:08.347045

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd66a70ac09bb'
down_revision = 'a8cd21ee40d1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_diagnoses', sa.Column('deleted', sa.Boolean(), server_default='f', nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user_diagnoses', 'deleted')
    # ### end Alembic commands ###