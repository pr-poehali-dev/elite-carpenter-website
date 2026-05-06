import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с контактной формы на email мастера"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    smtp_user = 'pruddzen@gmail.com'
    smtp_password = os.environ['SMTP_PASSWORD']
    to_email = 'pruddzen@gmail.com'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name}'
    msg['From'] = smtp_user
    msg['To'] = to_email

    html = f"""
    <html>
    <body style="font-family: Georgia, serif; background: #120F0A; color: #F0E9DF; padding: 40px;">
      <div style="max-width: 560px; margin: 0 auto; border: 1px solid rgba(201,168,76,0.3); padding: 40px;">
        <h2 style="font-family: Georgia, serif; color: #C9A84C; font-weight: 300; margin: 0 0 24px;">
          Новая заявка с сайта
        </h2>
        <hr style="border: none; border-top: 1px solid rgba(201,168,76,0.2); margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #B8AFA3; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; width: 120px;">Имя</td>
            <td style="padding: 10px 0; color: #F0E9DF; font-size: 15px;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #B8AFA3; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Телефон</td>
            <td style="padding: 10px 0; color: #F0E9DF; font-size: 15px;">{phone}</td>
          </tr>
          {"" if not message else f'''
          <tr>
            <td style="padding: 10px 0; color: #B8AFA3; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Проект</td>
            <td style="padding: 10px 0; color: #F0E9DF; font-size: 15px; line-height: 1.6;">{message}</td>
          </tr>
          '''}
        </table>
        <hr style="border: none; border-top: 1px solid rgba(201,168,76,0.2); margin-top: 24px;">
        <p style="color: #B8AFA3; font-size: 11px; margin-top: 16px; text-align: center; letter-spacing: 0.05em;">
          Артём Лесной — Мастер столярного дела
        </p>
      </div>
    </body>
    </html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
