### Simple React App with Django

This project demonstrates how to integrate a React application into a Django backend. The goal is to create a simple CRUD (Create, Read, Update, Delete) system for managing notes.

#### Prerequisites for backend:

1. Create new virtual environment:

- `python3 -m venv myenv`
- `source myenv/bin/activate`

2. Install dependencies:

- `pip install -r requirements.txt`

3. Run migrations:

- `python manage.py migrate`

4. Create superuser:

- `python manage.py createsuperuser`

5. Run server:

- `python manage.py runserver`

- All dependencies installed (backend/requirements.txt):
  - asgiref
  - Django
  - django-cors-headers
  - djangorestframework
  - djangorestframework-simplejwt
  - PyJWT
  - pytz
  - sqlparse
  - psycopg2-binary
  - python-dotenv
