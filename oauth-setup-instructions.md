# OAuth Setup Instructions

## Custom Domain Configuration
Your app will be deployed on: `apexops.blockmindlabs.ai`

## GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Find your OAuth application
3. Update the **Authorization callback URL** to:
   ```
   https://apexops.blockmindlabs.ai/api/auth/github/callback
   ```

## Google OAuth Setup

1. Go to Google Cloud Console → APIs & Services → Credentials
2. Find your OAuth 2.0 Client ID
3. Add this URL to **Authorized redirect URIs**:
   ```
   https://apexops.blockmindlabs.ai/api/auth/google/callback
   ```

## Testing the Authentication

After updating the OAuth applications:

1. GitHub Login: `https://apexops.blockmindlabs.ai/api/auth/github`
2. Google Login: `https://apexops.blockmindlabs.ai/api/auth/google`

## Important Notes

- The redirect URIs must match exactly (including https://)
- GitHub requires the callback URL to be registered
- Google requires the redirect URI to be in the authorized list
- After changes, it may take a few minutes for the OAuth providers to update

## Domain Configuration Notes

- The OAuth applications are now configured for the custom domain `apexops.blockmindlabs.ai`
- Both development and production environments should use the same OAuth configuration
- The redirect URIs follow the pattern: `https://apexops.blockmindlabs.ai/api/auth/{provider}/callback`
- Replit OAuth will continue to work with the original Replit domain for development testing