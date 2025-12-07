# Data Model: Authentication System

## User Entity

### Fields
- **id**: string (Primary Key, UUID) - Unique identifier for the user
- **email**: string (Unique, Required) - User's email address for authentication
- **emailVerified**: boolean - Whether the email has been verified
- **firstName**: string (Optional) - User's first name
- **lastName**: string (Optional) - User's last name
- **avatar**: string (Optional) - URL to user's profile picture
- **createdAt**: Date - Timestamp when the account was created
- **updatedAt**: Date - Timestamp when the account was last updated
- **softwareBackground**: string (Optional) - User's software background information
- **hardwareBackground**: string (Optional) - User's hardware background information
- **isOnboarded**: boolean - Whether the user has completed the onboarding process

### Relationships
- One-to-Many: User → Sessions (via session.userId)
- One-to-Many: User → Accounts (for social provider accounts)

## Session Entity

### Fields
- **id**: string (Primary Key, UUID) - Unique identifier for the session
- **userId**: string (Foreign Key) - References the user who owns this session
- **expiresAt**: Date - Expiration timestamp for the session
- **createdAt**: Date - Timestamp when the session was created
- **updatedAt**: Date - Timestamp when the session was last updated

## Account Entity (for social providers)

### Fields
- **id**: string (Primary Key, UUID) - Unique identifier for the account
- **userId**: string (Foreign Key) - References the user who owns this account
- **provider**: string (Enum: 'google', 'github', 'email') - Authentication provider
- **providerAccountId**: string - Unique ID from the provider
- **accessToken**: string (Optional) - Access token from the provider
- **refreshToken**: string (Optional) - Refresh token from the provider
- **expiresAt**: Date (Optional) - When the access token expires
- **createdAt**: Date - Timestamp when the account was created
- **updatedAt**: Date - Timestamp when the account was last updated

## Validation Rules

### User Validation
- Email must be a valid email format
- Email must be unique across all users
- Software/hardware background fields should be 0-500 characters
- Email is required for all users
- Created/updated timestamps are automatically managed

### Session Validation
- Session must reference a valid user
- Session expiration must be in the future
- Session ID must be unique
- Automatic cleanup of expired sessions

### Account Validation
- Account must reference a valid user
- Provider and providerAccountId combination must be unique
- Provider must be one of the allowed values
- Access tokens are encrypted when stored

## State Transitions

### User States
- **New**: User has just registered but not completed onboarding
- **Active**: User has completed onboarding and is fully registered
- **Suspended**: User account is temporarily suspended

### Session States
- **Active**: Session is valid and can be used for authentication
- **Expired**: Session has passed its expiration time
- **Revoked**: Session was manually invalidated by user or admin

## Indexes

### Required Indexes
- User.email (Unique)
- User.createdAt (for sorting/querying)
- Session.userId (for user session lookups)
- Session.expiresAt (for cleanup queries)
- Account.userId (for user account lookups)
- Account.provider + Account.providerAccountId (for unique constraint)