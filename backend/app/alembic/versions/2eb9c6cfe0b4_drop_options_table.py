"""Drop options table

Revision ID: 2eb9c6cfe0b4
Revises: b4a0653caa88
Create Date: 2020-05-08 16:59:22.535043

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2eb9c6cfe0b4'
down_revision = 'b4a0653caa88'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('options')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('options',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('label', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('question_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('next_diagnose_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('next_question_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.CheckConstraint('((next_question_id IS NULL) AND (next_diagnose_id IS NOT NULL)) OR ((next_question_id IS NOT NULL) AND (next_diagnose_id IS NULL))', name='one-of-two'),
    sa.ForeignKeyConstraint(['next_diagnose_id'], ['diagnoses.id'], name='options_next_diagnose_id_fkey', onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['next_question_id'], ['questions.id'], name='options_next_question_id_fkey', onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], name='options_question_id_fkey', onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='options_pkey')
    )
    # ### end Alembic commands ###