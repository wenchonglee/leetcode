function debounce(func: Function, wait = 300) {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any[]) {
    //@ts-ignore
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

let counter = 0;

const func = debounce(() => {
  counter += 1;
});
func();
func();
func();

setTimeout(() => {
  console.log(counter); // 1
}, 500);

/**
 * Checking that `this` is correctly scoped
 */
const obj = {
  name: "pepper",
  printName: debounce(function () {
    //@ts-ignore
    console.log(this.name);
  }),
};

obj.printName();
