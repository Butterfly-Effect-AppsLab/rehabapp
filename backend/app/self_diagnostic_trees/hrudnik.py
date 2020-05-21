areas = [
    {
        "tree": "hrudnik",
        "name": "circles-hrudnik",
        "text": "Bolesť chrbta vyžarujúca na hrudník",
        "area_detail": {
            "x": 94.9191,
            "y": 113.195,
            "width": 132.817,
            "height": 135.605,
        }
    }
]


diagnoses = [
    {
        "id": "d1",
        "name": "Blok stavcov hrudnej chrbtice (Interkostálna neuralgia)",
        "text": ""
    },
    {
        "id": "d2",
        "name": "Myofasciálny syndróm v oblasti lopatkového svalstva a svalstva hrudnej chrbtice",
        "text": ""
    },
    {
        "id": "d3",
        "name": "Možné ochorenie srdcového svalu",
        "text": ""
    },
    {
        "id": "d4",
        "name": "Tendinopatia prsného svalu",
        "text": ""
    }
]
questions = [
    {
        "id": "q1",
        "text": "...sa Vám zhoršuje  pri nádychu, alebo zakašľaní.",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q2",
        "text": "...na vysoký krvný tlak, alebo cukrovku?",
        "prepend_id": 5,
        "color_id": 1
    },
    {
        "id": "q3",
        "text": "...v nedávnej dobe intenzívne námahu ,alebo zaťaženie prsného svalu, či ramena?",
        "prepend_id": 10,
        "color_id": 2
    },
    {
        "id": "q4",
        "text": "...bolesť aj na chrbte?",
        "prepend_id": 2,
        "color_id": 3
    },
    {
        "id": "q5",
        "text": "... sa Vám zhoršuje pri nádychu, či zakašľaní.",
        "prepend_id": 1,
        "color_id": 2
    }
]

options = [
    {
        "from": "a",
        "text": "V oblasti rebier",
        "label": "hrudnik-rebra",
        "to": "q1",
    },
    {
        "from": "a",
        "text": "V prsiach až hrudnej kosti",
        "label": "hrudnik-prsia",
        "to": "q2",
    },
    {
        "from": "q1",
        "text": "Áno",
        "to": "d1",
    },
    {
        "from": "q1",
        "text": "Nie",
        "to": "d2",
    },
    {
        "from": "q2",
        "text": "Áno",
        "to": "d3",
    },
    {
        "from": "q2",
        "text": "Nie",
        "to": "q3",
    },
    {
        "from": "q3",
        "text": "Áno",
        "to": "q4",
    },
    {
        "from": "q3",
        "text": "Nie",
        "to": "q5",
    },
    {
        "from": "q4",
        "text": "Áno",
        "to": "q5",
    },
    {
        "from": "q4",
        "text": "Nie",
        "to": "d4",
    },
    {
        "from": "q5",
        "text": "Áno",
        "to": "d1",
    },
    {
        "from": "q5",
        "text": "Nie",
        "to": "d2",
    }
]
