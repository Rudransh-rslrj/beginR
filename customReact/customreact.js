const mainContainer =document.querySelector('#root')

const reactElement ={
    type : 'a',
    props :{
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'Click me to visit google'
}
function customRender(mainContainer,reactElement){
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML =reactElement.children
    for(const prop in reactElement.props){
        if(prop === 'children')continue;
        domElement.setAttribute(prop,reactElement.props[prop])
    }
    mainContainer.appendChild(domElement)
}

customRender(mainContainer,reactElement);