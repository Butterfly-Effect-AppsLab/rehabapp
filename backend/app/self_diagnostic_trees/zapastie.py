tree = {
    "name": "zapastie",
    "text": "Bolesť v oblasti zápästia",
}

areas = [
    {
        "name": "circles-zapastie",
        "x": 137.66885,
        "y": 290.91625,
        "width": 114.0921,
        "height": 116.4871,
    },
]

diagnoses = [
    {
        "id": "d1",
        "name": "Tendinitída",
        "svk": "zápal alebo stav po zápale šľachy"
    },
    {
        "id": "d2",
        "name": "Tendosinovitída - Poškodenie šliach a ich obalov",
        "svk": "zápal alebo stav po zápale šlachy aj s jej obalom"
    },
    {
        "id": "d3",
        "name": "Gangliová cysta",
        "svk": "Dutina v šľache vyplnená tekutinou alebo zhrubnutá šlacha vytvárajúca drobný guľovitý útvar"
    },
    {
        "id": "d4",
        "name": "Útlak nervu n. radialis - Syndŕom radiálneho tunela",
        "svk": "útlak vretenného nervu v oblasti paže, vonkajšieho lakťa alebo zvrchu zápästia"
    },
    {
        "id": "d5",
        "name": "Reumatoidná artritída",
        "svk": "Reuma - zápalové ochorenie kĺbov spôsobené nerovnováhou vlastného imunitného systému"
    },
    {
        "id": "d6",
        "name": "Dna",
        "svk": "arthritis uratica – ukladanie kyseliny močovej do kĺbov pri jej nadbytku"
    },
    {
        "id": "d7",
        "name": "De Quervainova choroba",
        "svk": "zápal alebo stav po zápale šliach svalov palca"
    },
    {
        "id": "d8",
        "name": "Poľovnícky palec - Poškodenie vnútornej kolaterálnej šľachy palca",
        "svk": "poškodenie šlachy v oblasti vnútornej strany posledného článku prsta, na palci"
    },
    {
        "id": "d9",
        "name": "Artróza palca",
        "svk": "Poškodenie a opotrebenie kĺbu palca"
    },
    {
        "id": "d10",
        "name": "Útlak lunárneho nervu v oblasti zápästia",
        "svk": "útlak nervu v oblasti vnútornej strany lakťa alebo v oblasti malíčkovej hrany zápästia"
    },
    {
        "id": "d11",
        "name": "Pronátorový syndróm",
        "svk": "útlak mediánneho nervu (Nervus medianus) v oblasti vnútornej strany predlaktia"
    },
    {
        "id": "d12",
        "name": "Syndróm karpálneho tunela",
        "svk": "útlak mediánneho nervu (nervus medianus) v oblasti z vnútornej strany zápästia"
    },
    {
        "id": "d13",
        "name": "Preťaženie/poškodenie šliach ohýbačov prstov (Tendosynovitída/tendinitída)",
        "svk": "zápal alebo stav po zápale šliach svalov v oblasti dlane a dlaňovej strany prstov"
    }
]

questions = [
    {
        "id": "q1",
        "text": "...sa pri ohnutí zápästia (dnu aj von) zhoršuje.",
        "prepend_id": 1,
        "color_id": 3
    },
    {
        "id": "q2",
        "text": "...Vo vašom zápästí prítomná bolestivá hrčka?",
        "prepend_id": 4,
        "color_id": 2
    },
    {
        "id": "q3",
        "text": "...vo Vašom zápästí prítomné tŕpnutie zvrchu 4. a 5. prsta?",
        "prepend_id": 4,
        "color_id": 2
    },
    {
        "id": "q4",
        "text": "...pohnete len prstami (zápästie sa nehýbe), Vaša bolesť sa zhorší.",
        "prepend_id": 3,
        "color_id": 1
    },
    {
        "id": "q5",
        "text": "...je horšia ráno a neskôr po rozhýbaní sa počaš dňa zlepšuje.",
        "prepend_id": 1,
        "color_id": 2
    },
    {
        "id": "q6",
        "text": "...uchopíte palec do dlane (do tej istej ruky), pri následnom pohybe/rotovaní zápästia sa bolesť "
                "smerom k malíčku zhoršuje.",
        "prepend_id": 3,
        "color_id": 1
    },
    {
        "id": "q7",
        "text": "...odtiahnete palec od ruky a následne ním zatlačíte/vytvoríte tlak na dlaň druhej ruky, "
                "Vaša bolesť sa zhorší.",
        "prepend_id": 3,
        "color_id": 2
    },
    {
        "id": "q8",
        "text": "...Vám taktiež spôsobuje tŕpnutie malíčka a prsteníka.",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q9",
        "text": "...Vám spôsobuje tŕpnutie prstov a vyžaruje až do prstov.",
        "prepend_id": 1,
        "color_id": 3
    },
    {
        "id": "q10",
        "text": "...Vám taktiež spôsobuje tŕpnutie palca, ukazováka a prostredníka.",
        "prepend_id": 1,
        "color_id": 2
    },
    {
        "id": "q11",
        "text": "...je prítomná aj v oblasti vnútornej strany predlaktia (vrchná časť predlaktia) a zhorší sa, ak "
                "obrátite dlaň nahor.",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q12",
        "text": "...táto bolesť prítomná aj v krku?",
        "prepend_id": 4,
        "color_id": 3
    },
    {
        "id": "q13",
        "text": "...táto bolesť prítomná aj v ramene?",
        "prepend_id": 4,
        "color_id": 2
    }
]

