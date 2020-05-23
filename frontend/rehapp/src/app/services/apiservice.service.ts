import { Injectable } from '@angular/core';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { API_URL } from './api.config'
import { TreeComponent } from './models/Tree';
import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})

export class APIService {

  private _checksum: String;
  // private _questions: Array<TreeComponent>;
  private _questions: any = {
    "backcircles-bedro-zozadu": {
        "options": [
            {
                "label": "bedro-zboku",
                "id": 6656,
                "text": "Zboku bedra",
                "ref": "q_3071"
            },
            {
                "label": "bedro-zozadu",
                "id": 6658,
                "text": "Zozadu bedra",
                "ref": "q_3075"
            },
            {
                "label": "bedro-spredu",
                "id": 6660,
                "text": "Spredu bedra",
                "ref": "q_3078"
            }
        ],
        "tree": "bedro",
        "name": "backcircles-bedro-zozadu",
        "area_detail": {
            "width": 185.119,
            "x": -0.2528,
            "height": 145.6538,
            "id": 480,
            "y": 261.0274
        },
        "text": "Bolesť v oblasti bedra"
    },
    "backcircles-hornachrbtica-zozadu": {
        "options": [
            {
                "label": "hornachrbtica-hrudna",
                "id": 6686,
                "text": "Pozdĺž hrudnej chrbtice",
                "ref": "q_3083"
            },
            {
                "label": "hornachrbtica-lopatka",
                "id": 6687,
                "text": "V okolí jednej lopatky",
                "ref": "q_3085"
            },
            {
                "label": "hornachrbtica-krk",
                "id": 6688,
                "text": "Oblasť krku, vrchnej časti ramien a lopatiek",
                "ref": "q_3086"
            }
        ],
        "tree": "hornachrbtica",
        "name": "backcircles-hornachrbtica-zozadu",
        "area_detail": {
            "width": 188.8602,
            "x": 52.1545,
            "height": 147.8931,
            "id": 481,
            "y": 59.23125
        },
        "text": "Bolesť vrchnej časti chrbta"
    },
    "circles-hrudnik": {
        "options": [
            {
                "label": "hrudnik-rebra",
                "id": 6697,
                "text": "V oblasti rebier",
                "ref": "q_3087"
            },
            {
                "label": "hrudnik-prsia",
                "id": 6698,
                "text": "V prsiach až hrudnej kosti",
                "ref": "q_3088"
            }
        ],
        "tree": "hrudnik",
        "name": "circles-hrudnik",
        "area_detail": {
            "width": 132.817,
            "x": 94.9191,
            "height": 135.605,
            "id": 482,
            "y": 113.195
        },
        "text": "Bolesť chrbta vyžarujúca na hrudník"
    },
    "circles-krk-spredu": {
        "options": [
            {
                "label": "krk-dolopatky",
                "id": 6709,
                "text": "Vyžaruje do oblasti záhlavia a vrchu lopatky",
                "ref": "q_3092"
            },
            {
                "label": "krk-klucnakost",
                "id": 6711,
                "text": "Vyžaruje do kľúčnej kosti",
                "ref": "q_3093"
            },
            {
                "label": "krk-doucha",
                "id": 6713,
                "text": "Vyžaruje do oblasti ucha a oka",
                "ref": "q_3094"
            }
        ],
        "tree": "krk",
        "name": "circles-krk-spredu",
        "area_detail": {
            "width": 132.817,
            "x": 83.0394,
            "height": 135.605,
            "id": 483,
            "y": 38.6362
        },
        "text": "Bolesť zboku na krku"
    },
    "backcircles-krk-zozadu": {
        "options": [
            {
                "label": "krk-dolopatky",
                "id": 6710,
                "text": "Vyžaruje do oblasti záhlavia a vrchu lopatky",
                "ref": "q_3092"
            },
            {
                "label": "krk-klucnakost",
                "id": 6712,
                "text": "Vyžaruje do kľúčnej kosti",
                "ref": "q_3093"
            },
            {
                "label": "krk-doucha",
                "id": 6714,
                "text": "Vyžaruje do oblasti ucha a oka",
                "ref": "q_3094"
            }
        ],
        "tree": "krk",
        "name": "backcircles-krk-zozadu",
        "area_detail": {
            "width": 132.817,
            "x": 62.7951,
            "height": 135.605,
            "id": 484,
            "y": 30.8045
        },
        "text": "Bolesť zboku na krku"
    },
    "circles-rameno-spredu": {
        "options": [
            {
                "label": "rameno-zbokukrku",
                "id": 6725,
                "text": "Oblasť krku a ramena",
                "ref": "q_3099"
            },
            {
                "label": "rameno-zozadu",
                "id": 6727,
                "text": "Zozadu ramena",
                "ref": "q_3101"
            },
            {
                "label": "rameno-spredu",
                "id": 6729,
                "text": "Spredu a zboku ramena",
                "ref": "q_3104"
            }
        ],
        "tree": "rameno",
        "name": "circles-rameno-spredu",
        "area_detail": {
            "width": 132.817,
            "x": 117.7777,
            "height": 135.605,
            "id": 485,
            "y": 74.5713
        },
        "text": "Bolesť ramena"
    },
    "backcircles-rameno-zozadu": {
        "options": [
            {
                "label": "rameno-zbokukrku",
                "id": 6726,
                "text": "Oblasť krku a ramena",
                "ref": "q_3099"
            },
            {
                "label": "rameno-zozadu",
                "id": 6728,
                "text": "Zozadu ramena",
                "ref": "q_3101"
            },
            {
                "label": "rameno-spredu",
                "id": 6730,
                "text": "Spredu a zboku ramena",
                "ref": "q_3104"
            }
        ],
        "tree": "rameno",
        "name": "backcircles-rameno-zozadu",
        "area_detail": {
            "width": 132.817,
            "x": 28.3175,
            "height": 135.605,
            "id": 486,
            "y": 76.3063
        },
        "text": "Bolesť ramena"
    },
    "circles-laket-spredu": {
        "options": [
            {
                "label": "laket-zozadu",
                "id": 6752,
                "text": "Zozadu lakťa",
                "ref": "q_3108"
            },
            {
                "label": "laket-vnutorny",
                "id": 6754,
                "text": "Z vnútornej strany lakťa",
                "ref": "q_3110"
            },
            {
                "label": "laket-vonkajsi",
                "id": 6756,
                "text": "Z vonkajšej strany lakťa",
                "ref": "q_3112"
            },
            {
                "label": "laket-jamka",
                "id": 6758,
                "text": "V lakťovej jame",
                "ref": "q_3113"
            }
        ],
        "tree": "laket",
        "name": "circles-laket-spredu",
        "area_detail": {
            "width": 114.0921,
            "x": 137.57935,
            "height": 116.4871,
            "id": 487,
            "y": 190.30805
        },
        "text": "Bolesť v oblasti lakťa"
    },
    "backcircles-laket-zozadu": {
        "options": [
            {
                "label": "laket-zozadu",
                "id": 6753,
                "text": "Zozadu lakťa",
                "ref": "q_3108"
            },
            {
                "label": "laket-vnutorny",
                "id": 6755,
                "text": "Z vnútornej strany lakťa",
                "ref": "q_3110"
            },
            {
                "label": "laket-vonkajsi",
                "id": 6757,
                "text": "Z vonkajšej strany lakťa",
                "ref": "q_3112"
            },
            {
                "label": "laket-jamka",
                "id": 6759,
                "text": "V lakťovej jame",
                "ref": "q_3113"
            }
        ],
        "tree": "laket",
        "name": "backcircles-laket-zozadu",
        "area_detail": {
            "width": 114.0921,
            "x": 21.0,
            "height": 116.4871,
            "id": 488,
            "y": 191.0
        },
        "text": "Bolesť v oblasti lakťa"
    },
    "circles-clenok-spredu": {
        "options": [
            {
                "label": "clenok-spredu",
                "id": 6774,
                "text": "Spredu členku",
                "ref": "q_3115"
            },
            {
                "label": "clenok-vonkajsia",
                "id": 6776,
                "text": "Z vonkajšej strany členku",
                "ref": "q_3119"
            },
            {
                "label": "clenok-vnutorna",
                "id": 6778,
                "text": "Z vnútornej strany členku",
                "ref": "q_3122"
            },
            {
                "label": "clenok-zozadu",
                "id": 6780,
                "text": "Zozadu členku",
                "ref": "q_3127"
            }
        ],
        "tree": "clenok",
        "name": "circles-clenok-spredu",
        "area_detail": {
            "width": 166.4057,
            "x": 61.37805,
            "height": 145.1845,
            "id": 489,
            "y": 529.54515
        },
        "text": "Bolesť členku"
    },
    "backcircles-clenok-zozadu": {
        "options": [
            {
                "label": "clenok-spredu",
                "id": 6775,
                "text": "Spredu členku",
                "ref": "q_3115"
            },
            {
                "label": "clenok-vonkajsia",
                "id": 6777,
                "text": "Z vonkajšej strany členku",
                "ref": "q_3119"
            },
            {
                "label": "clenok-vnutorna",
                "id": 6779,
                "text": "Z vnútornej strany členku",
                "ref": "q_3122"
            },
            {
                "label": "clenok-zozadu",
                "id": 6781,
                "text": "Zozadu členku",
                "ref": "q_3127"
            }
        ],
        "tree": "clenok",
        "name": "backcircles-clenok-zozadu",
        "area_detail": {
            "width": 166.4057,
            "x": 61.37805,
            "height": 145.1845,
            "id": 490,
            "y": 529.54515
        },
        "text": "Bolesť členku"
    },
    "circles-zapastie": {
        "options": [
            {
                "label": "zapastie-zvrchu",
                "id": 6811,
                "text": "Zvrchu zápästia",
                "ref": "q_3131"
            },
            {
                "label": "zapastie-celeaopuch",
                "id": 6812,
                "text": "Celého zápästia a opuch",
                "ref": "q_3135"
            },
            {
                "label": "zapastie-palec",
                "id": 6813,
                "text": "V oblasti palca",
                "ref": "q_3136"
            },
            {
                "label": "zapastie-zvnutra",
                "id": 6814,
                "text": "Zvnútra či zospodu zápästia",
                "ref": "q_3138"
            }
        ],
        "tree": "zapastie",
        "name": "circles-zapastie",
        "area_detail": {
            "width": 114.0921,
            "x": 137.66885,
            "height": 116.4871,
            "id": 491,
            "y": 290.91625
        },
        "text": "Bolesť v oblasti zápästia"
    },
    "circles-chodidlo-spredu": {
        "options": [
            {
                "label": "chodidlo-zospodu",
                "id": 6834,
                "text": "Zospodu chodidla",
                "ref": "q_3141"
            },
            {
                "label": "chodidlo-zvrchu",
                "id": 6836,
                "text": "Zvrchu chodidla",
                "ref": "q_3143"
            },
            {
                "label": "chodidlo-prsty",
                "id": 6838,
                "text": "Prstov",
                "ref": "q_3147"
            },
            {
                "label": "chodidlo-pata",
                "id": 6840,
                "text": "Päty",
                "ref": "q_3127"
            }
        ],
        "tree": "chodidlo",
        "name": "circles-chodidlo-spredu",
        "area_detail": {
            "width": 166.0,
            "x": 62.0,
            "height": 130.0,
            "id": 492,
            "y": 545.0952
        },
        "text": "Bolesť chodidla"
    },
    "backcircles-chodidlo-zozadu": {
        "options": [
            {
                "label": "chodidlo-zospodu",
                "id": 6835,
                "text": "Zospodu chodidla",
                "ref": "q_3141"
            },
            {
                "label": "chodidlo-zvrchu",
                "id": 6837,
                "text": "Zvrchu chodidla",
                "ref": "q_3143"
            },
            {
                "label": "chodidlo-prsty",
                "id": 6839,
                "text": "Prstov",
                "ref": "q_3147"
            },
            {
                "label": "chodidlo-pata",
                "id": 6841,
                "text": "Päty",
                "ref": "q_3127"
            }
        ],
        "tree": "chodidlo",
        "name": "backcircles-chodidlo-zozadu",
        "area_detail": {
            "width": 166.0,
            "x": 61.9602,
            "height": 130.0,
            "id": 493,
            "y": 545.2499
        },
        "text": "Bolesť chodidla"
    },
    "circles-koleno-spredu": {
        "options": [
            {
                "label": "koleno-obvod",
                "id": 6854,
                "text": "Celého obvodu kolena",
                "ref": "q_3148"
            },
            {
                "label": "koleno-zozadu",
                "id": 6856,
                "text": "Zozadu kolena",
                "ref": "q_3150"
            },
            {
                "label": "koleno-zvnutornej",
                "id": 6858,
                "text": "Z vnútornej strany kolena",
                "ref": "q_3157"
            },
            {
                "label": "koleno-vonkajsej",
                "id": 6860,
                "text": "Z vonkajšej strany kolena",
                "ref": "q_3160"
            },
            {
                "label": "koleno-spredupod",
                "id": 6862,
                "text": "Spredu pod kolenom",
                "ref": "q_3165"
            },
            {
                "label": "koleno-spreduzostran",
                "id": 6864,
                "text": "Spredu pozdĺž celého kolena",
                "ref": "q_3166"
            },
            {
                "label": "koleno-spredunad",
                "id": 6866,
                "text": "Spredu nad kolenom",
                "ref": "q_3172"
            }
        ],
        "tree": "koleno",
        "name": "circles-koleno-spredu",
        "area_detail": {
            "width": 166.4057,
            "x": 66.14575,
            "height": 130.3094,
            "id": 494,
            "y": 410.8686
        },
        "text": "Bolesť kolena"
    },
    "backcircles-koleno-zozadu": {
        "options": [
            {
                "label": "koleno-obvod",
                "id": 6855,
                "text": "Celého obvodu kolena",
                "ref": "q_3148"
            },
            {
                "label": "koleno-zozadu",
                "id": 6857,
                "text": "Zozadu kolena",
                "ref": "q_3150"
            },
            {
                "label": "koleno-zvnutornej",
                "id": 6859,
                "text": "Z vnútornej strany kolena",
                "ref": "q_3157"
            },
            {
                "label": "koleno-vonkajsej",
                "id": 6861,
                "text": "Z vonkajšej strany kolena",
                "ref": "q_3160"
            },
            {
                "label": "koleno-spredupod",
                "id": 6863,
                "text": "Spredu pod kolenom",
                "ref": "q_3165"
            },
            {
                "label": "koleno-spreduzostran",
                "id": 6865,
                "text": "Spredu pozdĺž celého kolena",
                "ref": "q_3166"
            },
            {
                "label": "koleno-spredunad",
                "id": 6867,
                "text": "Spredu nad kolenom",
                "ref": "q_3172"
            }
        ],
        "tree": "koleno",
        "name": "backcircles-koleno-zozadu",
        "area_detail": {
            "width": 166.4057,
            "x": 66.14575,
            "height": 130.3094,
            "id": 495,
            "y": 410.8686
        },
        "text": "Bolesť kolena"
    },
    "circles-bedro-spredu": {
        "options": [
            {
                "label": "bedro-zboku",
                "id": 6655,
                "text": "Zboku bedra",
                "ref": "q_3071"
            },
            {
                "label": "bedro-zozadu",
                "id": 6657,
                "text": "Zozadu bedra",
                "ref": "q_3075"
            },
            {
                "label": "bedro-spredu",
                "id": 6659,
                "text": "Spredu bedra",
                "ref": "q_3078"
            }
        ],
        "tree": "bedro",
        "name": "circles-bedro-spredu",
        "area_detail": {
            "width": 185.119,
            "x": 67.0,
            "height": 145.6538,
            "id": 479,
            "y": 255.4481
        },
        "text": "Bolesť v oblasti bedraa"
    },
    "q_3071": {
        "options": [
            {
                "id": 6661,
                "text": "Áno",
                "ref": "d_2384"
            },
            {
                "id": 6662,
                "text": "Nie",
                "ref": "q_3072"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...je skôr pálivá, pričom stehno je zboku na dotyk necitlivé, resp. horšie citlivé."
    },
    "q_3072": {
        "options": [
            {
                "id": 6663,
                "text": "Áno",
                "ref": "d_2385"
            },
            {
                "id": 6664,
                "text": "Nie",
                "ref": "q_3073"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...je výraznejšie, ak  na bedro zboku vyvniete tlak."
    },
    "q_3073": {
        "options": [
            {
                "id": 6665,
                "text": "Áno",
                "ref": "q_3074"
            },
            {
                "id": 6666,
                "text": "Nie",
                "ref": "d_2388"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...zároveň aj bolesť chrbta?"
    },
    "q_3074": {
        "options": [
            {
                "id": 6667,
                "text": "Áno",
                "ref": "d_2386"
            },
            {
                "id": 6668,
                "text": "Nie",
                "ref": "d_2387"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...si ľahnete nabok (zdravou stranou nadol) na okraj postele a členok bolestivej nohy priložíte na druhé koleno a následne vrchné koleno spúšťate nadol cez okraj postele, zhorší sa bolesť v bedre? (Bolesť chrbta sa nemení)"
    },
    "q_3075": {
        "options": [
            {
                "id": 6669,
                "text": "Áno, výrazne",
                "ref": "q_3077"
            },
            {
                "id": 6670,
                "text": "Nie, alebo len mierne",
                "ref": "q_3076"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...zároveň bolesť v oblasti driekovej chrbtice?"
    },
    "q_3076": {
        "options": [
            {
                "id": 6671,
                "text": "Áno",
                "ref": "d_2389"
            },
            {
                "id": 6672,
                "text": "Nie",
                "ref": "d_2390"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...v ľahu na chrbte priložíte vonkajší členok bolestivej nohy na koleno zdravej nohy a následne pomaly spustite koleno k podložke (smerom von), zhorší sa bolesť zozadu bedra?"
    },
    "q_3077": {
        "options": [
            {
                "id": 6673,
                "text": "Áno",
                "ref": "d_2391"
            },
            {
                "id": 6674,
                "text": "Nie",
                "ref": "d_2390"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...v stoji podopriete chrbát a vrch zadku rukami, tak aby prsty smerovali von a  zakloníte sa, zmierňuje sa postupnevyžarovanie bolesti do bedra zozadu? (Bolesť v chrbte môže pretrvávať.)"
    },
    "q_3078": {
        "options": [
            {
                "id": 6675,
                "text": "Áno",
                "ref": "q_3082"
            },
            {
                "id": 6676,
                "text": "Nie",
                "ref": "q_3079"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...zároveň aj bolesť v oblasti driekovej chrbtice?"
    },
    "q_3079": {
        "options": [
            {
                "id": 6677,
                "text": "Áno",
                "ref": "d_2392"
            },
            {
                "id": 6678,
                "text": "Nie",
                "ref": "q_3080"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...výraznú bolesť až neschopnosť našliapnuť na bolestivú stranu?"
    },
    "q_3080": {
        "options": [
            {
                "id": 6679,
                "text": "Áno",
                "ref": "d_2394"
            },
            {
                "id": 6680,
                "text": "Nie",
                "ref": "q_3081"
            },
            {
                "id": 6681,
                "text": "Nie, avšak zvýrazňuje sa bolesť z vnútornej strany stehna",
                "ref": "d_2393"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...v ľahu na chrbte priložíte vonkajší členok bolestivej nohy na koleno zdravej nohy a následne pomaly spustite koleno k podložke (smerom von), zhorší sa bolesť spredu v slabine?"
    },
    "q_3081": {
        "options": [
            {
                "id": 6682,
                "text": "Áno",
                "ref": "d_2395"
            },
            {
                "id": 6683,
                "text": "Nie",
                "ref": "d_2396"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...zároveň bolesť v oblasti driekovej chrbtice?"
    },
    "q_3082": {
        "options": [
            {
                "id": 6684,
                "text": "Áno",
                "ref": "d_2395"
            },
            {
                "id": 6685,
                "text": "Nie",
                "ref": "d_2397"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...v stoji podopriete chrbát a vrch zadku rukami tak aby prsty smerovali von a zakloníte sa, zmierňuje sa postupne vyžarovanie bolesti do bedra spredu? (Bolesť v chrbte môže pretrvávať.)"
    },
    "q_3083": {
        "options": [
            {
                "id": 6689,
                "text": "Áno",
                "ref": "d_2398"
            },
            {
                "id": 6690,
                "text": "Nie",
                "ref": "q_3084"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...Vám vyžaruje zboku až spredu smerom na hrudník."
    },
    "q_3084": {
        "options": [
            {
                "id": 6691,
                "text": "Áno",
                "ref": "d_2399"
            },
            {
                "id": 6692,
                "text": "Nie",
                "ref": "d_2400"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...sa Vám pri nádychu zhoršuje."
    },
    "q_3085": {
        "options": [
            {
                "id": 6693,
                "text": "Áno",
                "ref": "d_2399"
            },
            {
                "id": 6694,
                "text": "Nie",
                "ref": "d_2401"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...Vám vyžaruje až do hrudníka."
    },
    "q_3086": {
        "options": [
            {
                "id": 6695,
                "text": "Áno",
                "ref": "d_2402"
            },
            {
                "id": 6696,
                "text": "Nie",
                "ref": "d_2403"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...Vám vyžaruje iba na jednej strane až do ruky."
    },
    "q_3087": {
        "options": [
            {
                "id": 6699,
                "text": "Áno",
                "ref": "d_2404"
            },
            {
                "id": 6700,
                "text": "Nie",
                "ref": "d_2405"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...sa Vám zhoršuje  pri nádychu, alebo zakašľaní."
    },
    "q_3088": {
        "options": [
            {
                "id": 6701,
                "text": "Áno",
                "ref": "d_2406"
            },
            {
                "id": 6702,
                "text": "Nie",
                "ref": "q_3089"
            }
        ],
        "prepend": "Trpíte...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...na vysoký krvný tlak, alebo cukrovku?"
    },
    "q_3089": {
        "options": [
            {
                "id": 6703,
                "text": "Áno",
                "ref": "q_3090"
            },
            {
                "id": 6704,
                "text": "Nie",
                "ref": "q_3091"
            }
        ],
        "prepend": "Vykonávali ste...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...v nedávnej dobe intenzívne námahu ,alebo zaťaženie prsného svalu, či ramena?"
    },
    "q_3090": {
        "options": [
            {
                "id": 6705,
                "text": "Áno",
                "ref": "q_3091"
            },
            {
                "id": 6706,
                "text": "Nie",
                "ref": "d_2407"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...bolesť aj na chrbte?"
    },
    "q_3091": {
        "options": [
            {
                "id": 6707,
                "text": "Áno",
                "ref": "d_2404"
            },
            {
                "id": 6708,
                "text": "Nie",
                "ref": "d_2405"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "... sa Vám zhoršuje pri nádychu, či zakašľaní."
    },
    "q_3092": {
        "options": [
            {
                "id": 6715,
                "text": "Áno",
                "ref": "d_2409"
            },
            {
                "id": 6716,
                "text": "Nie",
                "ref": "d_2408"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...Vám vyžaruje aj do ruky."
    },
    "q_3093": {
        "options": [
            {
                "id": 6717,
                "text": "Áno",
                "ref": "d_2409"
            },
            {
                "id": 6718,
                "text": "Nie",
                "ref": "d_2410"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...Vám vyžaruje aj do ramena a paže."
    },
    "q_3094": {
        "options": [
            {
                "id": 6719,
                "text": "Áno",
                "ref": "q_3095"
            },
            {
                "id": 6720,
                "text": "Nie",
                "ref": "q_3096"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...zhoršenie bolesti pri žuvaní?"
    },
    "q_3095": {
        "options": [
            {
                "id": 6721,
                "text": "Áno",
                "ref": "d_2412"
            },
            {
                "id": 6722,
                "text": "Nie",
                "ref": "d_2411"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...bolesť pri tlaku na spodné zuboradie?"
    },
    "q_3096": {
        "options": [
            {
                "id": 6723,
                "text": "Áno",
                "ref": "d_2413"
            },
            {
                "id": 6724,
                "text": "Nie",
                "ref": "d_2414"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...zhoršenie bolesti pri pohybe hlavou?"
    },
    "q_3097": {
        "options": [
            {
                "id": 6735,
                "text": "Áno",
                "ref": "d_2415"
            },
            {
                "id": 6736,
                "text": "Nie",
                "ref": "d_2416"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...ukloníte hlavu k bolestivej ruke a začnete ňou rotovať, Vaše príznaky sa zhoršia."
    },
    "q_3098": {
        "options": [
            {
                "id": 6733,
                "text": "Áno",
                "ref": "q_3097"
            },
            {
                "id": 6734,
                "text": "Nie (len bolesť a tŕpnutie)",
                "ref": "d_2417"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...Vám spôsobuje oslabenie sily v ruke alebo zhoršenie citlivosti na ruke."
    },
    "q_3099": {
        "options": [
            {
                "id": 6731,
                "text": "Áno",
                "ref": "q_3098"
            },
            {
                "id": 6732,
                "text": "Nie",
                "ref": "q_3100"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...tŕpnutie a bolesť vyžarujúcu pozdĺž paže až do lakťa, alebo až do prstov?"
    },
    "q_3100": {
        "options": [
            {
                "id": 6737,
                "text": "Áno",
                "ref": "d_2418"
            },
            {
                "id": 6738,
                "text": "Nie",
                "ref": "d_2416"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...vo Vašom ramene pri jeho pohybe prítomne škrípanie, alebo lúpanie?"
    },
    "q_3101": {
        "options": [
            {
                "id": 6739,
                "text": "Áno",
                "ref": "d_2419"
            },
            {
                "id": 6740,
                "text": "Nie",
                "ref": "q_3102"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...Vám v ramene spôsobuje výrazné obmedzenie rozsahu pohybu."
    },
    "q_3102": {
        "options": [
            {
                "id": 6741,
                "text": "Áno",
                "ref": "d_2420"
            },
            {
                "id": 6742,
                "text": "Nie",
                "ref": "q_3103"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...je prítomná pri upažovaní (v 20 až 120 st.)"
    },
    "q_3103": {
        "options": [
            {
                "id": 6743,
                "text": "Áno",
                "ref": "d_2421"
            },
            {
                "id": 6744,
                "text": "Nie",
                "ref": "d_2417"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...svoju ruku vzpažíte (ruka nad hlavou), začnete ju tlačiť pred seba (o stenu), alebo si na ňu ľahnete,  Vaša bolesť sa zhorší."
    },
    "q_3104": {
        "options": [
            {
                "id": 6745,
                "text": "Áno",
                "ref": "d_2422"
            },
            {
                "id": 6746,
                "text": "Nie",
                "ref": "q_3105"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...Vám vyžaruje dopredu paže (cez biceps) prípadne až do lakťovej jamy (spredu lakťa)."
    },
    "q_3105": {
        "options": [
            {
                "id": 6747,
                "text": "Áno",
                "ref": "q_3106"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...sa Vám pri upažení a následnej  rotácii paže palcom nadol zhorší."
    },
    "q_3106": {
        "options": [
            {
                "id": 6748,
                "text": "Áno",
                "ref": "d_2423"
            },
            {
                "id": 6749,
                "text": "Nie",
                "ref": "q_3107"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...na bok svojho ramena vyviniete tlak (napr. v ľahu na posteli), Vaša bolesť sa zhorší."
    },
    "q_3107": {
        "options": [
            {
                "id": 6750,
                "text": "Áno",
                "ref": "d_2424"
            },
            {
                "id": 6751,
                "text": "Nie",
                "ref": "d_2416"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...sa Vám pri predpažení a následnom úchope opačného ramena výrazne zhorší."
    },
    "q_3108": {
        "options": [
            {
                "id": 6760,
                "text": "Áno",
                "ref": "d_2425"
            },
            {
                "id": 6761,
                "text": "Nie",
                "ref": "q_3109"
            }
        ],
        "prepend": "Trpíte...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...opuchom, alebo začervenanímzozadu lakťa? Prípadne  prekonali ste v minulosti úraz lakťa?"
    },
    "q_3109": {
        "options": [
            {
                "id": 6762,
                "text": "Áno",
                "ref": "d_2427"
            },
            {
                "id": 6763,
                "text": "Nie",
                "ref": "d_2426"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...vystretie lakeť a napnete tricepsu, Vaša bolesť sa zhorší."
    },
    "q_3110": {
        "options": [
            {
                "id": 6764,
                "text": "Áno",
                "ref": "d_2428"
            },
            {
                "id": 6765,
                "text": "Nie",
                "ref": "d_2429"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...u Vás prítomné tŕpnutie posledných dvoch prstov?"
    },
    "q_3111": {
        "options": [
            {
                "id": 6766,
                "text": "Áno",
                "ref": "d_2430"
            },
            {
                "id": 6767,
                "text": "Nie",
                "ref": "d_2431"
            }
        ],
        "prepend": "Vykonávali ste...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...v nedávnej dobe visenie na rukách (kruhy/hrazda), alebo potiahnutie lakťa  (ako pri ťahaní, napr. vody zo studne)?"
    },
    "q_3112": {
        "options": [
            {
                "id": 6768,
                "text": "Áno",
                "ref": "d_2432"
            },
            {
                "id": 6769,
                "text": "Nie",
                "ref": "q_3111"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...u Vás prítomné tŕpnutie predlaktia a prvých troch prstov?"
    },
    "q_3113": {
        "options": [
            {
                "id": 6770,
                "text": "Áno",
                "ref": "q_3114"
            },
            {
                "id": 6771,
                "text": "Nie",
                "ref": "d_2435"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...sa zhorší pri rotácii predlaktia smerom palcom nadol (rotácia k telu/dnu)."
    },
    "q_3114": {
        "options": [
            {
                "id": 6772,
                "text": "Áno",
                "ref": "d_2433"
            },
            {
                "id": 6773,
                "text": "Nie",
                "ref": "d_2434"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...sa zhorší pri ohýbaní lakťa a napnutí bicepsu."
    },
    "q_3115": {
        "options": [
            {
                "id": 6782,
                "text": "Áno",
                "ref": "q_3116"
            },
            {
                "id": 6783,
                "text": "Nie (pri pohybe a zahriatí sa bolesť zhoršuje)",
                "ref": "q_3117"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...je horšia ráno (resp. po zobudení) a po rozhýbani členku a jeho zahriatí sa zlepšuje."
    },
    "q_3116": {
        "options": [
            {
                "id": 6784,
                "text": "Áno",
                "ref": "d_2436"
            },
            {
                "id": 6785,
                "text": "Nie",
                "ref": "d_2437"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...aj bolesť iných kĺbov (prsty na nohách/rukách), alebo opuch členku?"
    },
    "q_3117": {
        "options": [
            {
                "id": 6786,
                "text": "Áno",
                "ref": "q_3118"
            },
            {
                "id": 6787,
                "text": "Nie",
                "ref": "d_2440"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...Váš členok opuchnutý?"
    },
    "q_3118": {
        "options": [
            {
                "id": 6788,
                "text": "Áno",
                "ref": "d_2438"
            },
            {
                "id": 6789,
                "text": "Nie",
                "ref": "d_2439"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...že opuch sa tiahne aj na predkolenie a lýtko a tŕpne Vám noha?"
    },
    "q_3119": {
        "options": [
            {
                "id": 6790,
                "text": "Áno, nedávny úraz",
                "ref": "d_2441"
            },
            {
                "id": 6791,
                "text": "Nie, nemal/a som úraz",
                "ref": "q_3120"
            }
        ],
        "prepend": "Utrpeli ste...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...v nedávnej dobe úraz členku ako napríklad vyvrtnutie/potvrdnutie, alebo ste utrpeli opakované úrazy členku tohto charakteru?"
    },
    "q_3120": {
        "options": [
            {
                "id": 6792,
                "text": "Áno",
                "ref": "d_2436"
            },
            {
                "id": 6793,
                "text": "Nie",
                "ref": "q_3121"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...Váš členok opuchnutý?"
    },
    "q_3121": {
        "options": [
            {
                "id": 6794,
                "text": "Nie",
                "ref": "d_2442"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...bolesť chrbta a predkolenia (resp. lýtka), prípadne ste takúto bolesť pociťovali v minulosti?"
    },
    "q_3122": {
        "options": [
            {
                "id": 6795,
                "text": "Áno",
                "ref": "d_2441"
            },
            {
                "id": 6796,
                "text": "Nie, nemal/a som úraz",
                "ref": "q_3123"
            }
        ],
        "prepend": "Utrpeli ste...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...v nedávnej dobe úraz členku ako napríklad vyvrtnutie/potvrdnutie, alebo ste utrpeli opakované úrazy členku tohto charakteru?"
    },
    "q_3123": {
        "options": [
            {
                "id": 6797,
                "text": "Áno",
                "ref": "q_3124"
            },
            {
                "id": 6798,
                "text": "Nie",
                "ref": "d_2443"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...Váš členok opuchnutý?"
    },
    "q_3124": {
        "options": [
            {
                "id": 6799,
                "text": "Áno",
                "ref": "d_2436"
            },
            {
                "id": 6800,
                "text": "Nie",
                "ref": "q_3125"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...bolesť horšia ráno, po rozhýbaní a poobede sa mierni"
    },
    "q_3125": {
        "options": [
            {
                "id": 6801,
                "text": "Áno",
                "ref": "q_3126"
            },
            {
                "id": 6802,
                "text": "Nie",
                "ref": "d_2445"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...tŕpnutie prvého, až tretieho prsta nohy a vnútornej strany šľapaje?"
    },
    "q_3126": {
        "options": [
            {
                "id": 6803,
                "text": "Nie",
                "ref": "d_2444"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...bolesť chrbta a predkolenia (resp. lýtka), prípadne ste takúto bolesť pociťovali v minulosti?"
    },
    "q_3127": {
        "options": [
            {
                "id": 6804,
                "text": "Áno",
                "ref": "q_3129"
            },
            {
                "id": 6805,
                "text": "Nie (zostala rovnaká)",
                "ref": "q_3128"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...sa vyzujete a niekoľkokrát za sebou sa postavíte na špičky,  zhorší sa bolesť nad pätou?"
    },
    "q_3128": {
        "options": [
            {
                "id": 6806,
                "text": "Áno",
                "ref": "d_2448"
            },
            {
                "id": 6807,
                "text": "Nie",
                "ref": "q_3130"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...Váš členok v oblasti päty (zozadu) opuchnutý?"
    },
    "q_3129": {
        "options": [
            {
                "id": 6808,
                "text": "Áno",
                "ref": "d_2449"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...bolesť šľapy?"
    },
    "q_3130": {
        "options": [
            {
                "id": 6809,
                "text": "Áno",
                "ref": "d_2446"
            },
            {
                "id": 6810,
                "text": "Nie",
                "ref": "d_2447"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...zhoršenie bolesti pri chôdzi v (tesnejších) topánkach, pričom pri chôdzi bez topánok sa táto bolesť nezhoršuje?"
    },
    "q_3131": {
        "options": [
            {
                "id": 6815,
                "text": "Áno",
                "ref": "q_3132"
            },
            {
                "id": 6816,
                "text": "Nie",
                "ref": "q_3133"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...sa pri ohnutí zápästia (dnu aj von) zhoršuje."
    },
    "q_3132": {
        "options": [
            {
                "id": 6817,
                "text": "Áno",
                "ref": "d_2452"
            },
            {
                "id": 6818,
                "text": "Nie",
                "ref": "q_3134"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...Vo vašom zápästí prítomná bolestivá hrčka?"
    },
    "q_3133": {
        "options": [
            {
                "id": 6821,
                "text": "Áno",
                "ref": "d_2453"
            },
            {
                "id": 6822,
                "text": "Nie",
                "ref": "circles-laket-spredu"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...vo Vašom zápästí prítomné tŕpnutie zvrchu 4. a 5. prsta?"
    },
    "q_3134": {
        "options": [
            {
                "id": 6819,
                "text": "Áno",
                "ref": "d_2451"
            },
            {
                "id": 6820,
                "text": "Nie",
                "ref": "d_2450"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...pohnete len prstami (zápästie sa nehýbe) Vaša bolesť sa zhorší."
    },
    "q_3135": {
        "options": [
            {
                "id": 6823,
                "text": "Áno",
                "ref": "d_2454"
            },
            {
                "id": 6824,
                "text": "Nie",
                "ref": "d_2455"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...je horšia ráno a neskôr po rozhýbaní sa počaš dňa zlepšuje."
    },
    "q_3136": {
        "options": [
            {
                "id": 6825,
                "text": "Áno",
                "ref": "d_2456"
            },
            {
                "id": 6826,
                "text": "Nie",
                "ref": "q_3137"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...uchopíte palec do dlane (do tej istej ruky) pri následnom pohybe/rotovaní zápästia sa bolesť smerom k malíčku zhoršuje."
    },
    "q_3137": {
        "options": [
            {
                "id": 6827,
                "text": "Áno",
                "ref": "d_2457"
            },
            {
                "id": 6828,
                "text": "Nie",
                "ref": "d_2458"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...odtiahnete palec od ruky a následnej ním zatlačíte/vytvoríte tlak na dlaň druhej ruky, Vaša bolesť sa zhorší."
    },
    "q_3138": {
        "options": [
            {
                "id": 6829,
                "text": "Áno",
                "ref": "q_3139"
            },
            {
                "id": 6830,
                "text": "Nie",
                "ref": "d_2460"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...Vám spôsobuje tŕpnutie prstov a vyžaruje až do prstov."
    },
    "q_3139": {
        "options": [
            {
                "id": 6831,
                "text": "Nie",
                "ref": "q_3140"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...Vám taktiež spôsobuje tŕpnutie palca, ukazováka a prostredníka."
    },
    "q_3140": {
        "options": [
            {
                "id": 6832,
                "text": "Áno",
                "ref": "d_2434"
            },
            {
                "id": 6833,
                "text": "Nie",
                "ref": "d_2459"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...je prítomná aj v oblasti vnútornej strany predlaktia (vrchna časť predlaktia), a zhorší sa ak obrátite dlaň nahor."
    },
    "q_3141": {
        "options": [
            {
                "id": 6842,
                "text": "Áno",
                "ref": "q_3142"
            },
            {
                "id": 6843,
                "text": "Nie",
                "ref": "d_2461"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...tŕpnutie v okolí vnútorného členku , alebo necitlivosť v oblasti šľapy?"
    },
    "q_3142": {
        "options": [
            {
                "id": 6844,
                "text": "Nie",
                "ref": "d_2444"
            }
        ],
        "prepend": "Trpíte...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...alebo ste v minulosti trpeli bolesťou chrbta."
    },
    "q_3143": {
        "options": [
            {
                "id": 6845,
                "text": "Áno",
                "ref": "d_2462"
            },
            {
                "id": 6846,
                "text": "Nie",
                "ref": "q_3144"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "... vo Vašom chodidle (zvrchu nohy) prítomná tuhá hrčka? Najčastejšie je to oblasť medzi 4. a 5. palcom."
    },
    "q_3144": {
        "options": [
            {
                "id": 6847,
                "text": "Áno (bolesť je poobede/večer miernejšia a zlepšuje sa po zahriatí)",
                "ref": "d_2454"
            },
            {
                "id": 6848,
                "text": "Nie",
                "ref": "q_3145"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...je horšia ráno hneď po zobudení a neskôr počas dňa a pri zahriatí sa zmierňuje."
    },
    "q_3145": {
        "options": [
            {
                "id": 6849,
                "text": "Áno",
                "ref": "d_2463"
            },
            {
                "id": 6850,
                "text": "Nie (je stále rovnaká)",
                "ref": "q_3146"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...uchopíte svoje chodidlo do dlane tak, že do nej vložíte svoj nart a následne ho stlačíte, Vaša bolesť sa zhorší."
    },
    "q_3146": {
        "options": [
            {
                "id": 6851,
                "text": "Áno",
                "ref": "d_2464"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...sedite, alebo ležíte a potiahnete špičku nahor smerom k sebe, Vaša bolesť sa zhorší."
    },
    "q_3147": {
        "options": [
            {
                "id": 6852,
                "text": "Áno (k večeru a po zahriatí sa bolesť zmierňuje)",
                "ref": "d_2454"
            },
            {
                "id": 6853,
                "text": "Nie (pohybom sa bolesť nemení alebo zhoršuje)",
                "ref": "d_2455"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...je horšia ráno po zobudení, po zahriatí a počas celého dňa a zmierňuje sa až večer."
    },
    "q_3148": {
        "options": [
            {
                "id": 6868,
                "text": "Áno",
                "ref": "d_2454"
            },
            {
                "id": 6869,
                "text": "Nie (pohybom sa zhoršuje)",
                "ref": "q_3149"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...je horšia ráno po zobudení, pri pohybe (a poobede až večer) sa zlepšuje."
    },
    "q_3149": {
        "options": [
            {
                "id": 6870,
                "text": "Áno",
                "ref": "d_2455"
            },
            {
                "id": 6871,
                "text": "Nie",
                "ref": "d_2465"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...u Vás prítomný opuch kolena?"
    },
    "q_3150": {
        "options": [
            {
                "id": 6872,
                "text": "Áno",
                "ref": "q_3151"
            },
            {
                "id": 6873,
                "text": "Nie",
                "ref": "q_3156"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...vykonáte drep, prípadne sa oň aspoň pokúsite, v kolene sa Vám objaví vŕzganie a škrípanie a bolesť sa Vám zhorší."
    },
    "q_3151": {
        "options": [
            {
                "id": 6874,
                "text": "Áno",
                "ref": "q_3155"
            },
            {
                "id": 6875,
                "text": "Nie",
                "ref": "q_3152"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...vyžarovanie bolesti do lýtka a predkolenia, alebo tŕpnutie tejto oblasti?"
    },
    "q_3152": {
        "options": [
            {
                "id": 6876,
                "text": "Áno",
                "ref": "q_3153"
            },
            {
                "id": 6877,
                "text": "Nie",
                "ref": "d_2466"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...sa nachádza aj v oblasti zozadu stehna."
    },
    "q_3153": {
        "options": [
            {
                "id": 6878,
                "text": "Áno",
                "ref": "q_3075"
            },
            {
                "id": 6879,
                "text": "Nie",
                "ref": "q_3154"
            }
        ],
        "prepend": "Trpíte...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...alebo ste v nedávnej dobe trpeli bolesťami chrbta, bedra, alebo zadku."
    },
    "q_3154": {
        "options": [
            {
                "id": 6880,
                "text": "Áno",
                "ref": "d_2467"
            },
            {
                "id": 6881,
                "text": "Nie",
                "ref": "d_2468"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...si sadnete na stoličku a zatlačíte pätou bolestivej nohy o stoličku, Vaša bolesť sa v zákolení zhorší."
    },
    "q_3155": {
        "options": [
            {
                "id": 6882,
                "text": "Áno",
                "ref": "q_3075"
            },
            {
                "id": 6883,
                "text": "Nie",
                "ref": "d_2469"
            }
        ],
        "prepend": "Trpíte...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...alebo ste v nedávnej dobe trpeli bolesťami chrbta, bedra, alebo zadku."
    },
    "q_3156": {
        "options": [
            {
                "id": 6884,
                "text": "Áno",
                "ref": "d_2470"
            },
            {
                "id": 6885,
                "text": "Nie",
                "ref": "d_2471"
            }
        ],
        "prepend": "Prekonali ste...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...nedávny priamy náraz na ohnuté koleno spredu (ako napr. pri nabúraní v aute)?"
    },
    "q_3157": {
        "options": [
            {
                "id": 6886,
                "text": "Áno",
                "ref": "q_3159"
            },
            {
                "id": 6887,
                "text": "Nie",
                "ref": "q_3158"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...u Vás prítomné zasekávanie kolena (pri zohýbaní kolena, napr. v ľahu na chrbte), prípadne. mierny opuch?"
    },
    "q_3158": {
        "options": [
            {
                "id": 6888,
                "text": "Áno",
                "ref": "d_2472"
            },
            {
                "id": 6889,
                "text": "Nie",
                "ref": "d_2473"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...ohnete koleno (napr. pri drepe), objaví sa Vám tam vŕzganie a škrípanie."
    },
    "q_3159": {
        "options": [
            {
                "id": 6890,
                "text": "Áno",
                "ref": "d_2475"
            },
            {
                "id": 6891,
                "text": "Nie",
                "ref": "d_2474"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...sa pokúsite o drep, Vaša bolesť sa zhorší a v kolene sa Vám objaví vŕzganie a škrípanie."
    },
    "q_3160": {
        "options": [
            {
                "id": 6892,
                "text": "Áno",
                "ref": "q_3164"
            },
            {
                "id": 6893,
                "text": "Nie",
                "ref": "q_3161"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...u Vás prítomné zasekávanie kolena (pri zohýbaní kolena, napr. v ľahu na chrbte), prípadne. mierny opuch?"
    },
    "q_3161": {
        "options": [
            {
                "id": 6894,
                "text": "Áno",
                "ref": "q_3162"
            },
            {
                "id": 6895,
                "text": "Nie",
                "ref": "d_2478"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...u Vás prítomne vyžarovanie bolesti nahor zboku stehna, a taktiež nadol zvonku predkolenia prípadne až členku?"
    },
    "q_3162": {
        "options": [
            {
                "id": 6896,
                "text": "Áno (Bolesť sa zhoršuje, príp.pohyb nie je možné dokončiť)",
                "ref": "d_2477"
            },
            {
                "id": 6897,
                "text": "Nie (Bolesť sa nezhošuje, pohyb prevediem)",
                "ref": "q_3163"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...si ľahnite nabok (zdravou stranou nadol), s vystretými nohami uloženými na sebe a následne nadvihnete vrchnú nohu, ktorú ohnete v kolene a začnete ju spúšťať nadol (koleno ku kolenu), Vaša bolesť sa zhorší, prípadne tento úkon ani neviete dokončiť."
    },
    "q_3163": {
        "options": [
            {
                "id": 6898,
                "text": "Nie",
                "ref": "d_2476"
            }
        ],
        "prepend": "Trpíte...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...aj bolesťami chrbta? Prípadne predchádzali Vašim bolesťiam v kolene, bolesti chrtba?"
    },
    "q_3164": {
        "options": [
            {
                "id": 6899,
                "text": "Áno",
                "ref": "d_2479"
            },
            {
                "id": 6900,
                "text": "Nie",
                "ref": "d_2478"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...vykonáte drep, prípadne sa oň aspoň pokúsite, v kolene sa Vám objaví vŕzganie a škrípanie a bolesť sa Vám zhorší."
    },
    "q_3165": {
        "options": [
            {
                "id": 6901,
                "text": "Áno",
                "ref": "d_2481"
            },
            {
                "id": 6902,
                "text": "Nie",
                "ref": "d_2480"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...sedíte dlhšie Vaša bolesť za horší, ale ak vystriete nohu, tento úkon Vám prinesie čiastočnú úľavu."
    },
    "q_3166": {
        "options": [
            {
                "id": 6903,
                "text": "Áno",
                "ref": "q_3169"
            },
            {
                "id": 6904,
                "text": "Nie",
                "ref": "q_3167"
            }
        ],
        "prepend": "Trpíte...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...pocitmi nestability kolena, prípadne škrípanímpri zohýbaní kolena?"
    },
    "q_3167": {
        "options": [
            {
                "id": 6905,
                "text": "Áno",
                "ref": "d_2481"
            },
            {
                "id": 6906,
                "text": "Nie",
                "ref": "q_3168"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...sedíte dlhšie Vaša bolesť za horší, ale ak vystriete nohu, tento úkon Vám prinesie čiastočnú úľavu."
    },
    "q_3168": {
        "options": [
            {
                "id": 6907,
                "text": "Áno",
                "ref": "d_2482"
            },
            {
                "id": 6908,
                "text": "Nie",
                "ref": "d_2465"
            }
        ],
        "prepend": "Táto bolesť...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...sa pri drepe zhorší, prípadne sa Vám v kolene objaví klikanie."
    },
    "q_3169": {
        "options": [
            {
                "id": 6909,
                "text": "Áno",
                "ref": "q_3170"
            },
            {
                "id": 6910,
                "text": "Nie",
                "ref": "q_3171"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...u Vás prítomný mierny opuch kolena?"
    },
    "q_3170": {
        "options": [
            {
                "id": 6911,
                "text": "Áno",
                "ref": "d_2485"
            },
            {
                "id": 6912,
                "text": "Nie",
                "ref": "d_2484"
            }
        ],
        "prepend": "Predchádzal bolesti...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...náhly rotačný pohyb v kolene (zmena smeru behu/chôdze, zlý dopad...), prípade aj puknutie v kolene?"
    },
    "q_3171": {
        "options": [
            {
                "id": 6913,
                "text": "Áno",
                "ref": "d_2483"
            },
            {
                "id": 6914,
                "text": "Nie",
                "ref": "d_2465"
            }
        ],
        "prepend": "Máte...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...do 50 rokov, a pomerne často športujete (beh, skákanie)"
    },
    "q_3172": {
        "options": [
            {
                "id": 6915,
                "text": "Áno",
                "ref": "q_3176"
            },
            {
                "id": 6916,
                "text": "Nie",
                "ref": "q_3173"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...napnete stehno v ľahu na chrbte, Vaša bolesť sa zhorší."
    },
    "q_3173": {
        "options": [
            {
                "id": 6917,
                "text": "Áno",
                "ref": "q_3174"
            },
            {
                "id": 6918,
                "text": "Nie",
                "ref": "d_2486"
            }
        ],
        "prepend": "Pociťujete...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...aj bolesti chrbta?"
    },
    "q_3174": {
        "options": [
            {
                "id": 6919,
                "text": "Áno",
                "ref": "d_2487"
            },
            {
                "id": 6920,
                "text": "Nie",
                "ref": "q_3175"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F6F1EE",
            "background-color": "#012C3D"
        },
        "text": "...v stoji pritiahnete koleno k hrudníku, objavila sa Vám bolesť v slabine?"
    },
    "q_3175": {
        "options": [
            {
                "id": 6921,
                "text": "Nie",
                "ref": "d_2487"
            }
        ],
        "prepend": "Ak...",
        "style": {
            "color": "#F611EE",
            "background-color": "#01003D"
        },
        "text": "...sa v stoji opriete lakťami o stôl, stiahnete zadok a vyhrbtíte sa, bolesť v chrbte sa zhorší."
    },
    "q_3176": {
        "options": [
            {
                "id": 6922,
                "text": "Áno",
                "ref": "d_2489"
            },
            {
                "id": 6923,
                "text": "Nie",
                "ref": "d_2488"
            }
        ],
        "prepend": "Je...",
        "style": {
            "color": "#012C3D",
            "background-color": "#F6F1EE"
        },
        "text": "...u Vás prítomný aj opuch kolena? Je Vaše koleno teplejšie?"
    },
    "d_2384": {
        "name": "Meralgia paresthetica",
        "text": ""
    },
    "d_2385": {
        "name": "Burzitída bedrového kĺbu",
        "text": ""
    },
    "d_2386": {
        "name": "Syndróm m. prirformis",
        "text": ""
    },
    "d_2387": {
        "name": "Poškodenie medzistavcovej platničky L4/L5",
        "text": ""
    },
    "d_2388": {
        "name": "Poškodenie/preťaženie iliotibiálneho traktu",
        "text": ""
    },
    "d_2389": {
        "name": "Blok alebo zápal sakroiliakálneho skĺbenia",
        "text": ""
    },
    "d_2390": {
        "name": "Syndróm m. pirifomis a súčasne s vysokoo pravdepodobnosťou aj dolný skrížený syndróm",
        "text": ""
    },
    "d_2391": {
        "name": "Hernia medzistavcovej platničky L5/S1",
        "text": ""
    },
    "d_2392": {
        "name": "Koxartróza až avaskulárna nekróza bedra",
        "text": ""
    },
    "d_2393": {
        "name": "Útlak nervu v oblasti panvy (ilioingvinálneho či obturátorového)",
        "text": ""
    },
    "d_2394": {
        "name": "Tendinitída alebo poškodenie (natiahnutie) m. iliopsoas",
        "text": ""
    },
    "d_2395": {
        "name": "Lumboichialgický syndróm pri dráždení koreňa L4",
        "text": ""
    },
    "d_2396": {
        "name": "Poškodenie kĺbovej jamky bedra",
        "text": ""
    },
    "d_2397": {
        "name": "Dolný skrížený syndróm",
        "text": ""
    },
    "d_2398": {
        "name": "Interkostálna neuralgia",
        "text": ""
    },
    "d_2399": {
        "name": "Blok stavcov hrudnej chrbtice",
        "text": ""
    },
    "d_2400": {
        "name": "Myofasciálny syndróm hrudnej chrbtice",
        "text": ""
    },
    "d_2401": {
        "name": "Myofasciálny syndróm - mm. rhomboidei",
        "text": ""
    },
    "d_2402": {
        "name": "Kvadrantový syndŕom",
        "text": ""
    },
    "d_2403": {
        "name": "Horný skrížený syndróm",
        "text": ""
    },
    "d_2404": {
        "name": "Blok stavcov hrudnej chrbtice (Interkostálna neuralgia)",
        "text": ""
    },
    "d_2405": {
        "name": "Myofasciálny syndróm v oblasti lopatkového svalstva a svalstva hrudnej chrbtice",
        "text": ""
    },
    "d_2406": {
        "name": "Možné ochorenie srdcového svalu",
        "text": ""
    },
    "d_2407": {
        "name": "Tendinopatia prsného svalu",
        "text": ""
    },
    "d_2408": {
        "name": "Myofasciálny syndróm zadnej skupiny svalov krku",
        "text": ""
    },
    "d_2409": {
        "name": "Cervikobrachiálny syndróm",
        "text": ""
    },
    "d_2410": {
        "name": "Syndróm hornej hrudnej apertúry",
        "text": ""
    },
    "d_2411": {
        "name": "Ochorenie temporo-mandibulárneho kĺbu",
        "text": ""
    },
    "d_2412": {
        "name": "Ochorenie zubu",
        "text": ""
    },
    "d_2413": {
        "name": "Myofasciálny syndróm M. (Sternocleidomasto-ideus)",
        "text": ""
    },
    "d_2414": {
        "name": "Myofasciálny syndróm bočnej skupiny svalov krku",
        "text": ""
    },
    "d_2415": {
        "name": "Hernia medzistavcovej platničky krčnej chrbtice (Degeneratívne ochorenie krčnej chrbtice)",
        "text": ""
    },
    "d_2416": {
        "name": "Mm. scaleni syndróm (Syndróm hornej hrudnej apertúry)",
        "text": ""
    },
    "d_2417": {
        "name": "Myofasciálny syndróm oblasti ramenného pletenca",
        "text": ""
    },
    "d_2418": {
        "name": "Poškodenie labra ramenného kĺbu - SLAP",
        "text": ""
    },
    "d_2419": {
        "name": "Adhezívna kapsulitída - Frozen shoulder",
        "text": ""
    },
    "d_2420": {
        "name": "Impingement syndróm",
        "text": ""
    },
    "d_2421": {
        "name": "Tendinitída/poškodenie rotatorovej manžety",
        "text": ""
    },
    "d_2422": {
        "name": "Tendinitída/poškodenie šľachy bicepsu",
        "text": ""
    },
    "d_2423": {
        "name": "Poškodenie/natrhnutie rotatorovej manžety",
        "text": ""
    },
    "d_2424": {
        "name": "Poškodenie akromio-klavikulárneho spojenia",
        "text": ""
    },
    "d_2425": {
        "name": "Burzitíta lakťa",
        "text": ""
    },
    "d_2426": {
        "name": "Osteoatritída",
        "text": ""
    },
    "d_2427": {
        "name": "Tendinitída tricepsu",
        "text": ""
    },
    "d_2428": {
        "name": "Syndróm kubitálneho kanála",
        "text": ""
    },
    "d_2429": {
        "name": "Golfový (oštepársky) lakeť",
        "text": ""
    },
    "d_2430": {
        "name": "Poškodenie vonkajšieho kolaterálneho väzu lakťa",
        "text": ""
    },
    "d_2431": {
        "name": "Tenisový lakeť",
        "text": ""
    },
    "d_2432": {
        "name": "Úžinový syndróm",
        "text": ""
    },
    "d_2433": {
        "name": "Tendinitída šľachy bicepsu",
        "text": ""
    },
    "d_2434": {
        "name": "Pronátorový syndróm",
        "text": ""
    },
    "d_2435": {
        "name": "Preťaźenie/natiahnutie kapsuly lakťového kĺbu",
        "text": ""
    },
    "d_2436": {
        "name": "Reumatoiná Artritída",
        "text": ""
    },
    "d_2437": {
        "name": "Myofasciálny syndróm m. peroneus",
        "text": ""
    },
    "d_2438": {
        "name": "Kompartment syndróm (chronický aj v miernej forme)",
        "text": ""
    },
    "d_2439": {
        "name": "Stresová fraktúra kosti nártu",
        "text": ""
    },
    "d_2440": {
        "name": "Syndróm tibiálnej hrany (Shin splits)",
        "text": ""
    },
    "d_2441": {
        "name": "Vyvrtnutý/podvrtnutý členok",
        "text": ""
    },
    "d_2442": {
        "name": "Artróza",
        "text": ""
    },
    "d_2443": {
        "name": "Mediálny impingement členku",
        "text": ""
    },
    "d_2444": {
        "name": "Syndróm tarzálneho tunela",
        "text": ""
    },
    "d_2445": {
        "name": "Tendinitída tiabiálneho svalu (m. tibialis ant.)",
        "text": ""
    },
    "d_2446": {
        "name": "Plantárna fascitída",
        "text": ""
    },
    "d_2447": {
        "name": "Tentinitída Achillovej ślachy",
        "text": ""
    },
    "d_2448": {
        "name": "Retrocalcaneárna bursitída",
        "text": ""
    },
    "d_2449": {
        "name": "Ostroh (Calcar calcanei)",
        "text": ""
    },
    "d_2450": {
        "name": "Tendinitída",
        "text": ""
    },
    "d_2451": {
        "name": "Tendosinovitída - Poškodenie šliach a ich obalov",
        "text": ""
    },
    "d_2452": {
        "name": "Gangliová cysta",
        "text": ""
    },
    "d_2453": {
        "name": "Útlak nervu n. radialis - Syndŕom radiálneho tunela",
        "text": ""
    },
    "d_2454": {
        "name": "Reumatoidná artritída",
        "text": ""
    },
    "d_2455": {
        "name": "Dna",
        "text": ""
    },
    "d_2456": {
        "name": "De Quervainova choroba",
        "text": ""
    },
    "d_2457": {
        "name": "Poľovnícky palec - Poškodenie vnútornej kolaterálnej šľachy palca",
        "text": ""
    },
    "d_2458": {
        "name": "Artróza palca",
        "text": ""
    },
    "d_2459": {
        "name": "Syndróm karpálneho tunela",
        "text": ""
    },
    "d_2460": {
        "name": "Preťaženie/poškodenie šliach ohýbačov prstov (Tendosynovitída/tendinitída)",
        "text": ""
    },
    "d_2461": {
        "name": "Plantárna fasciitída",
        "text": ""
    },
    "d_2462": {
        "name": "Mortonov neuróm",
        "text": ""
    },
    "d_2463": {
        "name": "Burzitída",
        "text": ""
    },
    "d_2464": {
        "name": "Tendinopatia m. tibialis",
        "text": ""
    },
    "d_2465": {
        "name": "Artróza kolena",
        "text": ""
    },
    "d_2466": {
        "name": "Tendinitída m biceps femoris",
        "text": ""
    },
    "d_2467": {
        "name": "Tendinitída hamstringov (m biceps femoris)",
        "text": ""
    },
    "d_2468": {
        "name": "Myofasciálny syndróm svalov skupiny zadnej strany stehna",
        "text": ""
    },
    "d_2469": {
        "name": "Bakerova cysta",
        "text": ""
    },
    "d_2470": {
        "name": "Poškodenie zadného skríženého väzu",
        "text": ""
    },
    "d_2471": {
        "name": "Tendinitída popliteálneho svalu",
        "text": ""
    },
    "d_2472": {
        "name": "Patello-femorálny syndróm",
        "text": ""
    },
    "d_2473": {
        "name": "Myofasciálny syndróm skupiny svalov vnútornej časti stehna",
        "text": ""
    },
    "d_2474": {
        "name": "Poškodenie vnútorného kolaterálneho väzu kolena",
        "text": ""
    },
    "d_2475": {
        "name": "Poškodenie vnútorného (mediálneho) menisku",
        "text": ""
    },
    "d_2476": {
        "name": "Myofasciálny syndróm vonkajšej časti štvorhlavého svalu",
        "text": ""
    },
    "d_2477": {
        "name": "Syndróm iliotibiálneho traktu",
        "text": ""
    },
    "d_2478": {
        "name": "Poškodenie vonkajšieho kolaterálneho väzu kolena",
        "text": ""
    },
    "d_2479": {
        "name": "Poškodenie vonkajšieho (laterálneho) menisku",
        "text": ""
    },
    "d_2480": {
        "name": "Syndróm tibiálnej hrany",
        "text": ""
    },
    "d_2481": {
        "name": "Patelofemorálny syndróm",
        "text": ""
    },
    "d_2482": {
        "name": "Poškodenie menisku",
        "text": ""
    },
    "d_2483": {
        "name": "Chondromalácia kolena",
        "text": ""
    },
    "d_2484": {
        "name": "Patellárna burzitída",
        "text": ""
    },
    "d_2485": {
        "name": "Poškodenie predného skríženého väzu",
        "text": ""
    },
    "d_2486": {
        "name": "Myofasciálny syndróm svalov prednej strany stehna",
        "text": ""
    },
    "d_2487": {
        "name": "Iliopsoas syndróm",
        "text": ""
    },
    "d_2488": {
        "name": "Patelárna tendinitída (Tendinitída štvorhlavého svalu stehna)",
        "text": ""
    },
    "d_2489": {
        "name": "Patelárna bursitída",
        "text": ""
    }
}
;

  
  HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'jwt-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  public async getTree(){
    if(this.questions == undefined){   
      await this.http.get<any>(API_URL + "questions", { observe: 'response' }).toPromise().then((res)=>{
        this.questions = res.body['questions'];      
      });
    }
  }

  // public async getTree(): Promise<any> {
  //   return await this.http.get<any>(API_URL + "questions", { observe: 'response' }).toPromise();
  // }

  public get questions(){return this._questions}
  public set questions(questions){this._questions = questions}

  public set checksum(checksum){this._checksum = checksum}
}
