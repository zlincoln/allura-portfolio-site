---
trigger: always_on
---

Avoid making changes to the deployment process now that it is stable.  This application is built and deployed github workflow.  The application is hosted in Cloudflare's serverless environment.  Since deployment is achieved through wrangler functionality, our application can take advantage of Cloudflare workers native functionality.  Use Cloudflare worker functionality whenever possible in the solution.