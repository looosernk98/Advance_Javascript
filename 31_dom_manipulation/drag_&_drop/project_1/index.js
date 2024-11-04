const dropTargets = document.querySelectorAll('.container');
const draggables = document.querySelectorAll('.draggable');

draggables.forEach((draggable, index) => {
    draggable.addEventListener('dragstart', (e) => {
    //    console.log("drag start", this);
       draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        // console.log("drag end");
        draggable.classList.remove('dragging')
    })

    draggable.addEventListener('dragenter', function(e){
        // console.log('this:', this.classList);
        console.log('Boolean:', this);
        const currDraggedEle = document.querySelector('.dragging')
        this.parentNode.insertBefore(currDraggedEle, this)
        

    })
})

dropTargets.forEach((dropTarget, index) => {
   dropTarget.addEventListener('dragover', (e) => {
    e.preventDefault();

    console.log('drag over', e.target);
    // if(e.target.classList.contains('container'))
    // const afterElement = getAfterElement(dropTarget, e.clientY);
    // console.log('afterElement: ', afterElement);
    //  const currDraggedEle = document.querySelector('.dragging')
    //  console.log('currDraggedEle: ', currDraggedEle);
    //  if(afterElement!=null){
    //     dropTarget.insertBefore(currDraggedEle, afterElement )
    //  }else{
    //     dropTarget.appendChild(currDraggedEle)
    //  }
   })
})

function getAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    // console.log('draggables: ', draggables);

    // const closestEle = draggables.reduce((closest, child) => {
    //     const box = child.getBoundingClientRect();

    //     const offset = y - box.top - box.height/2;
    //     if(offset < 0 && offset > closest.offset){
    //         console.log('offset: ', offset);
    //         return { offset, element : child }
    //     }
    //     return closest
    // }, { offset: Number.POSITIVE_INFINITY})

    const closestEle =  draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      }, { offset: Number.NEGATIVE_INFINITY })
    

    return closestEle.element;
   
}