import {Express} from 'express';
import appBase from "@/apps/appBase";

const apps: { [index: string]: Express } = {
    appBase: appBase
}

export default apps;
