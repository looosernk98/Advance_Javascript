const obj = {
    a: 7,
    print: function(){
        return () => {
            console.log(this)
        }
    }
}


const fn = obj.print()

// CASE1:
const obj2 = {
    a: 4,
    print: fn
}

obj2.print()

// CASE2:
const obj3 = {
    a: 10,
}

fn.call(obj3)
fn.bind(obj3)()


//*****************************************************/
function f() {
  return this.a;
}

const g = f.bind({ a: "azerty" });
console.log(g()); // azerty

const h = g.bind({ a: "yoo" }); // bind only works once!
console.log(h()); // azerty

const o = { a: 37, f, g, h };
console.log(o.a, o.f(), o.g(), o.h()); // 37 37 azerty azerty