// Debug startup script
import dotenv from 'dotenv';
dotenv.config();

console.log('🔍 Environment Variables Check:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Missing');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Missing');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Missing');
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);

// Start the main server
import('./server.js');
