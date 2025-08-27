# Security & Environment Setup

## Important Security Note

This project uses Sanity.io for content management. To properly set up your environment:

1. Copy `.env.example` to a new file named `.env`
2. Add your Sanity token to the `.env` file (only for migration scripts)
3. **NEVER commit your `.env` file to version control**

## Running Migration Scripts

To run the migration scripts safely:

```bash
# Set the token as an environment variable when running the script
SANITY_TOKEN=your_token_here node scripts/migrate-projects-to-sanity-fixed.js

# OR add it to your .env file and run
node scripts/migrate-projects-to-sanity-fixed.js
```

## Security Best Practices

- Revoke any tokens that have been accidentally committed to Git
- Create new tokens with appropriate permissions
- Keep all sensitive information in environment variables
- Check your Git history to ensure no tokens are exposed

## Development vs Production

Different environments may need different configurations. Use:
- `.env.development` for development
- `.env.production` for production

React will automatically use the appropriate file based on your build environment.
