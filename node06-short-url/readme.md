# URL Shortener

Design a URL shortener service that **takes a URL** and **generate a shortened URL** which **redirects the user to original URL.**
Also keep track of number of visits

## Routes

- **POST** `/url` : Provide your original URL then it **generates new short url** and map `OriginalURL - shortID` in DB.
- **GET** `/:shortId` : **update the clicksCount** in DB and **redirect** to original url.
- **GET** `/url/info/:shortId` : shows click counts on particular short URL.