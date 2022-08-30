const { resolve } = require('path');
const path = require('path');
const { reject } = require('ramda');
const {Worker, isMainThread, workerData} = require('worker_threads');

const resizeWorkerFinished = false;
const monochromeWorkerFinished = false;


const pathToResizeWorker = path.resolve(__dirname, 'resizeWorker.js')
const pathToMonochromeWorker = (filename) => {

    return path.resolve(__dirname, '../uploads', filename);
};

const imageProcessor = (filename) => {
    const sourcePath = uploadPathResolver(filename)
    const resizedDestination = uploadPathResolver('resized-'+ filename)
    const monochromeDestination = uploadPathResolver('monochrome-')
    return new Promise((resolve, reject) => {
        if (isMainThread) {
            try {
                const resizeWorker = new Worker(pathToResizeWorker, {
                    workerData: {
                        source: sourcePath,
                        destination: resizedDestination,
                    },
                });



                const pathToMonochromeWorker = new Worker(pathToMonochromeWorker, )
                workerData; {
                source: sourcePath,
                destination: monochromeDestination,
            },
        });

        resizeWorker.on('message', (message) => {
            resizeWorkerFinished = true;

            resolve('resizeWorker finished processing');

        });

              resizeWorker.on('error' ,(error) => {
                reject(new Error(error.message));
              });

              resizeWorker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error('Exit with status code' + code));
                }
              });

              monochromeWorkerFinished.on('message', (message) => {
                monochromeWorkerFinished = true

                if (resizeWorkerFinished){
                    resolve('monochromeWorker finished processing');
                }
              })
              monochromeWorker.on('error', (error)=> {
                reject(new Error(error.message));
              });

              monochromeWorker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error('Exited with status code' + code ));
                }
              });

            } catch (error){
                reject(error);

            });

        } else {
            reject(new Error('not on main thread'));
        }

        resolve();
        }

   
};

module.exports = imageProcessor;