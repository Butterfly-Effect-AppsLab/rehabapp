areas = [
    {
        "tree": "krk",
        "name": "circles-krk-spredu",
        "text": "Bolesť zboku na krku",
        "area_detail": {
            "x": 83.0394,
            "y": 38.6362,
            "width": 132.817,
            "height": 135.605,
        }
    },
    {
        "tree": "krk",
        "name": "backcircles-krk-zozadu",
        "text": "Bolesť zboku na krku",
        "area_detail": {
            "x": 62.7951,
            "y": 30.8045,
            "width": 132.817,
            "height": 135.605,
        }
    }
]

diagnoses = [
    {
        "id": "d1",
        "name": "Myofasciálny syndróm zadnej skupiny svalov krku",
        "text": ""
    },
    {
        "id": "d2",
        "name": "Cervikobrachiálny syndróm",
        "text": ""
    },
    {
        "id": "d3",
        "name": "Syndróm hornej hrudnej apertúry",
        "text": ""
    },
    {
        "id": "d4",
        "name": "Ochorenie temporo-mandibulárneho kĺbu",
        "text": ""
    },
    {
        "id": "d5",
        "name": "Ochorenie zubu",
        "text": ""
    },
    {
        "id": "d6",
        "name": "Myofasciálny syndróm M. (Sternocleidomasto-ideus)",
        "text": ""
    },
    {
        "id": "d7",
        "name": "Myofasciálny syndróm bočnej skupiny svalov krku",
        "text": ""
    }
]

questions = [
    {
        "id": "q1",
        "text": "...Vám vyžaruje aj do ruky.",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q2",
        "text": "...Vám vyžaruje aj do ramena a paže.",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q3",
        "text": "...zhoršenie bolesti pri žuvaní?",
        "prepend_id": 2,
        "color_id": 1
    },
    {
        "id": "q4",
        "text": "...bolesť pri tlaku na spodné zuboradie?",
        "prepend_id": 2,
        "color_id": 2
    },
    {
        "id": "q5",
        "text": "...zhoršenie bolesti pri pohybe hlavou?",
        "prepend_id": 1,
        "color_id": 3
    }
]

options = [
    {
        "from": "a",
        "text": "Vyžaruje do oblasti záhlavia a vrchu lopatky",
        "label": "krk-dolopatky",
        "to": "q1",
    },
    {
        "from": "a",
        "text": "Vyžaruje do kľúčnej kosti",
        "label": "krk-klucnakost",
        "to": "q2",
    },
    {
        "from": "a",
        "text": "Vyžaruje do oblasti ucha a oka",
        "label": "krk-doucha",
        "to": "q3",
    },
    {
        "from": "q1",
        "text": "Áno",
        "to": "d2",
    },
    {
        "from": "q1",
        "text": "Nie",
        "to": "d1",
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
        "to": "d5",
    },
    {
        "from": "q4",
        "text": "Nie",
        "to": "d4",
    },
    {
        "from": "q5",
        "text": "Áno",
        "to": "d6",
    },
    {
        "from": "q5",
        "text": "Nie",
        "to": "d7",
    }
]
