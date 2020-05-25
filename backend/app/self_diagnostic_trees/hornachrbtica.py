tree = {
    "name": "hornachrbtica",
    "text": "Bolesť vrchnej časti chrbta",
}

areas = [
    {
        "name": "backcircles-hornachrbtica-zozadu",
        "x": 52.1545,
        "y": 59.23125,
        "width": 188.8602,
        "height": 147.8931,
    },
]

diagnoses = [
    {
        "id": "d1",
        "name": "Interkostálna neuralgia",
        "text": ""
    },
    {
        "id": "d2",
        "name": "Blok stavcov hrudnej chrbtice",
        "text": ""
    },
    {
        "id": "d3",
        "name": "Myofasciálny syndróm hrudnej chrbtice",
        "text": ""
    },
    # SH: mozno sa bude menit nazov
    {
        "id": "d4",
        "name": "Myofasciálny syndróm - mm. rhomboidei",
        "text": ""
    },
    {
        "id": "d5",
        "name": "Kvadrantový syndŕom",
        "text": ""
    },
    {
        "id": "d6",
        "name": "Horný skrížený syndróm",
        "text": ""
    }
]

questions = [
    {
        "id": "q1",
        "text": "...Vám vyžaruje zboku až spredu smerom na hrudník.",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q2",
        "text": "...sa Vám pri nádychu zhoršuje.",
        "prepend_id": 1,
        "color_id": 2
    },
    {
        "id": "q3",
        "text": "...Vám vyžaruje až do hrudníka.",
        "prepend_id": 1,
        "color_id": 3
    },
    {
        "id": "q4",
        "text": "...Vám vyžaruje iba na jednej strane až do ruky.",
        "prepend_id": 1,
        "color_id": 1
    }
]

options = [
    {
        "from": "a",
        "text": "Pozdĺž hrudnej chrbtice",
        "label": "hornachrbtica-hrudna",
        "side": "back",
        "to": "q1",
    },
    {
        "from": "a",
        "text": "V okolí jednej lopatky",
        "label": "hornachrbtica-lopatka",
        "side": "back",
        "to": "q3",
    },
    {
        "from": "a",
        "text": "Oblasť krku, vrchnej časti ramien a lopatiek",
        "label": "hornachrbtica-krk",
        "side": "back",
        "to": "q4",
    },
    {
        "from": "q1",
        "text": "Áno",
        "to": "d1",
    },
    {
        "from": "q1",
        "text": "Nie",
        "to": "q2",
    },
    {
        "from": "q2",
        "text": "Áno",
        "to": "d2",
    },
    {
        "from": "q2",
        "text": "Nie",
        "to": "d3",
    },
    {
        "from": "q3",
        "text": "Áno",
        "to": "d2",
    },
    {
        "from": "q3",
        "text": "Nie",
        "to": "d4",
    },
    {
        "from": "q4",
        "text": "Áno",
        "to": "d5",
    },
    {
        "from": "q4",
        "text": "Nie",
        "to": "d6",
    }
]
