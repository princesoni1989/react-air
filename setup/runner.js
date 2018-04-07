export function dateFormat(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

function run(fn) {
  const task = typeof fn.default === "undefined" ? fn : fn.default;
  const startDate = new Date();
  console.info(`[${dateFormat(startDate)}] :: Task ${fn.name} :: Started`);
  return task().then(() => {
    const endTime = new Date();
    const timeTaken = endTime.getTime() - startDate.getTime();
    console.warn(`[${dateFormat(endTime)}] :: Task ${fn.name} :: Ended :: Taken Time : ${timeTaken}ms`);
  });
}

if (process.argv.length > 2) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const script = require(`./${process.argv[2]}.js`).default;
  run(script).catch(err => {
    console.log(err);
    process.exit(1);
  });
}

export default run;
