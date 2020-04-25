from models import *


class TestResource:
    def on_get(self, req, res):
        res.media = "Saying HI from RehabApp API :)"


class QuestionsResource:
    def on_get(self, req, res):
        res.media = []

        questions = req.context.session.query(Question).all()
        diagnoses = req.context.session.query(Diagnose).all()

        ret = {}

        for q in questions:
            ret[q.get_id()] = {
                "type": "question",
                "text": q.text,
                "options": []
            }
            options = q.options
            for o in options:
                ret[q.get_id()]["options"].append({
                    "label": o.label,
                    "ref": o.next_option().get_id()
                })

        for d in diagnoses:
            ret[d.get_id()] = {
                "type": "diagnose",
                "name": d.name,
                "text": d.text
            }
        res.media = ret

