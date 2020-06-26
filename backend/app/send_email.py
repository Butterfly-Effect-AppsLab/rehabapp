import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import SMTP_SERVER, LOGIN, PASSWORD, APP_URL, PORT


def gen_confirmation_email(token):
    return {
        'subject': 'Potvrdenie e-mailu',
        'html': f""" 
        <html> 
            <body> 
                <h3>Vážený používateľ,</h3>
                <p> 
                    boli ste uspesne zaregistrovany do aplikacie Rehappka. Kliknutim na nasledovny link potvrdite 
                    svoj e-mail:<br> 
                    <a href="{APP_URL}/registration/confirmation?token={token}">Potvrdenie e-mailu</a><br><br>
                    Prajeme Vám príjemný deň!<br>
                    <h3>Tím RehabApp</h3>
                </p> 
            </body> 
        </html> """
    }


def gen_reset_email(token):
    return {
        'subject': 'Potvrdenie e-mailu',
        'html': f""" 
        <html> 
            <body> 
                <h3>Vážený používateľ,</h3>
                <p> 
                    vyzerá to, že chcete zmeniť svoje prístupové heslo. V tom prípade pokračujte kliknutím na odkaz:<br>
                    <a href="{APP_URL}?token={token}">Zmena hesla</a><br>
                    Pokiaľ o žiadosti ohľadne zmeny hesla nič neviete, tento e-mail kľudne ignorujte.<br>
                    Odkaz je platný 24 hodín.<br>
                    Prajeme Vám príjemný deň!<br>
                    <h3>Tím RehabApp</h3>
                </p> 
            </body> 
        </html> """
    }


def send_email(reciever_email, token, type):

    template = None

    if type == 'confirmation':
        template = gen_confirmation_email(token)

    sender_email = "info@rehabapp.com"
    receiver_email = reciever_email

    message = MIMEMultipart("alternative")
    message["Subject"] = template['subject']
    message["From"] = sender_email
    message["To"] = receiver_email

    # write the HTML part
    html = template['html']

    part2 = MIMEText(html, "html")
    message.attach(part2)

    # send your email
    with smtplib.SMTP(SMTP_SERVER, PORT) as server:
        server.login(LOGIN, PASSWORD)
        server.sendmail(sender_email, receiver_email, message.as_string())
