
const container = document.querySelector('.container');
const items = document.querySelectorAll('.item')

let fromIndex = -1;
let toIndex = -1;

items.forEach((item, index) => {

   item.addEventListener('dragstart', function(){
    console.log("drag-start", this, index);
    fromIndex = index;
   })
   
//    item.addEventListener('drag', function(){
//     console.log("drag", this);
//    })

   

   item.addEventListener('dragenter', function(){
     console.log("drag-enter", this, index);
     toIndex = index
   })
   item.addEventListener('dragover', function(e) {
    e.preventDefault()
    // console.log("drag-over", this);
   })
//    item.addEventListener('dragleave', function(){
//      console.log("drag-leave", this);
//    })

//     item.addEventListener('drop', function(){
//       console.log("drop", this);
//     })

    item.addEventListener('dragend', function(){
      console.log("drag-end", this);
      const list = document.querySelectorAll('.item');
      console.log('list before: ', list);
      if(fromIndex === -1 || toIndex === -1) return;
      console.log('toIndex: ', toIndex);
      console.log('fromIndex: ', fromIndex);

      const from = list[fromIndex]
      const to = list[toIndex]

      const fromDup = from.cloneNode(true)
      console.log('fromDup: ', fromDup);
      const toDup = to.cloneNode(true)
      console.log('toDup: ', toDup);

    //   const node = list[fromIndex]
    //   console.log('node: ', list[fromIndex], list[toIndex]);
    //   list[fromIndex] = list[toIndex];
    //   list[toIndex] = node;
      console.log('list after: ', list);
    //   list[fromIndex].parentNode.insertBefore(list[fromIndex], list[toIndex]);
    //   container.innerHTML = ''
    //   let innerNodes = ''
    //   for(let i =0; i<list.length; i++){
    //     innerNodes += list[i]
    //   }
    //   console.log('innerNodes: ', innerNodes);

    //   container.innerHTML = innerNodes
      
    //   container.innerText = `${list}`
    // container.replaceChildren(list)
 
    // container.replaceChild(list[toIndex],list[fromIndex])
    // const from
    container.replaceChild(fromDup, to)
    container.replaceChild(toDup, from)

    
    console.log('from: ', from);
    // container.replaceChild(from,list[toIndex])


    })
})