const http              = require('http');
const express           = require('express');
const cors              = require('cors');
const helmet            = require('helmet');
const rateLimit         = require('express-rate-limit');
const app               = express();
const compression       = require('compression');

const config = require('../../config/index.config.js');
const schoolRoutes = require('../api/school.api');
const classroomRoutes = require('../api/classroom.api');
const studentRoutes = require('../api/student.api');
const authRoutes = require('../api/auth.api');

module.exports = class UserServer {
    constructor({config, managers}){
        this.config        = config;
        this.userApi       = managers.userApi;
        this.apiLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Limit each IP to 100 requests per windowMs
            message: { message: 'Too many requests from this IP, please try again later.' },
        });
    }
    
    /** for injecting middlewares */
    use(args){
        app.use(args);
    }

    /** server configs */
    run(){
        app.use(helmet());
        // CORS Configuration
        const corsOptions = {
            origin: config.dotEnv.ALLOWED_ORIGINS || '*', // Define allowed origins for security
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: 'Content-Type,Authorization'
        };
        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true}));
        app.use(compression());
        app.use('/static', express.static('public'));
        app.use('/api', this.apiLimiter);

        app.use('/api', schoolRoutes);
        app.use('/api', classroomRoutes);
        app.use('/api', studentRoutes);
        app.use('/api', authRoutes);        

        // Middleware to log slow API responses
        app.use((req, res, next) => {
            const start = Date.now();
            res.on('finish', () => {
                const duration = Date.now() - start;
                if (duration > 1000) { // Log if response time exceeds 1 second
                    console.warn(`Slow API Response: ${req.method} ${req.originalUrl} took ${duration}ms`);
                }
            });
            next();
        });
        
        /** an error handler */
        app.use((err, req, res, next) => {
            console.error(err.stack)
            res.status(500).send('Something broke!')
        });
        
        /** a single middleware to handle all */
        app.all('/api/:moduleName/:fnName', this.userApi.mw);

        let server = http.createServer(app);
        server.listen(this.config.dotEnv.USER_PORT, () => {
            console.log(`${(this.config.dotEnv.SERVICE_NAME).toUpperCase()} is running on port: ${this.config.dotEnv.USER_PORT}`);
        });
    }
}