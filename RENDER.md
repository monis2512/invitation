# Production Render deployment

## GitHub
Push this repository with `backend/` and `frontend/`.

## 1. PostgreSQL
In Render:
1. New → PostgreSQL.
2. Create a database, e.g. `shailla-date-db`.
3. Copy the **internal database connection details** shown by Render.
4. The backend uses `DATABASE_URL`, `DB_USER`, and `DB_PASSWORD`.

## 2. Spring Boot
Create a Web Service from the same repository.
- Root Directory: `backend`
- Runtime: Java
- Build: `mvn clean package`
- Start: `java -jar target/date-invite-1.0.0.jar`

Environment variables:
- `DATABASE_URL` = your Render PostgreSQL JDBC URL, normally `jdbc:postgresql://...`
- `DB_USER` = database user
- `DB_PASSWORD` = database password
- `ADMIN_USERNAME` = choose your admin username
- `ADMIN_PASSWORD` = choose a strong private password
- `APP_ORIGIN` = your Angular Render URL, e.g. `https://shailla-date.onrender.com`
- `COOKIE_SECURE` = `true`
- `COOKIE_SAME_SITE` = `none`

The backend creates/updates the admin password hash at startup.

## 3. Angular
Create another Render Web Service from the same repository.
- Root Directory: `frontend`
- Build: `npm install && npm run build`
- Publish Directory: `dist/date-invite/browser`

Before deploying, change in `frontend/src/main.ts`:
`const API='https://YOUR-BACKEND.onrender.com/api';`
to your actual backend Render URL.

## 4. URLs
Invitation:
`https://YOUR-FRONTEND.onrender.com/`

Admin:
`https://YOUR-FRONTEND.onrender.com/admin`

The admin page uses a server-side session and the admin API returns 401 unless authenticated.

## Important
Do not commit your real ADMIN_PASSWORD, database password, or Render secrets to GitHub. Put them only in Render Environment Variables.

For a custom domain, set APP_ORIGIN to the exact HTTPS frontend domain and redeploy the backend.
