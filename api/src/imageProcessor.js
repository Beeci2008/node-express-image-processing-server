
const path = require('path');

const {Worker, isMainThread} = require('worker_threads');




const pathToResizeWorker = path.resolve(__dirname, 'resizeWorker.js')
const pathToMonochromeWorker =  path.resolve(__dirname, 'monochromeWorker.js')


const uploadPathResolver = (filename) => {
    return path.resolve(__dirname, '../uploads', filename)}

    const imageProcessor = (filename) => {
        const sourcePath = uploadPathResolver(filename)
        const resizedDestination = uploadPathResolver('resized-'+ filename)
        const monochromedestination = uploadPathResolver('monochrome-'+ filename)

        return new Promise((resolve, reject) => {
            if (isMainThread) {
                try{
                    const resizeWorker = new Worker(pathToResizeWorker, {
                        workerData: {
                            source: sourcePath,
                            destination: resizedDestination,

                        },

                    });

                } catch (error){
                    reject(error);

                }

            }  else {
                reject(new Error('not on main thread'));

            }      

            resolve();



        
    });
};

module.exports = imageProcessor;