options = [
    {
        "from": "a",
        "text": "Zvrchu zápästia",
        "label": "zapastie-zvrchu",
        "side": "front",
        "to": "q1",
    },
    {
        "from": "a",
        "text": "Celého zápästia a opuch",
        "label": "zapastie-celeaopuch",
        "side": "front",
        "to": "q5",
    },
    {
        "from": "a",
        "text": "V oblasti palca",
        "label": "zapastie-palec",
        "side": "front",
        "to": "q6",
    },
    {
        "from": "a",
        "text": "Zvnútra či zospodu zápästia",
        "label": "zapastie-zvnutra",
        "side": "front",
        "to": "q9",
    },
    {
        "from": "q1",
        "text": "Áno",
        "to": "q2",
    },
    {
        "from": "q1",
        "text": "Nie",
        "to": "q3",
    },
    {
        "from": "q2",
        "text": "Áno",
        "to": "d3",
    },
    {
        "from": "q2",
        "text": "Nie",
        "to": "q4",
    },
    {
        "from": "q4",
        "text": "Áno",
        "to": "d2",
    },
    {
        "from": "q4",
        "text": "Nie",
        "to": "d1",
    },
    {
        "from": "q3",
        "text": "Áno",
        "to": "d4",
    },
    {
        "from": "q3",
        "text": "Nie",
        "to": "different_tree",
        "tree": "circles-laket-spredu"
    },
    {
        "from": "q5",
        "text": "Áno",
        "to": "d5",
    },
    {
        "from": "q5",
        "text": "Nie",
        "to": "d6",
    },
    {
        "from": "q6",
        "text": "Áno",
        "to": "d7",
    },
    {
        "from": "q6",
        "text": "Nie",
        "to": "q7",
    },
    {
        "from": "q7",
        "text": "Áno",
        "to": "d8",
    },
    {
        "from": "q7",
        "text": "Nie",
        "to": "d9",
    },
    {
        "from": "q9",
        "text": "Áno",
        "to": "q10",
    },
    {
        "from": "q9",
        "text": "Nie",
        "to": "d13",
    },
    {
        "from": "q10",
        "text": "Áno",
        "to": "q8",
    },
    {
        "from": "q10",
        "text": "Nie",
        "to": "q11",
    },
    {
        "from": "q8",
        "text": "Áno",
        "to": "q12",
    },
    {
        "from": "q8",
        "text": "Nie",
        "to": "d10",
    },
    {
        "from": "q11",
        "text": "Áno",
        "to": "d11",
    },
    {
        "from": "q11",
        "text": "Nie",
        "to": "d12",
    },
    {
        "from": "q12",
        "text": "Áno",
        "to": "different_tree",
        "tree": "circles-krk-spredu"
    },
    {
        "from": "q12",
        "text": "Nie",
        "to": "q13",
    },
    {
        "from": "q13",
        "text": "Áno",
        "to": "different_tree",
        "tree": "circles-rameno-spredu"
    },
    {
        "from": "q13",
        "text": "Nie",
        "to": "different_tree",
        "tree": "circles-laket-spredu"
    }
]
