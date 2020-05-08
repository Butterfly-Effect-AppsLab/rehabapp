area = {
    "id": "a1",
    "name": "Bolesť vrchnej časti chrbta"
}

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
    {
        "id": "d4",
        "name": "Myofasciálny synróm - mm. rhomboidei",
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
        "color_id": 1
    },
    {
        "id": "q3",
        "text": "...Vám vyžaruje do hrudníka.",
        "prepend_id": 1,
        "color_id": 1
    },
    {
        "id": "q4",
        "text": "... Vám vyžaruje iba na jednej strane do ruky.",
        "prepend_id": 1,
        "color_id": 1
    }
]

options = [
    {
        "area_id": "a1",
        "label": "Bolesť pozdĺž hrudnej chrbtice",
        "next_question_id": "q1",
    },
    {
        "area_id": "a1",
        "label": "Bolesť v okolí jednej lopatky",
        "next_question_id": "q3",
    },
    {
        "area_id": "a1",
        "label": "Bolesť v oblasti krku, vrchu oboch ramien (oblasť šije a trapézov, nie priamo rameno) a v oblasti "
                 "vrchnej časti  lopatiek",
        "next_question_id": "q4",
    },
    {
        "question_id": "q1",
        "label": "Áno",
        "next_diagnose_id": "d1",
    },
    {
        "question_id": "q1",
        "label": "Nie",
        "next_question_id": "q2",
    },
    {
        "question_id": "q2",
        "label": "Áno",
        "next_diagnose_id": "d2",
    },
    {
        "question_id": "q2",
        "label": "Nie",
        "next_diagnose_id": "d3",
    },
    {
        "question_id": "q3",
        "label": "Áno",
        "next_diagnose_id": "d2",
    },
    {
        "question_id": "q3",
        "label": "Nie",
        "next_diagnose_id": "d4",
    },
    {
        "question_id": "q4",
        "label": "Áno",
        "next_diagnose_id": "d5",
    },
    {
        "question_id": "q4",
        "label": "Nie",
        "next_diagnose_id": "d6",
    },
]
