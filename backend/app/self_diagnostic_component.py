self_diagnostic_component = {
    "areas": {
        "Bolesť vrchnej časti chrbta": "a_33"
    },
    "self-diagnose": {
        "a_33": {
            "name": "Bolesť vrchnej časti chrbta",
            "options": [
                {
                    "label": "Bolesť pozdĺž hrudnej chrbtice",
                    "ref": "q_50"
                },
                {
                    "label": "Bolesť v okolí jednej lopatky",
                    "ref": "q_52"
                },
                {
                    "label": "Bolesť v oblasti krku, vrchu oboch ramien (oblasť šije a trapézov, nie priamo rameno) a v oblasti vrchnej časti  lopatiek",
                    "ref": "q_53"
                }
            ]
        },
        "q_50": {
            "text": "...Vám vyžaruje zboku až spredu smerom na hrudník.",
            "prepend": "Táto bolesť...",
            "color": {
                "background-color": "#F6F1EE",
                "text-color": "#012C3D"
            },
            "options": [
                {
                    "label": "Áno",
                    "ref": "d_116"
                },
                {
                    "label": "Nie",
                    "ref": "q_51"
                }
            ]
        },
        "q_51": {
            "text": "...sa Vám pri nádychu zhoršuje.",
            "prepend": "Táto bolesť...",
            "color": {
                "background-color": "#F6F1EE",
                "text-color": "#012C3D"
            },
            "options": [
                {
                    "label": "Áno",
                    "ref": "d_117"
                },
                {
                    "label": "Nie",
                    "ref": "d_118"
                }
            ]
        },
        "q_52": {
            "text": "...Vám vyžaruje do hrudníka.",
            "prepend": "Táto bolesť...",
            "color": {
                "background-color": "#F6F1EE",
                "text-color": "#012C3D"
            },
            "options": [
                {
                    "label": "Áno",
                    "ref": "d_117"
                },
                {
                    "label": "Nie",
                    "ref": "d_119"
                }
            ]
        },
        "q_53": {
            "text": "... Vám vyžaruje iba na jednej strane do ruky.",
            "prepend": "Táto bolesť...",
            "color": {
                "background-color": "#F6F1EE",
                "text-color": "#012C3D"
            },
            "options": [
                {
                    "label": "Áno",
                    "ref": "d_120"
                },
                {
                    "label": "Nie",
                    "ref": "d_121"
                }
            ]
        },
        "d_121": {
            "name": "Horný skrížený syndróm",
            "text": ""
        },
        "d_116": {
            "name": "Interkostálna neuralgia",
            "text": ""
        },
        "d_117": {
            "name": "Blok stavcov hrudnej chrbtice",
            "text": ""
        },
        "d_118": {
            "name": "Myofasciálny syndróm hrudnej chrbtice",
            "text": ""
        },
        "d_119": {
            "name": "Myofasciálny synróm - mm. rhomboidei",
            "text": ""
        },
        "d_120": {
            "name": "Kvadrantový syndŕom",
            "text": ""
        }
    }
}