
# Django Server Setup

- $ cd < PROJECT ROOT > # application root folder          
- $ # Virtualenv modules installation (Unix based systems)
- $ virtualenv --no-site-packages env
- $ source env/bin/activate
- $
- $ # Virtualenv modules installation (Windows based systems)
- $ # virtualenv --no-site-packages env
- $ # .\env\Scripts\activate
- $
- $ # Install modules - SQLite Database
- $ pip3 install -r requirements.txt
- $
- $ # Create tables
- $ python manage.py makemigrations
- $ python manage.py migrate
- $
- $ # Start the application (development mode)
- $ python manage.py runserver # default port 8000
- $
- $ # Start the app - custom port
- $ # python manage.py runserver 0.0.0.0:<your_port>
- $
- $ # Access the web app in browser: http://127.0.0.1:8000/


# React Setup

- $ cd > PROJECT ROOT > frontend # frontend app folder          

- $ # Install node modules and packages
- $ npm install

- $ # Start frontend server
- $ npm start
- $ # Access the React app in browser: http://127.0.0.1:8001/


# Create User
Visit the following url route: http://127.0.0.1:8000/rest-auth/registration/
Do not include a username when creating your user account.
After successful creation, check your terminal for the email link, click it and login.

# Login
Login url route: http://127.0.0.1:8000/rest-auth/login
Enter your email and password.

# Developer and Development House Rules For Django Backend
- Create Fat Models i.e Models should have their queries inside them. Achieved by using @classmethod functions a Model.
- Create lean Views i.e Views should have no queries in them. Achieved by calling Model functions in a View.
- Use Pascalcase for naming views e.g MyContactListView(APIView)
- Use Pascalcase for naming models e.g MyContact(models.Model)
- Use Snakecase for naming variables e.g my_contact_list = MyContact.all_contacts()
- Use Snakecase for naming functions e.g def all_contacts(self, **kwargs)
- Please never ever temper with the settings file configuration variables. EVER! Achieved by using an .env file

# Developer and Development House Rules For React Frontend
- Create functional components whenever you are required to create a component.
- Use ECMA6 syntax as much as possible when wrting code.
- Use Camelcase for naming variables e.g myContactList = allContacts()
- Use Camelcase for naming functions e.g def allContacts()

# Developer and Development House Rules For Git
- Always pull the latest main branch before checking out into a new branch.
- Name your branches after the name of the task you did.
- Use Snakecase or Pascalcase for naming branches e.g my_new_branch, MyNewBranch
- Make sure you resolve merge conflicts before making a pull request

# Developer and Development General House Rules
- Use our house rules at all times to ensure easy understanding of your code by other developers.
- Bonus points if you leave comments to explain what is going on.
- Beautiful is better than ugly.
- Explicit is better than implicit.
- Simple is better than complex.
- Complex is better than complicated.
- Flat is better than nested.
- Sparse is better than dense.
- Readability counts.
- Special cases aren't special enough to break the rules.
- Although practicality beats purity.
- Errors should never pass silently.
- Unless explicitly silenced.
- In the face of ambiguity, refuse the temptation to guess.
- There should be one-- and preferably only one --obvious way to do it.
- Although that way may not be obvious at first unless you're Dutch.
- Now is better than never.
- Although never is often better than *right* now.
- If the implementation is hard to explain, it's a bad idea.
- If the implementation is easy to explain, it may be a good idea.
- Namespaces are one honking great idea -- let's do more of those!
