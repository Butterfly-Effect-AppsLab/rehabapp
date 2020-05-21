"""Add sequence_id to user_diagnoses table

Revision ID: 7db499e582e1
Revises: 4665028487a6
Create Date: 2020-05-08 17:08:14.479247

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7db499e582e1'
down_revision = '4665028487a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_diagnoses', sa.Column('sequence_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'user_diagnoses', 'sequences', ['sequence_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user_diagnoses', type_='foreignkey')
    op.drop_column('user_diagnoses', 'sequence_id')
    # ### end Alembic commands ###