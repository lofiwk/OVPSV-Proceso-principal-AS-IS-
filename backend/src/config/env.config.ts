import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
}));