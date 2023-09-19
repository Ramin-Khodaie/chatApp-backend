
class Logger {

    logReqest(req: Request) {
        const { method, url, body } = req;
        console.log(`[${new Date().toISOString()}] [REQUEST] ${method} ${url}`);
        console.log('Request Body:', body);
        console.log('----------------------------------------------');
    }


    logResponse(res: Response) {
        const { status, statusText, headers } = res;

        console.log(`[${new Date().toISOString()}] [RESPONSE] ${status} ${statusText}`);
        console.log('Headers:', headers);
        console.log('----------------------------------------------');
    }

    logError(err:Error) {
        console.error(`[${new Date().toISOString()}] [ERROR] ${err.stack || err}`);
      }
}

export default Logger;