tree = {
    "name": "laket",
    "text": "Bolesť v oblasti lakťa"
}

areas = [
    {
        "name": "circles-laket-spredu",
        "x": 65.1776,
        "y": 84.5374,
        "width": 186.3968,
        "height": 200.9996,
    },
    {
        "name": "backcircles-laket-zozadu",
        "x": 21,
        "y": 191,
        "width": 114.0921,
        "height": 116.4871,
    }
]

diagnoses = [
    {
        "id": "d1",
        "name": "Burzitíta lakťa",
        "svk": "zápal útvaru v lakti, ktorý poskytuje kĺbu lubrikačnú tekutinu"
    },
    {
        "id": "d2",
        "name": "Osteoatritída",
        "svk": "zápal kĺbu a okolitej kosti"
    },
    {
        "id": "d3",
        "name": "Tendinitída tricepsu",
        "svk": "zápal alebo stav po zápale šľachy trojhlavého svalu paže"
    },
    {
        "id": "d4",
        "name": "Syndróm kubitálneho kanála",
        "svk": "útlak ulnárneho (lakťového) nervu ruky v oblasti vnútorného lakťa"
    },
    {
        "id": "d5",
        "name": "Golfový (oštepársky) lakeť",
        "svk": "útlak vretenného nervu v oblasti vonkajšieho lakťa"
    },
    {
        "id": "d6",
        "name": "Poškodenie vonkajšieho kolaterálneho väzu lakťa",
        "svk": ""
    },
    {
        "id": "d7",
        "name": "Tenisový lakeť",
        "svk": "útlak vretenného nervu v oblasti vonkajšieho lakťa"
    },
    {
        "id": "d8",
        "name": "Úžinový syndróm",
        "svk": "útlak nervu (nervus medianus alebo radialis) predlaktia v oblasti ramena/lakťa/predlaktia/zápästia"
    },
    {
        "id": "d9",
        "name": "Tendinitída šľachy bicepsu",
        "svk": "zápal alebo stav po zápale šľachy dvojhlavého svalu paže",
        "definition": "Ide o zápal alebo preťaženie, poškodenie šľachy, ktorou sa upína sval biceps do ku kosti, "
                      "čo spôsobuje bolesť a citlivosť v prednej časti ramena, taktiež je obmedzený pohyb. Nazýva sa "
                      "aj džbánové alebo plavecké rameno.",
        "symptoms": "bolesť v mieste úpony šľachy na kosť, väčšinou tupá, zvýrazňujúca sa pri pohybe, možné je aj "
                    "sčervenanie a opuch v mieste zápalu.",
        "cause": "úraz, opakované preťažovanie určitým rovnakým pohybom pri športe alebo obľúbených aktivitách, "
                 "práci, kedy je pohyb robený nesprávne a šľacha je preťažovaná, dôležitý je aj vek, pretože so "
                 "stúpajúcim vekom súšľachy menej felxibilné, určité typické pracovné pozície a opakované pohyby "
                 "napr. Automechanici, údržbári, neprirodzené polohy, napr. Pri balete, bez liečby môže tendinitída "
                 "prjťs až k vzniku pretrhnutia šľachy kedy je už nutná operácia, pri dlhom trvaní vznikajú rôzne "
                 "abnormné zmeny šlachy, ktoré nazývame tendinóza",
        "diagnostic": "vyšetrenie, zobrazovacie vyš.",
        "cure": "analgetiká, protizápalové lieky, rehabilitácia, fyzikálna terapia, obstreky, operatíva",
        "prevention": "vyhýbanie sa vyššie spomenutých rizikových faktorov, pokojový režím pri preťažení chronickým "
                      "pohybom, zaťažovaním, dostatočný strečing, dodržiavať zásady správnej ergonómie pri pracovnej "
                      "činnosti – úprava stoličky, pracovnej plochy "
    },
    {
        "id": "d10",
        "name": "Pronátorový syndróm",
        "svk": "bolesť v oblasti vnútornej strany predlaktia a tŕpnutie prstov spôsobené útlakom mediálneho nervu"
    },
    {
        "id": "d11",
        "name": "Preťaženie/natiahnutie kapsuly lakťového kĺbu",
        "svk": "kapsula lakťového kĺbu- obal kĺbu tvorený všetkými svalmi prechádzajúcimi z paže na predlaktie"
    }
]

questions = [
    {
        "id": "q1",
        "text": "...opuchom alebo začervenaním zozadu lakťa? Prípadne ste v minulosti prekonali úraz lakťa?",
        "prepend_id": 5,
        "color_id": 1
    },
    {
        "id": "q2",
        "text": "...vystretie lakeť a napnete triceps, Vaša bolesť sa zhorší.",
        "prepend_id": 3,
        "color_id": 3
    },
    {
        "id": "q3",
        "text": "...u Vás prítomné tŕpnutie posledných dvoch prstov?",
        "prepend_id": 4,
        "color_id": 3
    },
    {
        "id": "q4",
        "text": "...v nedávnej dobe visenie na rukách (kruhy/hrazda), alebo potiahnutie lakťa  (ako pri ťahaní, "
                "napr. vody zo studne)?",
        "prepend_id": 10,
        "color_id": 3
    },
    {
        "id": "q5",
        "text": "...u Vás prítomné tŕpnutie predlaktia a prvých troch prstov?",
        "prepend_id": 4,
        "color_id": 2
    },
    {
        "id": "q6",
        "text": "...sa zhorší pri rotácii predlaktia palcom smerom nadol (rotácia k telu/dnu).",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q7",
        "text": "...sa zhorší pri ohýbaní lakťa a napnutí bicepsu.",
        "prepend_id": 1,
        "color_id": 2
    }
]

options = [
    {
        "from": "a",
        "text": "Zozadu lakťa",
        "label": "laket-zozadu",
        "side": "back",
        "to": "q1",
    },
    {
        "from": "a",
        "text": "Z vnútornej strany lakťa",
        "label": "laket-vnutorny",
        "side": "front",
        "to": "q3",
    },
    {
        "from": "a",
        "text": "Z vonkajšej strany lakťa",
        "label": "laket-vonkajsi",
        "side": "front",
        "to": "q5",
    },
    {
        "from": "a",
        "text": "V lakťovej jame",
        "label": "laket-jamka",
        "side": "front",
        "to": "q6",
    },
    {
        "from": "a",
        "text": "V oblasti paže, ramena a krku",
        "label": "laket-paza",
        "side": "front",
        "to": "different_tree_question",
        "tree": "rameno",
        "option": "rameno-zbokukrku",
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
        "to": "d3",
    },
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
        "to": "d5",
    },
    {
        "from": "q4",
        "text": "Áno",
        "to": "d6",
    },
    {
        "from": "q4",
        "text": "Nie",
        "to": "d7",
    },
    {
        "from": "q5",
        "text": "Áno",
        "to": "d8",
    },
    {
        "from": "q5",
        "text": "Nie",
        "to": "q4",
    },
    {
        "from": "q6",
        "text": "Áno",
        "to": "q7",
    },
    {
        "from": "q6",
        "text": "Nie",
        "to": "d11",
    },
    {
        "from": "q7",
        "text": "Áno",
        "to": "d9",
    },
    {
        "from": "q7",
        "text": "Nie",
        "to": "d10",
    }
]
