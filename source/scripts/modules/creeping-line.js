const creepingLineNode = document.querySelector('.hero__creeping-line');
const creepingLineWrapperNode = document.querySelector('.hero__creeping-line-wrapper');


function copyDesc () {
  creepingLineNode.append(creepingLineWrapperNode.cloneNode(true));
}

export {copyDesc};
