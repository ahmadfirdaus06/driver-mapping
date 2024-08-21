# Driver Mapping

Live demo: https://driver-mapping.ahmadfirdaus.dev

## Run local development
1. Install project dependencies `npm install`
2. Copy and fill up required `BASE_API_URL` environment using `cp .env.example .env`
2. Run backend server `npm run server:dev`
3. Run frontend server `npm run dev`

## Run production mode
Run application using docker `docker compose up -d`

## TLDR
1. This app is using Vite + React as frontend, a simple single backend script using ExpressJS and the highlight of the project is using Leaflet to render the map and markers.
2. Using the chosen stacks as means to make things much simpler and not to complicate things.
3. As for the slider in the demo, do take note that it can be quite buggy due to the Flowbite implementation as it is overlapping with the Leaflet container (p/s: need to click on the toggle rather than sliding). Each time submitting the total driver, the frontend will request data from the backend to refresh the current markers topology with latest drivers count.
4. During my first try, i did encounter a CORS error when attempting to access the endpoint in the browser. The dilemma comes when doing that with Postman or Curl, it works just fine. Thats when i decided to make a simple backend to call the endpoint as backend proxy hence the CORS issue resolved. In summary, calling an endpoint with CORS enforced is not possible through browser unless accessing it on the server side or using development like Postman and Curl.
5. One improvement could be the use of socket (Socket.io) to retrieve the driver locations to make it realtime.
