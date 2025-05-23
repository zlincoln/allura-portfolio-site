---
trigger: always_on
---

Email functionality in contact form submissions is achieved by leveraging Cloudflare's native email worker functionality. Never change the email functionality provider - always stick with Cloudflare email functionality directly through native worker implementation.  The project's email function was named CLOUDFLARE_EMAIL as a way to make the code more maintainable and self documenting.  There was confusion and collisions when the email functions were named simply 'email' etc.