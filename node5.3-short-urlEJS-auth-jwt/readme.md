# 15. Stateless Authentication 
[Slides](https://slides.com/hiimvikash/nodejs)

## Problem Faced in Statefull authentication
- We need to maintain state(diary.js) for logged in user, and when server is restarted or for some reason state is loss all users are logged out.
- Statefull authentication are memory intensive

## Above problem is solved in Stateless authentication by using JWT(JSON WEB TOKEN)
- **Statelessness:** JWT is stateless, meaning the server doesn't need to store session data. When a user logs in and is authenticated, the server creates a JWT containing information about the user (such as user ID, username, roles, etc.). The server then sends this JWT to the client, typically in the form of a cookie or in the response body.

- **Self-contained:** JWTs are self-contained, which means all the necessary information about the user is contained within the token itself. This eliminates the need for the server to look up session data every time a user makes a request. The server can simply decode and verify the JWT to extract user information and authenticate the request.

- **example :-** College gives you the identity by providing you ID CARD(mentioning your details) and then A Stamp, so no one can duplicate it.
- College will have your details in their DB but even if DB is crashed then also you will be authorised to enter your colllege because of ID card...same is with JWT token.
- **Basically now your uid will have your details in it, which is lockedIN and this uid is called JWT.**
## Changes to implement JWT token
![image](https://github.com/hiimvikash/nodejs/assets/71629248/0dfb1cbb-01f5-4bff-9d50-de5beac8fa0f)
