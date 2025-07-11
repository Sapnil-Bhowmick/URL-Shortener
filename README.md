## Project Description
   - This project is a simple, secure, and production-ready URL Shortener API service, built using Node.js, Express, and MongoDB. It allows users to convert long URLs into short, shareable links, with support for custom short codes and click tracking.
   - Added authentication so only logged-in users can create and view stats for their URLs. It also includes rate limiting to prevent abuse and keep things secure.
   - This project is built to scale and integrate cleanly into any workflow which needs a link-shortening feature

## Setup and Running Application Locally
   - npm install : To install the required node modules
   - npm run dev : To run aplication in Development mode using nodemon. This will also generate the swagger-output.json file automatically.

## Deployed URL (Deployed on Render)
   - https://url-shortener-service-a226.onrender.com

## API Endpoints
   - /auth/register :  Registering a new user. 
   - /auth/login : Logging in a registered user. After logging in the user is authenticated to use all the protected routes.
   - /api/shorten : To shorten the URL provide by the user using a shortcode whixh is provided by an user. In case its not provided then a unique alphanumeric shortcode of 7 characters will be generated.
   - /r/:shortCode : The user will provide a shortCode corresponding to the actual URL they want. On hitting this api endpoint -> the user will be redirected to the original long URL.
   - /API/stats/:shortCode : To view the stats corresponding to the URL related to this shortCode. Here, it is just the no of clicks which tells how many times the user clicked on the short URL.

## Swagger Documentation
   - https://url-shortener-service-a226.onrender.com/docs/
   - While trying out api from here : In the authorization header field ->  Type Bearer [token] because my backend will receive the token from authorization header by splitting it from the whitespace

## Video Link

## Bonus Requirements (Completed)
   - Authentication & API Token Management :  I have used bcrypt for hashing passwords and jsonwebtoken for generationg JWT tokens
      - API Rate Limiting : I have used express-rate-limit for preventing the overuse of API's. Each api is rate limited differently.
      - Protect the /api/shorten and /api/stats/:shortCode endpoints. Only authenticated users should be able to access them by providing the token in an Authorization header.
      - Associate created URLs with the user who created them. -> Done in URL.model.js by referencing userID
      - 
   - API Rate Limiting : I have used express-rate-limit for preventing the overuse of API's. Each api is rate limited differently.

  
## A Note 
   - /r/:shortCode :
      - Will not work from swagger UI docs since Swagger UI runs inside the browser, and browsers enforce CSP headers like: Content-Security-Policy: default-src 'self
      - This means: Only it can load/connect to things hosted on the same origin (i.e., https://url-shortener-service-a226.onrender.com)
      - It will work on POSTMAN
      - Also it works perfecty fine when the endpoint is being hit directly from a browser
