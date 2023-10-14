# Устанавливаем базовый образ
FROM python:3.8

# Устанавливаем переменные среды
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /code

# Копируем зависимости и устанавливаем их
COPY requirements.txt /code/
RUN pip install -r requirements.txt

# Копируем все остальные файлы проекта
COPY . /code/

# Выполняем миграции базы данных и запускаем Django сервер
CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000
