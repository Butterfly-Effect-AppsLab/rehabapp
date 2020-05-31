tree = {
    "name": "chodidlo",
    "text": "Bolesť chodidla"
}

areas = [
    {
        "name": "circles-chodidlo-spredu",
        "x": 62,
        "y": 545.0952,
        "width": 166,
        "height": 130,
    },
    {
        "name": "backcircles-chodidlo-zozadu",
        "x": 61.9602,
        "y": 545.2499,
        "width": 166,
        "height": 130,
    },
]

diagnoses = [
    {
        "id": "d1",
        "name": "Plantárna fasciitída",
        "text": ""
    },
    {
        "id": "d2",
        "name": "Syndróm tarzálneho tunela",
        "text": ""
    },
    {
        "id": "d3",
        "name": "Reumatoidná artritída",
        "text": ""
    },
    {
        "id": "d4",
        "name": "Mortonov neuróm",
        "text": ""
    },
    {
        "id": "d5",
        "name": "Dna",
        "text": ""
    },
    {
        "id": "d6",
        "name": "Burzitída",
        "text": ""
    },
    # SH: mozno sa bude menit nazov
    {
        "id": "d7",
        "name": "Tendinopatia m. tibialis",
        "text": ""
    },
    {
        "id": "d8",
        "name": "Syndróm hrany holennej kosti",
        "text": ""
    }
]

questions = [
    {
        "id": "q1",
        "text": "...tŕpnutie v okolí vnútorného členku alebo necitlivosť v oblasti šľapy?",
        "prepend_id": 2,
        "color_id": 1
    },
    {
        "id": "q2",
        "text": "...alebo ste v minulosti trpeli bolesťou chrbta.",
        "prepend_id": 5,
        "color_id": 2
    },
    {
        "id": "q3",
        "text": "... vo Vašom chodidle (zvrchu nohy) prítomná tuhá hrčka? Najčastejšie je to oblasť medzi 4. a 5. "
                "palcom.",
        "prepend_id": 4,
        "color_id": 1
    },
    {
        "id": "q4",
        "text": "...je horšia ráno hneď po zobudení a neskôr počas dňa a pri zahriatí sa zmierňuje.",
        "prepend_id": 1,
        "color_id": 2
    },
    {
        "id": "q5",
        "text": "...uchopíte svoje chodidlo do dlane tak, že do nej vložíte svoj nárt a následne ho stlačíte, "
                "Vaša bolesť sa zhorší.",
        "prepend_id": 3,
        "color_id": 3
    },
    {
        "id": "q6",
        "text": "...sedíte alebo ležíte a potiahnete špičku nahor smerom k sebe, Vaša bolesť sa zhorší.",
        "prepend_id": 3,
        "color_id": 1
    },
    {
        "id": "q7",
        "text": "...je horšia ráno po zobudení, po zahriatí a počas celého dňa, a zmierňuje sa až večer.",
        "prepend_id": 1,
        "color_id": 1
    }
]

options = [
    {
        "from": "a",
        "text": "Zospodu chodidla",
        "label": "chodidlo-zospodu",
        "side": "back",
        "to": "q1",
    },
    {
        "from": "a",
        "text": "Zvrchu chodidla",
        "label": "chodidlo-zvrchu",
        "side": "back",
        "to": "q3",
    },
    {
        "from": "a",
        "text": "Prstov",
        "label": "chodidlo-prsty",
        "side": "front",
        "to": "q7",
    },
    {
        "from": "a",
        "text": "Päty",
        "label": "chodidlo-pata",
        "side": "back",
        "to": "different_tree_question",
        "tree": "clenok",
        "option": "clenok-zozadu",
    },
    {
        "from": "q1",
        "text": "Áno",
        "to": "q2",
    },
    {
        "from": "q1",
        "text": "Nie",
        "to": "d1",
    },
    # SH: tento strom nebude v soft launch-i
    # {
    #     "from": "q2",
    #     "text": "Áno",
    #     "to": "different_tree",
    #     "tree": "driek",
    # },
    {
        "from": "q2",
        "text": "Nie",
        "to": "d2",
    },
    {
        "from": "q3",
        "text": "Áno",
        "to": "d4",
    },
    {
        "from": "q3",
        "text": "Nie",
        "to": "q4",
    },
    {
        "from": "q4",
        "text": "Áno (bolesť je poobede/večer miernejšia a zlepšuje sa po zahriatí)",
        "to": "d3",
    },
    {
        "from": "q4",
        "text": "Nie",
        "to": "q5",
    },
    {
        "from": "q5",
        "text": "Áno",
        "to": "d6",
    },
    {
        "from": "q5",
        "text": "Nie (je stále rovnaká)",
        "to": "q6",
    },
    {
        "from": "q6",
        "text": "Áno",
        "to": "d7",
    },
    {
        "from": "q6",
        "text": "Nie",
        "to": "d8",
    },
    {
        "from": "q7",
        "text": "Áno (k večeru a po zahriatí sa bolesť zmierňuje)",
        "to": "d3",
    },
    {
        "from": "q7",
        "text": "Nie (pohybom sa bolesť nemení alebo sa zhoršuje)",
        "to": "d5",
    }
]
