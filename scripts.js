const draggables= document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable=>{
    draggable.addEventListener('dragstart',()=>{
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend',()=>{
        draggable.classList.remove('dragging')
    })

})

containers.forEach(container =>{
    container.addEventListener('dragover', (e)=>{
        //prevents cursor giving incorrect signal
        e.preventDefault
        //get the y coord of the mouse
        const afterElement = getDragAfterElement(container, e.clientY)
        console.log(afterElement)
        const draggable=document.querySelector('.dragging')
        if(afterElement==null){
            container.appendChild(draggable) 
        }else{
            container.insertBefore(draggable,afterElement)
        }
       
        
       
    })
})

function getDragAfterElement(container, y){
    //get every draggable we are not currently dragging
    const draggableElements=[...container.querySelectorAll('.draggable:not(.dragging')]
    //determine which single lement is directly after our cursor
    draggableElements.reduce((closest, child)=>{
        const box=child.getBoundingClientRect()
        const offset=y - box.top - box.height/2
        //when we get a negative offset, we must be above it
        if (offset<0 && offset>closest.offset){
            return {offset:offset, element:child}
        }else{
            return closest
        }
    },{offset: Number.NEGATIVE_INFINITY})

}