import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import app_url

port = 2525
smtp_server = "smtp.mailtrap.io"
login = "8bfa39fe09804e"
password = "7fb2f80b2d0571"


def send_email(reciever_email, token):
    sender_email = "info@rehabapp.com"
    receiver_email = reciever_email

    message = MIMEMultipart("alternative")
    message["Subject"] = "multipart test"
    message["From"] = sender_email
    message["To"] = receiver_email

    # write the HTML part
    html = f""" 
    <html> 
        <body> 
            <h3>Vážený používateľ,</h3>
            <p> 
                vyzerá to, že chcete zmeniť svoje prístupové heslo. V tom prípade pokračujte kliknutím na odkaz:<br>
                <a href="{app_url}?token={token}">Zmena hesla</a><br>
                Pokiaľ o žiadosti ohľadne zmeny hesla nič neviete, tento e-mail kľudne ignorujte.<br>
                Odkaz je platný 24 hodín.<br>
                Prajeme Vám príjemný deň!<br>
                <h3>Tím RehabApp</h3>
            </p> 
        </body> 
    </html> """

    part2 = MIMEText(html, "html")
    message.attach(part2)

    # send your email
    with smtplib.SMTP("smtp.mailtrap.io", 2525) as server:
        server.login(login, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
