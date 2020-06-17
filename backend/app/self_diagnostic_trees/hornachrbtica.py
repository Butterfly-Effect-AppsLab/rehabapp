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
        "svk": "Bolesť medzirebrového priestoru pri funkčnej poruche chrbtice"
    },
    {
        "id": "d2",
        "name": "Blok stavcov hrudnej chrbtice",
        "svk": "Obmedzenie pohybu dvoch susedných stavcov (patrí medzi funkčné poruchy chrbtice)"
    },
    {
        "id": "d3",
        "name": "Myofasciálny syndróm hrudnej chrbtice",
        "svk": "Bolesť svalového pôvodu, skupiny svalov lopatky a okolia hrudnej chrbtice"
    },
    {
        "id": "d4",
        "name": "Myofasciálny syndróm - mm. rhomboidei",
        "svk": "Bolesť svalového pôvodu skupiny svalov lopatky"
    },
    {
        "id": "d5",
        "name": "Kvadrantový syndŕom",
        "svk": "Cerviko kraniálny a Cerviko brachiálny sy zároveň – Bolesť hlavy a ramena spôsobená ochorením alebo "
               "funkčnou poruchou krčnej chrbtice "
    },
    {
        "id": "d6",
        "name": "Horný skrížený syndróm",
        "svk": "Svalová nerovnováha svalstva krku, vrchnej časti chrbta a hrudníka",
        "definition": "Horný skrížený syndróm, alebo tzv. guľatý chrbát znamená svalovú dysbalanciu v oblasti svalov "
                      "krku a hornej časti trupu. Svalová nerovnováha v týchto oblastiach je spôsobená nerovováhou "
                      "medzi svalmi – ohýbačmi krku v prednej oblasti krčnej chrbtice a hlbokými šijovými svami na "
                      "zadnej strane krčnej chrbtice, dalej sú skrátené horné časti trapézového svalu, čo vedie k "
                      "zvýrazneniu prehnutia v krčnej oblasti, tea k predsunu hlavy, čím sa zvýrazní ohnutie krčnej "
                      "chrbtice, tzv. lordózy, to vedie k bolestiam oblasti krčnej chrbtice, dalej ide o svalovú "
                      "nerovnováhu v hornej časti trupu, čo sa prejavuje ako skrátenie prsných svalov a naopak "
                      "ochabnutie chrbtových svalov – dolná a stredná časť trapézového svalu, dolná časť svalov "
                      "mezilopatkových a pílovitého svalu, čí sa zvýrazňuje zase ohnutie hrudnej časti chrbtice, "
                      "tzv. kyfóza a to práve spôsobuje obraz guľatého chrbta.",
        "symptoms": "nerovnováha svalov, čo vedie k nefyziologickému postavenie vyššie spomínaných svalov, "
                    "určité svaly sa skracujú, iné ochabujú, čo vedie k postoju s obrazom predsunutej hlavy, "
                    "predsunutých ramien a vyhrbeného zaguľateného chrbta, odstávajúce spodné uhly lopatiek",
        "cause": "zlé držanie tela, málo pohybu, zlé pohybové stereotypy, sedavá práca",
        "diagnostic": "vyšetrenie",
        "cure": "rehabilitácia",
        "prevention": "správne držanie tela, obmedzenie sedavej činnosti"
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
