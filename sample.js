const Checker = require("./index");
async function tester() {
  const checker = new Checker("{YOUR USERNAME}", "{YOUR PASSWORD}");
  try {
    const result = await checker.check("{TC KIMLIK", 3);
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
}
tester();
