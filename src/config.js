module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/blogful-login-endpoint',
  TEST_DB_URL: process.env.TEST_DB_URL="postgresql://dunder_mifflin@localhost/blogful-login-endpoint-test",
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
}
