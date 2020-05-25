tree = {
    "name": "rameno",
    "text": "Bolesť ramena"
}

areas = [
    {
        "name": "circles-rameno-spredu",
        "x": 117.7777,
        "y": 74.5713,
        "width": 132.817,
        "height": 135.605,
    },
    {
        "name": "backcircles-rameno-zozadu",
        "x": 28.3175,
        "y": 76.3063,
        "width": 132.817,
        "height": 135.605,
    }
]

diagnoses = [
    {
        "id": "d1",
        "name": "Hernia medzistavcovej platničky krčnej chrbtice (Degeneratívne ochorenie krčnej chrbtice)",
        "text": ""
    },
    {
        "id": "d2",
        "name": "Mm. scaleni syndróm (Syndróm hornej hrudnej apertúry)",
        "text": ""
    },
    {
        "id": "d3",
        "name": "Myofasciálny syndróm oblasti ramenného pletenca",
        "text": ""
    },
    {
        "id": "d4",
        "name": "Poškodenie labra ramenného kĺbu - SLAP",
        "text": ""
    },
    {
        "id": "d5",
        "name": "Adhezívna kapsulitída - Frozen shoulder",
        "text": ""
    },
    {
        "id": "d6",
        "name": "Impingement syndróm",
        "text": ""
    },
    {
        "id": "d7",
        "name": "Tendinitída/poškodenie rotatorovej manžety",
        "text": ""
    },
    {
        "id": "d8",
        "name": "Tendinitída/poškodenie šľachy bicepsu",
        "text": ""
    },
    {
        "id": "d9",
        "name": "Poškodenie/natrhnutie rotatorovej manžety",
        "text": ""
    },
    {
        "id": "d10",
        "name": "Poškodenie akromio-klavikulárneho spojenia",
        "text": ""
    }
]

questions = [
    {
        "id": "q1",
        "text": "...ukloníte hlavu k bolestivej ruke a začnete ňou rotovať, Vaše príznaky sa zhoršia.",
        "prepend_id": 3,
        "color_id": 3
    },
    {
        "id": "q2",
        "text": "...Vám spôsobuje oslabenie sily v ruke alebo zhoršenie citlivosti na ruke.",
        "prepend_id": 1,
        "color_id": 2
    },
    {
        "id": "q3",
        "text": "...tŕpnutie a bolesť vyžarujúcu pozdĺž paže až do lakťa, alebo až do prstov?",
        "prepend_id": 2,
        "color_id": 1
    },
    {
        "id": "q4",
        "text": "...vo Vašom ramene pri jeho pohybe prítomne škrípanie, alebo lúpanie?",
        "prepend_id": 4,
        "color_id": 2
    },
    {
        "id": "q5",
        "text": "...Vám v ramene spôsobuje výrazné obmedzenie rozsahu pohybu.",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q6",
        "text": "...je prítomná pri upažovaní (v 20 až 120 st.)",
        "prepend_id": 1,
        "color_id": 2
    },
    {
        "id": "q7",
        "text": "...svoju ruku vzpažíte (ruka nad hlavou), začnete ju tlačiť pred seba (o stenu), alebo si na ňu "
                "ľahnete,  Vaša bolesť sa zhorší.",
        "prepend_id": 3,
        "color_id": 3
    },
    {
        "id": "q8",
        "text": "...Vám vyžaruje dopredu paže (cez biceps) prípadne až do lakťovej jamy (spredu lakťa).",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q9",
        "text": "...sa Vám pri upažení a následnej  rotácii paže palcom nadol zhorší.",
        "prepend_id": 1,
        "color_id": 2
    },
    {
        "id": "q10",
        "text": "...na bok svojho ramena vyviniete tlak (napr. v ľahu na posteli), Vaša bolesť sa zhorší.",
        "prepend_id": 3,
        "color_id": 3
    },
    {
        "id": "q11",
        "text": "...sa Vám pri predpažení a následnom úchope opačného ramena výrazne zhorší.",
        "prepend_id": 1,
        "color_id": 1
    }
]

options = [
    {
        "from": "a",
        "text": "Oblasť krku a ramena",
        "label": "rameno-zbokukrku",
        "side": "back",
        "to": "q3",
    },
    {
        "from": "a",
        "text": "Zozadu ramena",
        "label": "rameno-zozadu",
        "side": "back",
        "to": "q5",
    },
    {
        "from": "a",
        "text": "Spredu a zboku ramena",
        "label": "rameno-spredu",
        "side": "front",
        "to": "q8",
    },
    {
        "from": "q3",
        "text": "Áno",
        "to": "q2",
    },
    {
        "from": "q3",
        "text": "Nie",
        "to": "q4",
    },
    {
        "from": "q2",
        "text": "Áno",
        "to": "q1",
    },
    {
        "from": "q2",
        "text": "Nie (len bolesť a tŕpnutie)",
        "to": "d3",
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
        "from": "q4",
        "text": "Áno",
        "to": "d4",
    },
    {
        "from": "q4",
        "text": "Nie",
        "to": "d2",
    },
    {
        "from": "q5",
        "text": "Áno",
        "to": "d5",
    },
    {
        "from": "q5",
        "text": "Nie",
        "to": "q6",
    },
    {
        "from": "q6",
        "text": "Áno",
        "to": "d6",
    },
    {
        "from": "q6",
        "text": "Nie",
        "to": "q7",
    },
    {
        "from": "q7",
        "text": "Áno",
        "to": "d7",
    },
    {
        "from": "q7",
        "text": "Nie",
        "to": "d3",
    },
    {
        "from": "q8",
        "text": "Áno",
        "to": "d8",
    },
    {
        "from": "q8",
        "text": "Nie",
        "to": "q9",
    },
    {
        "from": "q9",
        "text": "Áno",
        "to": "q10",
    },
    # SH: nemame moznost pre nie
    # {
    #     "from": "q9",
    #     "text": "Nie",
    #     "to": "...",
    # },
    {
        "from": "q10",
        "text": "Áno",
        "to": "d9",
    },
    {
        "from": "q10",
        "text": "Nie",
        "to": "q11",
    },
    {
        "from": "q11",
        "text": "Áno",
        "to": "d10",
    },
    {
        "from": "q11",
        "text": "Nie",
        "to": "d2",
    },
]
