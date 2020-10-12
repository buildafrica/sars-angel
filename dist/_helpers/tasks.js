"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._createCronTask = exports._createRepeatableTask = void 0;
exports._createRepeatableTask = function (queue) { return function (name, data) {
    queue.add(name, data, {
        repeat: {
            every: 1000,
            limit: 2
        }
    });
}; };
exports._createCronTask = function (queue, name, data) {
    queue.add(name, data, {
        repeat: { cron: '1 * * * *' }
    });
};
/* --------------------------------------------------------------------------- */
// Named jobs
// It is possible to give names to jobs.
// This does not change any of the mechanics of the queue but can be used for
// clearer code and better visualization in UI tools:
// // Jobs producer
// const myJob = await transcoderQueue.add('image', { input: 'myimagefile' });
// Worker
// transcoderQueue.process('image', processImage);
// // and named processors: with concurrency set at 5
// queue.process('image', 5, '/path/to/my/processor.js');
