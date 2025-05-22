export default {
  // Build-time variables (GitHub OAuth for CMS)
  OAUTH_GITHUB_CLIENT_ID: {
    type: 'string',
    required: false,
    description: 'GitHub OAuth client ID for CMS authentication (only needed for CMS access)'
  },
  OAUTH_GITHUB_CLIENT_SECRET: {
    type: 'string',
    required: false,
    description: 'GitHub OAuth client secret for CMS authentication (only needed for CMS access)'
  },

  // Runtime variables (Cloudflare email)
  CLOUDFLARE_API_KEY: {
    type: 'string',
    required: true,
    description: 'Cloudflare API key for email functionality'
  },
  CLOUDFLARE_ACCOUNT_ID: {
    type: 'string',
    required: true,
    description: 'Cloudflare Account ID for email routing'
  },
  CONTACT_EMAIL: {
    type: 'string',
    required: false,
    description: 'Email address for contact form submissions'
  },
}
