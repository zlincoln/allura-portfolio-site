---
trigger: always_on
---

This application is powered by a CMS called Sveltia CMS.  Sveltia CMS is based on Decap CMS.  Authentication of admins using this CMS takes advantage of GitHub OAUTH functionality.  All content for the CMS is stored directly in the project repository.  Updating content in the CMS results in a commit to the main branch of the repository and ultimately a new deployment of the static site to the production environment.