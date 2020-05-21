"""Create colors table

Revision ID: 01514e271567
Revises: 086e20e849e3
Create Date: 2020-05-08 17:00:48.491127

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01514e271567'
down_revision = '086e20e849e3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('colors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text_color', sa.String(), nullable=True),
    sa.Column('background_color', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('colors')
    # ### end Alembic commands ###