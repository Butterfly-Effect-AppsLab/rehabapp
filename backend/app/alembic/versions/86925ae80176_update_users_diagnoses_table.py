"""Update users diagnoses table

Revision ID: 86925ae80176
Revises: 52fb727f3eca
Create Date: 2020-06-19 20:01:16.917570

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '86925ae80176'
down_revision = '52fb727f3eca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('user_diagnoses_sequence_id_fkey', 'user_diagnoses', type_='foreignkey')
    op.drop_constraint('user_diagnoses_user_id_fkey', 'user_diagnoses', type_='foreignkey')
    op.create_foreign_key(None, 'user_diagnoses', 'users', ['user_id'], ['id'], ondelete='SET NULL')
    op.drop_column('user_diagnoses', 'sequence_id')
    op.drop_table('sequences')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sequences',
                    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
                    sa.Column('next_id', sa.INTEGER(), autoincrement=False, nullable=True),
                    sa.Column('option_id', sa.INTEGER(), autoincrement=False, nullable=False),
                    sa.ForeignKeyConstraint(['next_id'], ['sequences.id'], name='sequences_next_id_fkey'),
                    sa.ForeignKeyConstraint(['option_id'], ['options.id'], name='sequences_option_id_fkey',
                                            onupdate='CASCADE', ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('id', name='sequences_pkey')
                    )
    op.add_column('user_diagnoses', sa.Column('sequence_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'user_diagnoses', type_='foreignkey')
    op.create_foreign_key('user_diagnoses_user_id_fkey', 'user_diagnoses', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('user_diagnoses_sequence_id_fkey', 'user_diagnoses', 'sequences', ['sequence_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###
