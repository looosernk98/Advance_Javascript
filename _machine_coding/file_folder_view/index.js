const data = [
    {
        type:'folder',
        name: "personal",
        data: [
            {
                type:"file",
                name: "index.js",
                content: "Hello , my name is niranjan , having 4 years of experience"
            },
            {
                type:"folder",
                name: "photos",
                data: [
                    {
                        type: "file",
                        name: "photo1.jpg",
                        content: "This is my personal photo1"
                    },
                    {
                        type: "file",
                        name: "photo2.jpg",
                        content: "This is my personal photo2"
                    }
                ]
            } 
        ]
    },
    {
        type:'folder',
        name: "documents",
        data: [
            {
                type:"file",
                name: "index.js",
                content: "Hello , my name is niranjan , having 4 years of experience"
            },
            {
                type:"folder",
                name: "photos",
                data: [
                    {
                        type: "file",
                        name: "photo1.jpg",
                        content: "This is my personal photo1"
                    },
                    {
                        type: "file",
                        name: "photo2.jpg",
                        content: "This is my personal photo2"
                    }
                ]
            } 
        ]
    },
]

const fileExplorer = document.querySelector('.file-explorer')

function renderChildRecursively(data, folderDiv){
    console.log("data", data)
    data.sort((a, b) => a.name.localeCompare(b.name));


    for(let i =0; i<data.length; i++){
        const type = data[i].type;
        if(type == 'folder'){
            const childFolderDiv = document.createElement('div');
            childFolderDiv.style.marginLeft = "10px";
            childFolderDiv.style.cursor = "pointer";
            
            // Create folder container
            const folderContainer = document.createElement('div');
            folderContainer.style.display = "flex";
            folderContainer.style.alignItems = "center";

            
            // Create and add dropdown icon
            const iconSpan = document.createElement('span');
            iconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-360 280-560h400L480-360Z"/></svg>'
            folderContainer.appendChild(iconSpan);
            
            // Add folder name
            const nameSpan = document.createElement('span');
            nameSpan.textContent = data[i].name;
            folderContainer.appendChild(nameSpan);
            
            // Create container for nested items
            const nestedContainer = document.createElement('div');
            nestedContainer.style.display = "block"; // Initially expanded
            
            // Add click handler for expand/collapse
            folderContainer.addEventListener('click', () => {
                const isExpanded = nestedContainer.style.display === "block";
                nestedContainer.style.display = isExpanded ? "none" : "block";
                iconSpan.style.transform = isExpanded ? "rotate(-90deg)" : "";
                iconSpan.style.transition = "transform 0.2s";
            });
            
            childFolderDiv.appendChild(folderContainer);
            childFolderDiv.appendChild(nestedContainer);
            folderDiv.appendChild(childFolderDiv);
            
            // Render nested items in the nested container
            renderChildRecursively(data[i].data, nestedContainer);
        }else{
            const fileContainer = document.createElement('div');
            fileContainer.style.display = "flex";
            fileContainer.style.paddingLeft= "10px"
            // fileContainer.style.gap = "5px"
            const iconSpan = document.createElement('span');
            iconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>'
            

            const fileDiv = document.createElement('span');

            fileDiv.classList.add('file')
            fileDiv.textContent = data[i].name;

            fileContainer.appendChild(iconSpan)
            fileContainer.appendChild(fileDiv)
            folderDiv.appendChild(fileContainer)
        }
    }
}

renderChildRecursively(data, fileExplorer)

