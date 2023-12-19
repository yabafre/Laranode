// bootstrap/Router.js
const http = require('http');
const formidable = require('formidable');

// extend the http.ServerResponse prototype

const extendResponse = (res) => {
    res.json = (data) => {
        res.writeHead(res.statusCode || 200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    };


    res.status = (statusCode) => {
        res.statusCode = statusCode;
        return res;
    };

    res.send = (data, statusCode = 200) => {
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(data);
    }

    return res;
};

// parse body json and form data
const parseBody = (req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        const contentType = req.headers['content-type'];
        if (contentType && contentType.startsWith('multipart/form-data')) {
            const form = new formidable.IncomingForm();
            form.parse(req, (err, fields, files) => {
                if (err) {
                    res.status(400).json({ error: 'Erreur lors du parsing du formulaire' });
                } else {
                    // Transformer les tableaux en valeurs uniques
                    Object.keys(fields).forEach(key => {
                        fields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
                    });
                    req.body = fields;
                    req.files = files;
                    if (typeof next === 'function') {
                        next();
                    }
                }
            });
        } else {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    req.body = JSON.parse(body);
                    next();
                } catch (err) {
                    res.status(400).json({ error: 'Erreur lors du parsing du JSON' });
                }
            });
        }
    } else {
        if (typeof next === 'function') {
            next();
        }
    }
};
// route handler
const router = {
    routes: [],

    add: function (method, url, handler) {
        const paramNames = [];
        const regex = url.replace(/:([^\/]+)/g, function (fullMatch, paramName) {
            paramNames.push(paramName);
            return '([^\/]+)';
        });

        const route = {
            method,
            regex: new RegExp(`^${regex}$`),
            handler,
            paramNames
        };

        this.routes.push(route);
    },

    get: function (url, handler) {
        this.add('GET', url, handler);
    },

    post: function (url, handler) {
        this.add('POST', url, handler)
    },

    put: function (url, handler) {
        this.add('PUT', url, handler)
    },

    delete: function (url, handler) {
        this.add('DELETE', url, handler)
    },


    findRoute: function (method, url) {
        let urlMatch = false;
        for (let route of this.routes) {
            let normalizedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
            if (route.regex.test(normalizedUrl)) {
                urlMatch = true;
                if (route.method === method) {
                    const match = normalizedUrl.match(route.regex);
                    const params = {};
                    if (route.paramNames.length > 0 && match) {
                        route.paramNames.forEach((name, index) => {
                            params[name] = match[index + 1];
                        });
                    }
                    return { handler: route.handler, params, methodMatch: true };
                }
            }
        }
        return {handler: null, params: {}, methodMatch: urlMatch};
    },



    parse: function (req) {
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const { pathname } = parsedUrl;
        return {
            method: req.method,
            url: pathname,
            query: parsedUrl.searchParams,
            path: pathname.replace(/\/$/, ''),
            segments: pathname.split('/').filter(Boolean)
        };
    },

    handle: function (req, res) {
        const extendedResponse = extendResponse(res);
        const { method, url } = this.parse(req);
        const { handler, params, methodMatch } = this.findRoute(method, url);
        if (handler) {
            req.params = params;
            return handler(req, extendedResponse);
        } else if (methodMatch) {
            extendedResponse.status(405).json({ error: 'Method not allowed' });
        } else {
            extendedResponse.status(404).json({ error: 'Not found' });
        }
    }
};


const server = http.createServer((req, res) => {

    const next = () => router.handle(req, res);
    parseBody(req, res, next);
});

module.exports = { router, server };
