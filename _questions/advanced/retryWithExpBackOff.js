async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.floor(Math.random() * 10) >= 8) {
        // 0 - 9
        resolve("API Sucesss");
      } else {
        reject("API Failed");
      }
    }, 3000);
  });
}

//=================== Recursive approach ==============================
async function retryWithExpBackOffRecursive(
  fn,
  retriesLimit = 3,
  delay = 500,
  attempt = 0
) {
  try {
    const res = await fn();
    console.log("Fetched data successfully..");
    return res;
  } catch (e) {
    if (attempt >= retriesLimit) {
      throw e;
    }

    console.log(`Failed at attempt ${attempt}, retrying...`);

    const newDelay = delay * Math.pow(2, attempt);

    await new Promise((res) => setTimeout(res, newDelay));

    return retryWithExpBackOffRecursive(fn, retriesLimit, delay, attempt + 1);
  }
}

// retryWithExpBackOffRecursive(fetchData, 3, 500)
//   .then((res) => console.log("result: ", res))
//   .catch((err) => console.log("err: ", err));

//=================== Recursive approach ==============================

async function retryWithExpBackOffIterative(fn, retriesLimit = 3, delay = 500) {
  for (let attempt = 0; attempt < retriesLimit; attempt++) {
    try {
      const res = await fn();
      console.log("Fetched data successfully..");
      return res;
    } catch (error) {
      if (attempt >= retriesLimit) {
        throw error;
      }
      const waitTime = delay * Math.pow(2, attempt);
      console.log(`Attempt ${attempt} failed. Retrying in ${waitTime}ms`);
      await new Promise((res) => setTimeout(res, waitTime));
    }
  }
}

retryWithExpBackOffIterative(fetchData, 3, 500)
  .then((res) => console.log("result: ", res))
  .catch((err) => console.log("err: ", err));

// ==================== With Jitter =======================================

// Problem with pure exponential backoff
// Your current logic:

// delay * 2^attempt

// 👉 If many clients retry at same time:

// They all retry at exact same intervals
// Causes thundering herd problem

async function retryWithBackoffWithJitter(fn, retries = 3, delay = 500) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        if (attempt === retries) throw err;
  
        const baseDelay = delay * Math.pow(2, attempt);
        const waitTime = Math.random() * baseDelay; // Full jitter
        // const waitTime = base / 2 + Math.random() * (base / 2); // Equal jitter
  
        console.log(`Retry ${attempt} in ${Math.floor(waitTime)}ms`);
  
        await new Promise(res => setTimeout(res, waitTime));
      }
    }
  }

/*

1. “I’d use exponential backoff with jitter to avoid synchronized retries.”
2. “Recursive implementation is fine but iterative is safer for production.”
3. “Retries should be limited and ideally idempotent operations only.”
4. “We can also cancel retries using AbortController.”

Idempotent means:
Performing the same operation multiple times produces the same result as doing it once

IMPORTANT:
1. ForEach loop does NOT understand promises — it won’t wait for await
2. For..of , for loop understand and wait for sequential work
3. map, filter, reduce also DOES NOT  understand promises and it won't wait

*/



