"""Create user_diagnoses table

Revision ID: fe8fc7f82c75
Revises: bbb244f65d97
Create Date: 2020-04-25 10:47:15.456006

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fe8fc7f82c75'
down_revision = 'bbb244f65d97'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_diagnoses',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('diagnose_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['diagnose_id'], ['diagnoses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_diagnoses')
    # ### end Alembic commands ###
