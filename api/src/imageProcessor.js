
const path = require('path');

const {Worker, isMainThread} = require('worker_threads');




const pathToResizeWorker = path.resolve(__dirname, 'resizeWorker.js')
const pathToMonochromeWorker =  path.resolve(__dirname, 'monochromeWorker.js')


const uploadPathResolver = (filename) => {
    return path.resolve(__dirname, '../uploads', filename)}

    const imageProcessor = () => {
        return new Promise((resolve, reject) => {
            if (isMainThread) {

            }  else {
                reject(new Error('not on main thread'));

            }      

            resolve();



        
    });
};

module.exports = imageProcessor;