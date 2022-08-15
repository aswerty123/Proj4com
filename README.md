# Proj4com
A social media clone that allow users to post and other users to comment.

## Description
Proj4com allows users to create a post which is shared to all users. 
New users have to register their first name, last name, email and password to get started using the website.
The newest post will be displayed at the top. only the users who created the post will be allowed to edit and remove the post.

## Technologies Used

|Frontend   |Backend  |Database |  
| ------------|-----------------|-----------------|
| React|    Django    | PostgreSQL |
|tailwind     |   psycopg2   | pgAdmin4 |
|tw-elements  | djangorestframework  |
|react-router |   djangorestframework-simplejwt  |
|react-icons  |    django-cors-headers   |
|react         |         |
|  dayjs        |        ||
| jwt-decode|


## General Approach

First Step:

Try to read documentation about Django and watch youtube videos about Django and React app Projects. Create a simple project with one app to keep things simple.
The first step is to do all of the iniital setups.
Add in codes to settings.py and urls.py in proj4com folder and admins.py, models.py, serializers.py, backends.py, urls and views.py in main_app folder to create an account table in database.
create a database called proj4com before makemigrations and migrate and create a superuser.

Second Step:

Add in the simplejwt settings in in settings.py in proj4com folder and enable both the ROTATE_REFRESH_TOKENS and BLACKLIST_AFTER_ROTATION, add 'rest_framework_simplejwt.token_blacklist' in the INSTALLED_APPS.
create a new class called MyTokenObtainPairSerializer extended from TokenObtainPairSerializer to input information in the access token in the views.py. 
Add 2 new api endpoints related to the jwt tokens, one to get both access token and refresh token when inputing the correct email and password and the other one is to get new access token when inputing the refresh token.
The endpoint that gives both the access and refresh token is used as the logging in endpoint. 
add in corsheader to prevent cors error and allow react to use the django endpoint by adding "corsheaders" in the INSTALLED_APPS.

Third Step:

Create a react login page with a goal to use the jwt token for aunthentication. 
created a homepage, loginpage, privateRoute and AuthContetext for creating and testing out the authentication at the frontend part.
Multiple variables and functions was stored in the AuthContext (Variables: (user, authTokens,), Functions: (loginUser, logoutUser, registerUser,)).
This allows the app to store the user information from the access jwt token by using jwt decode and store both the jwt tokens in both the contextData and localstorage when user login
When the user logout all the user info and jwt tokens will be set to null and the user cannot go to any page except the login/register page.

Fourth Step:

Add in other tables in the database (Relationship, Post, Post_Comment, Post_like). Currently only the Account, Post and Post_Comment table is used.
9 endpoints is created based on CRUD operations. and 2 endpoints is used for the jwt tokens. 
Proceed to create React components which displays post information and comment based on specific posts.


## Proj4com Screenshots

### Login Page

Successful Login will help the user to stay login and explore different pages. 

![image](https://user-images.githubusercontent.com/44399805/184562788-ccc88b26-7521-4302-a334-d3f6560e3139.png)

Unsuccessful login, will bring out an alert and the user can only access the login and register page

![image](https://user-images.githubusercontent.com/44399805/184563624-230123ee-98f2-4f09-bcaf-cefc2d83de14.png)


### Register Page

User have to input all of the fields for a successful registeration. then user will be directed to login page to login registered account.

![image](https://user-images.githubusercontent.com/44399805/184562816-3acbc446-5c89-418b-a540-5878794bdf3f.png)

### Home Page

Home page consist of posts written by the users. New post will appear on top. users who is admin will have a blue glowing light beside their image.
Post all have the image and name of the user who created the post followed by the content of the post then the created timestamp of the post and the number of comments in each post.

![image](https://user-images.githubusercontent.com/44399805/184562880-3c222b88-9ca3-4b74-aa99-efc8f2eb813b.png)

### Edited Post

When post is edited, the position of post will remain by the timestamp of post will change to the updated timestamp with '(edited)'

![image](https://user-images.githubusercontent.com/44399805/184564289-5f930794-d4cb-4cdf-b4e9-5fda19a37b11.png)


First Post

![image](https://user-images.githubusercontent.com/44399805/184562908-4579a3a1-156a-4f09-a5a4-5c6c5260ecb3.png)

First Post comment

![image](https://user-images.githubusercontent.com/44399805/184563239-330d498e-56b8-47ae-98cd-a91e0bddbf86.png)

![image](https://user-images.githubusercontent.com/44399805/184563249-bcf44619-1f91-4376-8028-0fcb424763cc.png)

User Profile Page (incomplete)

![image](https://user-images.githubusercontent.com/44399805/184563297-e2f50937-be64-465d-8d0d-218ff1dd2049.png)

Other User Profile Page (incomplete)

![image](https://user-images.githubusercontent.com/44399805/184563348-3b099386-bb54-41da-8810-8f24ebb3f6c0.png)



## Reference

Django + React jwt Token implementation by Dennis Ivy
https://www.youtube.com/watch?v=xjMP0hspNLE











