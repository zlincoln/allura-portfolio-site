export default {
  // CMS variables (required in production)
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

  // Production variables
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

  // Environment
  NODE_ENV: {
    type: 'string',
    default: 'production',
    description: 'Node environment (production or development)'
  }
}
