import { RefObject, useEffect } from 'react';
import Marzipano from 'marzipano';
import { AppData, InfoHotspot, LinkHotspot } from '../types/marzipano-types';

const createViewer = (panoRef: RefObject<HTMLDivElement>, settings: AppData['settings']) => {
  const viewerOpts = {
    controls: {
      mouseViewMode: settings.mouseViewMode
    }
  };
  return new Marzipano.Viewer(panoRef.current!, viewerOpts);
};

const createScene = (viewer: any, data: AppData['scenes'][0], common: AppData['common'], basePrefix: string) => {
  const source = Marzipano.ImageUrlSource.fromString(
    `/${basePrefix}/assets/tiles/${data.id}/{z}/{f}/{y}/{x}.jpg`,
    { cubeMapPreviewUrl: `/${basePrefix}/assets/tiles/${data.id}/preview.jpg` }
  );

  const levels = common.levels;
  const faceSize = common.faceSize;
  const geometry = new Marzipano.CubeGeometry(levels);
  const limiter = Marzipano.RectilinearView.limit.traditional(faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
  const view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

  const scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true
  });

  return scene;
};

const createInfoHotspotElement = (hotspot: InfoHotspot) => {
  // Create hotspot element
  const element = document.createElement('div');
  element.classList.add('hotspot');

  // Create icon element
  const icon = document.createElement('div');
  icon.classList.add('hotspot__icon');
  icon.innerHTML = 'i'; // You can replace this with an image element if needed

  // Create content element
  const content = document.createElement('div');
  content.classList.add('hotspot__content', 'hidden');
  content.innerHTML = `
    <div class="hotspot__title">${hotspot.title}</div>
    <div class="hotspot__text">${hotspot.infoText}</div>
  `;

  // Append icon and content to the hotspot element
  element.appendChild(icon);
  element.appendChild(content);

  // Add click event to toggle content visibility
  icon.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the scene click event from firing
    content.classList.toggle('hidden');
  });

  return element;
};

const closeAllHotspotContents = () => {
  const contents = document.querySelectorAll('.hotspot__content');
  contents.forEach(content => {
    content.classList.add('hidden');
  });
};

const addInfoHotspots = (scene: any, infoHotspots: InfoHotspot[]) => {
  infoHotspots.forEach(hotspot => {
    const element = createInfoHotspotElement(hotspot);
    scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
  });
};

const createLinkHotspotElement = (hotspot: LinkHotspot, sceneObjects: any[], targetSceneIndex: number) => {
  const element = document.createElement('div');
  element.classList.add('link-hotspot');

  const icon = document.createElement('div');
  icon.classList.add('link-hotspot__icon');
  icon.innerHTML = '🔗'; // You can replace this with an image element if needed

  element.appendChild(icon);

  element.addEventListener('click', () => {
    if (sceneObjects[targetSceneIndex]) {
      sceneObjects[targetSceneIndex].switchTo();
    }
  });

  return element;
};

const addLinkHotspots = (scene: any, linkHotspots: LinkHotspot[], sceneObjects: any[]) => {
  linkHotspots.forEach(hotspot => {
    const targetSceneIndex = parseInt(hotspot.target.split('scene')[1], 10);
    const element = createLinkHotspotElement(hotspot, sceneObjects, targetSceneIndex);
    scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
  });
};

export const useMarzipano = (panoRef: RefObject<HTMLDivElement>, appData: AppData, currentSceneIndex: number) => {
  useEffect(() => {
    if (!panoRef.current) return;

    const { settings, scenes, common } = appData;
    const viewer = createViewer(panoRef, settings);
    const basePrefix = "react-marzipano"; // NAME of the project / repository

    // First create all scenes
    const sceneObjects = scenes.map(data => {
      return createScene(viewer, data, common, basePrefix);
    });

    // Then add hotspots to each scene
    scenes.forEach((data, index) => {
      addInfoHotspots(sceneObjects[index], data.infoHotspots);
      addLinkHotspots(sceneObjects[index], data.linkHotspots, sceneObjects);
    });

    // Add click event listener to the viewer container to close all info hotspot contents
    panoRef.current.addEventListener('click', closeAllHotspotContents);

    // Switch to the current scene index
    if (sceneObjects[currentSceneIndex]) {
      sceneObjects[currentSceneIndex].switchTo();
    }

    // Cleanup the event listener on component unmount
    return () => {
      panoRef.current?.removeEventListener('click', closeAllHotspotContents);
    };
  }, [panoRef, appData, currentSceneIndex]);
};
