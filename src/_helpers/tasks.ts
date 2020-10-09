/**
 * Tasks related to Queues and Events, based on Bull
 * 1. Make Repeatable: A Function to repeat a task over a period of time
 * 2. Make CronTask: A Function to generate a cron task for the Queue
 */
/* ------------------------------------------------------------------------ */

// await messageQueue.add(
//     { test: 'bar' },
//     {
//         repeat: {
//             every: 10000,
//             limit: 5
//         }
//     }
// );

// messageQueue.process(function(job, done) {
//     console.log('Received message', job.data);
//     done();
// });

// messageQueue.close().then(function() {
// 	console.log('done');
// });

// Repeat payment job once every day at 3:15 (am)
// messageQueue.add('string Blob', { repeat: { cron: '1 * * * *' } });
// console.log(messageQueue, myJob);

/* ------------------------------------------------------------------------------------- */
// Named jobs

// It is possible to give names to jobs. This does not change any of the mechanics of the queue but can be used for clearer code and better visualization in UI tools:

// // Jobs producer
// const myJob = await transcoderQueue.add('image', { input: 'myimagefile' });
// const myJob = await transcoderQueue.add('audio', { input: 'myaudiofile' });
// const myJob = await transcoderQueue.add('video', { input: 'myvideofile' });

// Worker
// transcoderQueue.process('image', processImage);
// transcoderQueue.process('audio', processAudio);
// transcoderQueue.process('video', processVideo);
