cd hw-websockets
$env:FLASK_RUN = "app.py" &
flask run --port 5000
cmd /c "docker exec -i f7100f809a14 mysql -uroot -pppp -e 'CREATE DATABASE db_grad_cs_1917'"
cmd /c "docker exec -i f7100f809a14 mysql -uroot -pppp db_grad_cs_1917 < ../db-db/db_grad_cs_1917_no_deal_data.sql"