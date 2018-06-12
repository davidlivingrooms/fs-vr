const MODIFIER = 2;
const MARGIN = MODIFIER * 2;

function fetchDirectoryTree(url) {
  return new Promise(resolve => resolve(DATA))
}

function randomId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

function createFolder (folder) {
  const folderWrapper = document.createElement('a-entity');
  document.querySelector('a-scene').appendChild(folderWrapper);

  const aLayoutEntity = document.createElement('a-entity');
  const id = randomId();
  aLayoutEntity.setAttribute('id', id);
  aLayoutEntity.setAttribute('layout', `type: box; columns: 4; margin: ${MARGIN}; plane: xz; align: end;`);
  aLayoutEntity.setAttribute('position', "0 0 -15");
  folderWrapper.appendChild(aLayoutEntity);

  const promise = new Promise((resolve) => {
    aLayoutEntity.addEventListener('loaded', function () {
      resolve(aLayoutEntity)
    });
  })

  // Create the file blocks
  const files = getFiles(folder.children);
  files.forEach((file) => createFile(file, aLayoutEntity, {}))

  // Create the folder platform
  const boxEl = document.createElement('a-box');
  boxEl.setAttribute('color', '#784e56');
  boxEl.setAttribute('depth', (files.length / MARGIN) * MODIFIER + (MARGIN * 4));
  boxEl.setAttribute('height', '1');
  boxEl.setAttribute('width', (MARGIN * 5));
  document.querySelector('a-scene').appendChild(boxEl);

  // Folder text
  const folderTextEntity = document.createElement('a-entity');
  folderTextEntity.setAttribute('text', `value: ${folder.name}; width: ${MODIFIER * 30}; height: ${MODIFIER * 30}`)
  folderTextEntity.setAttribute('rotation', "-90 0 0")
  folderWrapper.appendChild(folderTextEntity);

  promise.then((entity) => {
    const position = entity.object3D.position;
    const numFiles = Math.floor(files.length/4) + 1;
    boxEl.setAttribute('position', `${position.x + (MODIFIER * 2) + (MARGIN) } ${position.y} ${position.z + MARGIN}`);
    const z = position.z + (MARGIN * numFiles) + (MODIFIER * numFiles);
    console.log('Z', z)
    folderTextEntity.setAttribute('position', `${position.x + (MODIFIER * 6) + (MARGIN * 4)} ${position.y + 0.1} ${z}`);
  })
}

function createFile (file, anchorEl, position) {
  const boxEl = document.createElement('a-box');
  boxEl.setAttribute('color', '#4CC3D9');

  let height = file.size * .001;
  if (height < 20) {
    height = 20;
  }

  boxEl.setAttribute('depth', MODIFIER);
  boxEl.setAttribute('height', height);
  boxEl.setAttribute('width', MODIFIER);
  anchorEl.appendChild(boxEl);

  boxEl.addEventListener('loaded', function () {
    console.log('folder attached');
  });
}

function getFiles (children) {
  return children.filter((child) => child.type === 'file')
}

function getFolders (children) {
  return children.filter((child) => child.type === 'directory')
}

function createFiles (files, folderEl) {
  let x = 0;
  files.forEach((file, index) => {
    // const position = {
    //   x: MODIFIER,
    //   y: 1,
    //   z: MODIFIER
    // }

    createFileBuilding(file);
  })
}

function createCity(url) {
  fetchDirectoryTree(url).then(dirTree => {
    console.log(dirTree)
    const folderName = dirTree.name;
    const children = dirTree.children;
    const files = getFiles(children);
    const folders = getFolders(children);
    createFolder(dirTree)
  })
}

const url = '';
createCity(url);

