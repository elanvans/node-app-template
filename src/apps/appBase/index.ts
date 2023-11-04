import {app} from "@elanvans/app-common";
import routerBase from "@/apps/appBase/routes/base.router";

const appBase = app(process.env.APP_BASE_NAME as string, process.env.APP_BASE_PORT as string);
appBase.use(routerBase);

appBase.use('/', (req, res) => {
    res.send('hello')
})

export default appBase;
