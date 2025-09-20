// polyfill of promise.race

const myRace = function(arr){
    return new Promise((resolve, reject) => {
     for(let i =0; i<arr.length; i++){
         arr[i].then((result) =>  resolve(result))
         .catch((err) => {
             reject(err)
         })
 
         // Promise.resolve(arr[i]).then(resolve, reject)
      }
    })
 }
 
 
 // Demo showing that other promises continue executing
 const p1 = new Promise((res, rej) => {
     setTimeout(() => {
        console.log("P1: I'm still executing even though race already settled!");
        res("resolve after 2 sec")
     }, 2000)
 })
 
 const p2 = new Promise((res, rej) => {
     setTimeout(() => {
        console.log("P2: I'm still executing even though race already settled!");
        res("resolve after 1 sec")
     }, 1000)
 })
 
 const p3 = new Promise((res, rej) => {
     setTimeout(() => {
        console.log("P3: I'm settling first and will determine race result!");
        rej("reject after 0.5 sec")
     }, 500)
 })
 
 console.log("Starting Promise.race...");
 const promise = Promise.race([p1,p2,p3])
 
 promise.then((res) =>{
     console.log('Race resolved with: ', res);
 })
 .catch((err) =>{
     console.log('Race rejected with: ', err);
     console.log("But watch - other promises will still execute...");
 })
 
 
 /*
 ===================================================================================
                             EVENT LOOP FLOW - STEP BY STEP
 ===================================================================================
 
 PHASE 1: CALL STACK EXECUTION (0ms - Synchronous)
 -------------------------------------------------
 When script starts:
 
 1. const p1 = new Promise((res, rej) => { setTimeout(..., 2000) })
    - Promise executor runs IMMEDIATELY
    - setTimeout schedules Timer 1 (2000ms) in Timer Queue
    - p1 is in "pending" state
    - Returns immediately (non-blocking)
 
 2. const p2 = new Promise((res, rej) => { setTimeout(..., 1000) })
    - Promise executor runs IMMEDIATELY  
    - setTimeout schedules Timer 2 (1000ms) in Timer Queue
    - p2 is in "pending" state
 
 3. const p3 = new Promise((res, rej) => { setTimeout(..., 500) })
    - Promise executor runs IMMEDIATELY
    - setTimeout schedules Timer 3 (500ms) in Timer Queue  
    - p3 is in "pending" state
 
 4. console.log("Starting Promise.race...") 
    - PRINTS IMMEDIATELY to console
 
 5. const promise = Promise.race([p1,p2,p3])
    - Creates new race promise instantly
    - Race promise is in "pending" state
    - Internally watches p1, p2, p3 for first settlement
 
 6. promise.then(...).catch(...)
    - Registers .then and .catch handlers
    - Handlers are NOT executed yet (promises still pending)
    - Handlers wait for race promise to settle
 
 7. Call Stack is now EMPTY
    - Event Loop takes control
    - Starts checking Timer Queue
 
 TIMER QUEUE STATE after Call Stack:
 Timer 1: p1 resolution callback (scheduled for 2000ms)
 Timer 2: p2 resolution callback (scheduled for 1000ms)  
 Timer 3: p3 rejection callback (scheduled for 500ms)
 
 ===================================================================================
 
 PHASE 2: EVENT LOOP CYCLES
 ---------------------------
 
 500ms: First Timer Fires (p3) ⏰
 --------------------------------
 Event Loop finds Timer 3 ready:
 
 1. Timer Queue → Executes p3's setTimeout callback:
    setTimeout(() => {
        console.log("P3: I'm settling first and will determine race result!");
        rej("reject after 0.5 sec")  // ← p3 REJECTS
    }, 500)
 
 2. p3 changes state: pending → rejected
    - Rejection value: "reject after 0.5 sec"
 
 3. Promise.race detects first settlement:
    - p3 rejected first → Promise.race IMMEDIATELY rejects
    - Race promise state: pending → rejected
    - Race rejection value: "reject after 0.5 sec"
 
 4. .catch() callback gets queued in MICROTASK QUEUE:
    .catch((err) => {
        console.log('Race rejected with: ', err);
        console.log("But watch - other promises will still execute...");
    })
 
 5. Event Loop processes Microtask Queue IMMEDIATELY:
    - PRINTS: "Race rejected with: reject after 0.5 sec"
    - PRINTS: "But watch - other promises will still execute..."
 
 6. Microtask Queue is empty, Event Loop continues with timers
 
 ===================================================================================
 
 1000ms: Second Timer Fires (p2) ⏰  
 -----------------------------------
 Event Loop finds Timer 2 ready:
 
 1. Timer Queue → Executes p2's setTimeout callback:
    setTimeout(() => {
        console.log("P2: I'm still executing even though race already settled!");
        res("resolve after 1 sec")  // ← p2 RESOLVES
    }, 1000)
 
 2. p2 changes state: pending → resolved
    - Resolution value: "resolve after 1 sec"
 
 3. Promise.race is ALREADY SETTLED (rejected at 500ms):
    - p2's resolution is IGNORED by race
    - No new microtasks are queued
    - Race promise remains rejected
 
 4. p2 completes its independent lifecycle
    - PRINTS: "P2: I'm still executing even though race already settled!"
 
 ===================================================================================
 
 2000ms: Third Timer Fires (p1) ⏰
 ----------------------------------
 Event Loop finds Timer 1 ready:
 
 1. Timer Queue → Executes p1's setTimeout callback:
    setTimeout(() => {
        console.log("P1: I'm still executing even though race already settled!");
        res("resolve after 2 sec")  // ← p1 RESOLVES
    }, 2000)
 
 2. p1 changes state: pending → resolved
    - Resolution value: "resolve after 2 sec"
 
 3. Promise.race is ALREADY SETTLED (rejected at 500ms):
    - p1's resolution is IGNORED by race
    - No new microtasks are queued
    - Race promise remains rejected
 
 4. p1 completes its independent lifecycle
    - PRINTS: "P1: I'm still executing even though race already settled!"
 
 ===================================================================================
 
 KEY EVENT LOOP CONCEPTS:
 ========================
 
 1. PROMISE SETTLEMENT IS PERMANENT:
    - Once a promise settles (resolve/reject), it NEVER changes state
    - Promise.race settles with the FIRST settlement among input promises
    - Subsequent settlements are ignored
 
 2. MICROTASKS vs MACROTASKS:
    - Macrotasks: setTimeout, setInterval (Timer Queue)
    - Microtasks: Promise .then/.catch/.finally
    - Priority: Microtasks run COMPLETELY before next macrotask
 
 3. INDEPENDENT PROMISE LIFECYCLES:
    - p1, p2, p3 are separate promises with their own lifecycles
    - Promise.race creates a NEW promise that watches the others
    - Original promises continue executing even after race settles
 
 4. TIMER CALLBACKS CONTINUE:
    - setTimeout callbacks remain scheduled in Event Loop
    - They execute when their timer expires, regardless of race result
    - Side effects (console.log, DB writes, API calls) still occur
 
 5. MEMORY & PERFORMANCE:
    - Promises and timers consume memory until they complete
    - Event Loop continues processing all scheduled callbacks
    - This is why Promise.race doesn't "cancel" other operations
 
 VISUAL TIMELINE:
 0ms    │ Call Stack: Create promises, schedule timers, register handlers
        │ Timer Queue: [p3:500ms, p2:1000ms, p1:2000ms]
 500ms  │ p3 rejects → Promise.race rejects → .catch() executes
 1000ms │ p2 resolves (ignored by race) → continues independently  
 2000ms │ p1 resolves (ignored by race) → continues independently
 
 ===================================================================================
 */
 
 
 