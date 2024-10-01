const creepingLines = document.querySelectorAll('.creeping-line');


function copyDesc () {
  if (creepingLines.length > 0) {
    creepingLines.forEach((creepingLine) => {
      const creepingLineWrapperNode = creepingLine.querySelector('.creeping-line__wrapper');
      creepingLine.append(creepingLineWrapperNode.cloneNode(true));
    });
  }
}

export {copyDesc};
