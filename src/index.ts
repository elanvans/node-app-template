import moduleAlias from 'module-alias';
import dotenv from 'dotenv';

dotenv.config({path: `.env.${process.env.NODE_ENV}`});

if (process.env.NODE_ENV === "production") {
    moduleAlias.addAliases({
                               "@": `${__dirname}`
                           })
}

import * as http from 'http';
import apps from "@/apps";

for (const app of Object.values(apps)) {
    try {
        const appName = app.get('name');
        const port    = _normalizePortAccount(app.get('port'));
        if (!port) continue;

        const server = http.createServer(app);
        server.listen(port);

        server.on('error', (e: Error) => _onError(e, appName));
        server.on('listening', () => _onListening(server, appName));

    } catch (e) {
    }
}

function _normalizePortAccount(val: string) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return false;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function _onError(error: Error, appName: string) {
    console.error(appName, error.message);
    process.exit(1);
}

function _onListening(server: http.Server, appName: string) {
    const address = server.address();
    if (address) {
        const bind = typeof address === 'string'
                     ? 'pipe ' + address
                     : 'port ' + address.port;
        console.log(appName + ' is listening on ' + bind);
    }
}
