tree = {
    "name": "bedro",
    "text": "Bolesť v oblasti bedra"
}

areas = [
    {
        "name": "circles-bedro-spredu",
        "x": 67,
        "y": 255.4481,
        "width": 185.119,
        "height": 145.6538,
    },
    {
        "name": "backcircles-bedro-zozadu",
        "x": -0.2528,
        "y": 261.0274,
        "width": 185.119,
        "height": 145.6538,
    },
]

diagnoses = [
    # SH: mozno sa bude menit nazov
    {
        "id": "d1",
        "name": "Meralgia paresthetica",
        "text": ""
    },
    {
        "id": "d2",
        "name": "Burzitída bedrového kĺbu",
        "text": ""
    },
    {
        "id": "d3",
        "name": "Syndróm m. prirformis",
        "text": ""
    },
    {
        "id": "d4",
        "name": "Poškodenie medzistavcovej platničky L4/L5",
        "text": ""
    },
    {
        "id": "d5",
        "name": "Poškodenie/preťaženie iliotibiálneho traktu",
        "text": ""
    },
    {
        "id": "d6",
        "name": "Blok alebo zápal sakroiliakálneho skĺbenia",
        "text": ""
    },
    {
        "id": "d7",
        "name": "Syndróm m. pirifomis a súčasne s vysokoo pravdepodobnosťou aj dolný skrížený syndróm",
        "text": ""
    },
    {
        "id": "d8",
        "name": "Hernia medzistavcovej platničky L5/S1",
        "text": ""
    },
    {
        "id": "d9",
        "name": "Koxartróza až avaskulárna nekróza bedra",
        "text": ""
    },
    {
        "id": "d10",
        "name": "Útlak nervu v oblasti panvy (ilioingvinálneho či obturátorového)",
        "text": ""
    },
    # SH: mozno sa bude menit nazov
    {
        "id": "d11",
        "name": "Tendinitída alebo poškodenie (natiahnutie) m. iliopsoas",
        "text": ""
    },
    {
        "id": "d12",
        "name": "Lumboichialgický syndróm pri dráždení koreňa L4",
        "text": ""
    },
    {
        "id": "d13",
        "name": "Poškodenie kĺbovej jamky bedra",
        "text": ""
    },
    {
        "id": "d14",
        "name": "Dolný skrížený syndróm",
        "text": ""
    },
    {
        "id": "d15",
        "name": "Lumboichialgický syndróm pri dráždení koreňa L4",
        "text": ""
    }
]

questions = [
    {
        "id": "q1",
        "text": "...je skôr pálivá, pričom stehno je zboku na dotyk necitlivé, resp. horšie citlivé.",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q2",
        "text": "...je výraznejšie, ak  na bedro zboku vyvniete tlak.",
        "prepend_id": 1,
        "color_id": 2
    },
    {
        "id": "q3",
        "text": "...zároveň aj bolesť chrbta?",
        "prepend_id": 2,
        "color_id": 3
    },
    {
        "id": "q4",
        "text": "...si ľahnete nabok (zdravou stranou nadol) na okraj postele a členok bolestivej nohy priložíte na "
                "druhé koleno a následne vrchné koleno spúšťate nadol cez okraj postele, zhorší sa bolesť v bedre? ("
                "Bolesť chrbta sa nemení)",
        "prepend_id": 3,
        "color_id": 1
    },
    {
        "id": "q5",
        "text": "...zároveň bolesť v oblasti driekovej chrbtice?",
        "prepend_id": 2,
        "color_id": 3
    },
    {
        "id": "q6",
        "text": "...v ľahu na chrbte priložíte vonkajší členok bolestivej nohy na koleno zdravej nohy a následne "
                "pomaly spustite koleno k podložke (smerom von), zhorší sa bolesť zozadu bedra?",
        "prepend_id": 3,
        "color_id": 2
    },
    {
        "id": "q7",
        "text": "...v stoji podopriete chrbát a vrch zadku rukami, tak aby prsty smerovali von a  zakloníte sa, "
                "zmierňuje sa postupnevyžarovanie bolesti do bedra zozadu? (Bolesť v chrbte môže pretrvávať.)",
        "prepend_id": 3,
        "color_id": 1
    },
    {
        "id": "q8",
        "text": "...zároveň aj bolesť v oblasti driekovej chrbtice?",
        "prepend_id": 2,
        "color_id": 2
    },
    {
        "id": "q9",
        "text": "...výraznú bolesť až neschopnosť našliapnuť na bolestivú stranu?",
        "prepend_id": 2,
        "color_id": 3
    },
    {
        "id": "q10",
        "text": "...v ľahu na chrbte priložíte vonkajší členok bolestivej nohy na koleno zdravej nohy a následne "
                "pomaly spustite koleno k podložke (smerom von), zhorší sa bolesť spredu v slabine?",
        "prepend_id": 3,
        "color_id": 2
    },
    {
        "id": "q11",
        "text": "...zároveň bolesť v oblasti driekovej chrbtice?",
        "prepend_id": 2,
        "color_id": 1
    },
    {
        "id": "q12",
        "text": "...v stoji podopriete chrbát a vrch zadku rukami tak aby prsty smerovali von a "
                "zakloníte sa, zmierňuje sa postupne vyžarovanie bolesti do bedra spredu? (Bolesť v chrbte môže "
                "pretrvávať.)",
        "prepend_id": 3,
        "color_id": 3
    }
]

options = [
    {
        "from": "a",
        "text": "Zboku bedra",
        "label": "bedro-zboku",
        "side": "front",
        "to": "q1",
    },
    {
        "from": "a",
        "text": "Zozadu bedra",
        "label": "bedro-zozadu",
        "side": "back",
        "to": "q5",
    },
    {
        "from": "a",
        "text": "Spredu bedra",
        "label": "bedro-spredu",
        "side": "front",
        "to": "q8",
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
        "to": "d5",
    },
    {
        "from": "q4",
        "text": "Áno",
        "to": "d3",
    },
    {
        "from": "q4",
        "text": "Nie",
        "to": "d4",
    },
    {
        "from": "q5",
        "text": "Áno, výrazne",
        "to": "q7",
    },
    {
        "from": "q5",
        "text": "Nie, alebo len mierne",
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
        "to": "d7",
    },
    {
        "from": "q7",
        "text": "Áno",
        "to": "d8",
    },
    {
        "from": "q7",
        "text": "Nie",
        "to": "d7",
    },
    {
        "from": "q8",
        "text": "Áno",
        "to": "q12",
    },
    {
        "from": "q8",
        "text": "Nie",
        "to": "q9",
    },
    {
        "from": "q9",
        "text": "Áno",
        "to": "d9",
    },
    {
        "from": "q9",
        "text": "Nie",
        "to": "q10",
    },
    {
        "from": "q10",
        "text": "Áno",
        "to": "d11",
    },
    {
        "from": "q10",
        "text": "Nie",
        "to": "q11",
    },
    {
        "from": "q10",
        "text": "Nie, avšak zvýrazňuje sa bolesť z vnútornej strany stehna",
        "to": "d10",
    },
    {
        "from": "q11",
        "text": "Áno",
        "to": "d12",
    },
    {
        "from": "q11",
        "text": "Nie",
        "to": "d13",
    },
    {
        "from": "q12",
        "text": "Áno",
        "to": "d15",
    },
    {
        "from": "q12",
        "text": "Nie",
        "to": "d14",
    }
]
