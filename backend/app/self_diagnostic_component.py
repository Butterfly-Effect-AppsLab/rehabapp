from sqlalchemy import null


self_diagnostic_component = {
    "q_1": {
        "type": "question",
        "text": "Bolest chrbta vyzarujuca na hrudnik",
        "options": [
            {
                "label": "Bolest citit v oblasti rebier",
                "ref": "q_2"
            },
            {
                "label": "Bolest citit v oblasti prs az hrudnej kosti",
                "ref": "q_3"
            }
        ]
    },
    "q_2": {
        "type": "question",
        "text": "Zhorsuje sa pri nadychu",
        "options": [
            {
                "label": "Ano",
                "ref": "d_1"
            },
            {
                "label": "Nie",
                "ref": "d_2"
            }
        ]
    },
    "q_3": {
        "type": "question",
        "text": "Trpite na vysoky krvny tlak",
        "options": [
            {
                "label": "Ano",
                "ref": "d_3"
            },
            {
                "label": "Nie",
                "ref": "q_4"
            }
        ]
    },
    "q_4": {
        "type": "question",
        "text": "Nedavna intenzivna namaha",
        "options": [
            {
                "label": "Ano",
                "ref": "q_5"
            },
            {
                "label": "Nie",
                "ref": "q_2"
            }
        ]
    },
    "q_5": {
        "type": "question",
        "text": "Pritomna bolest aj na chrbte",
        "options": [
            {
                "label": "Ano",
                "ref": "q_2"
            },
            {
                "label": "Nie",
                "ref": "d_4"
            }
        ]
    },
    "d_1": {
        "type": "diagnose",
        "name": "Blok stavcov",
        "text": "nic"
    },
    "d_2": {
        "type": "diagnose",
        "name": "Myofascialny",
        "text": "nic"
    },
    "d_3": {
        "type": "diagnose",
        "name": "Mozne ochorenie srdcoveho svalu",
        "text": "nic"
    },
    "d_4": {
        "type": "diagnose",
        "name": "Tendinopatia",
        "text": "nic"
    }
}