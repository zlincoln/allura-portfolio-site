export default {
  // Required for CMS
  OAUTH_GITHUB_CLIENT_ID: {
    type: 'string',
    required: true,
    description: 'GitHub OAuth client ID for CMS authentication'
  },
  OAUTH_GITHUB_CLIENT_SECRET: {
    type: 'string',
    required: true,
    description: 'GitHub OAuth client secret for CMS authentication'
  },

  // Required for production
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
    required: true,
    description: 'Email address for contact form submissions'
  },
}
