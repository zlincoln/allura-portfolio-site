export default {
  // Required for CMS (development only)
  OAUTH_GITHUB_CLIENT_ID: {
    type: 'string',
    required: false,
    description: 'GitHub OAuth client ID for CMS authentication (only needed for development)'
  },
  OAUTH_GITHUB_CLIENT_SECRET: {
    type: 'string',
    required: false,
    description: 'GitHub OAuth client secret for CMS authentication (only needed for development)'
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

  // Development-specific variables
  NODE_ENV: {
    type: 'string',
    default: 'production',
    description: 'Node environment (production or development)'
  }
}
