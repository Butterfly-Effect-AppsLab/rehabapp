import sys

from .bedro import *
from .hornachrbtica import *
from .hrudnik import *
from .krk import *
from .rameno import *
from .laket import *
from .clenok import *
from .zapastie import *
from .chodidlo import *
from .koleno import *


def getTree(tree_name):
    ret = list()
    if tree_name == "bedro" or tree_name == "all":
        ret.append(bedro)
    if tree_name == "hornachrbtica" or tree_name == "all":
        ret.append(hornachrbtica)
    if tree_name == "hrudnik" or tree_name == "all":
        ret.append(hrudnik)
    if tree_name == "krk" or tree_name == "all":
        ret.append(krk)
    if tree_name == "rameno" or tree_name == "all":
        ret.append(rameno)
    if tree_name == "laket" or tree_name == "all":
        ret.append(laket)
    if tree_name == "clenok" or tree_name == "all":
        ret.append(clenok)
    if tree_name == "zapastie" or tree_name == "all":
        ret.append(zapastie)
    if tree_name == "chodidlo" or tree_name == "all":
        ret.append(chodidlo)
    if tree_name == "koleno" or tree_name == "all":
        ret.append(koleno)

    if len(ret) == 0:
        sys.exit(f"Tree {tree_name} does't exist")
    return ret