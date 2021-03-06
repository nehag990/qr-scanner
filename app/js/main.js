import QRReader from './vendor/qrscan.js';
import {snackbar} from './snackbar.js';
import styles from '../css/styles.css';
import isURL from 'is-url';

//If service worker is installed, show offline usage notification
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    if (!localStorage.getItem("offline")) {
      localStorage.setItem("offline", true);
      snackbar.show('App is ready for offline usage.', 5000);
    }
  });
}

//To generate sw.js file
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

window.addEventListener("DOMContentLoaded", () => {
  //To check the device and add iOS support
  //window.iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;

  var copiedText = null;
  var frame = null;
  var selectPhotoBtn = document.querySelector('.app__select-photos');
  var dialogElement = document.querySelector('.app__dialog');
  var dialogOverlayElement = document.querySelector('.app__dialog-overlay');
  var dialogOpenBtnElement = document.querySelector('.app__dialog-open');
  var dialogCloseBtnElement = document.querySelector('.app__dialog-close');
  var scanningEle = document.querySelector('.custom-scanner');
  var textBoxEle = document.querySelector('#result');
  var helpText = document.querySelector('.app__help-text');
  var infoSvg = document.querySelector('.app__header-icon svg');
  var videoElement = document.querySelector('video');
  var sheetsURL = null;
  var type = null;
  var workshopBtnElement = document.querySelector('.workshop');
  var sessionBtnElement = document.querySelector('.session');
  window.appOverlay = document.querySelector('.app__overlay');

  //Initializing qr scanner
  window.addEventListener('load', (event) => {
    QRReader.init(); //To initialize QR Scanner
    // Set camera overlay size
    setTimeout(() => {
      setCameraOverlay();
      if (1) {
        scan();
      }
    }, 1000);
  });

  function setCameraOverlay() {
    window.appOverlay.style.borderStyle = 'solid';
    helpText.style.display = 'block';
  }

  function createFrame() {
    frame = document.createElement('img');
    frame.src = '';
    frame.id = 'frame';
  }

  //Dialog close btn event
  dialogCloseBtnElement.addEventListener('click', hideDialog, false);
  dialogOpenBtnElement.addEventListener('click', openInBrowser, false);

  //Button click for Session and Workshop
  workshopBtnElement.addEventListener('click', workshop, false);
  sessionBtnElement.addEventListener('click', session, false);

  function workshop() {
    workshopBtnElement.style.background='red';
    type = 'Workshop';
  }

  //To open result in browser
  function openInBrowser() {
    console.log('Result: ', copiedText);
    window.open(copiedText, '_blank', 'toolbar=0,location=0,menubar=0');
    copiedText = null;
    hideDialog();
  }

  //Scan
  function scan() {
    if (1) scanningEle.style.display = 'block';
    QRReader.scan((result) => {
      var array = [];
      var first, last;
      copiedText = result;
      array = result.split(/(?:,| )+/)
      last = array[0]
      if (array.length == 2)
        first = array[1]
      else
        first = array[2]

      sheetsURL = 'https://maker.ifttt.com/trigger/conf/with/key/bTiXpE3XeLKopMXqjIaaZK?value1=' + last + '&value2=' + first;
      textBoxEle.value = result;
      textBoxEle.select();
      scanningEle.style.display = 'none';
      if (isURL(result)) {
        dialogOpenBtnElement.style.display = 'inline-block';
      }
      dialogElement.classList.remove('app__dialog--hide');
      dialogOverlayElement.classList.remove('app__dialog--hide');
    });
  }

  //Hide dialog
  function hideDialog() {
    copiedText = null;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", sheetsURL, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send();
    //window.location = sheetsURL;
    textBoxEle.value = "";
    sheetsURL = "";
    type = "";
    if (window.iOS) {
      frame.src = "";
      frame.className = "";
    }

    dialogElement.classList.add('app__dialog--hide');
    dialogOverlayElement.classList.add('app__dialog--hide');
    scan();
  }

  // For iOS support
  if (window.iOS) selectFromPhoto();

  function selectFromPhoto() {
    if (videoElement) videoElement.remove(); //removing the video element

    //Creating the camera element
    var camera = document.createElement('input');
    camera.setAttribute('type', 'file');
    camera.setAttribute('capture', 'camera');
    camera.id = 'camera';
    helpText.textContent = '';
    helpText.style.color = '#212121';
    helpText.style.bottom = '-60px';
    infoSvg.style.fill = '#212121';
    window.appOverlay.style.borderStyle = '';
    selectPhotoBtn.style.color = "#212121";
    selectPhotoBtn.style.display = 'block';
    createFrame();

    //Add the camera and img element to DOM
    var pageContentElement = document.querySelector('.app__layout-content');
    pageContentElement.appendChild(camera);
    pageContentElement.appendChild(frame);

    //Click of camera fab icon
    selectPhotoBtn.addEventListener('click', () => {
      scanningEle.style.display = 'none';
      document.querySelector("#camera").click();
    });

    //On camera change
    camera.addEventListener('change', (event) => {
      if (event.target && event.target.files.length > 0) {
        frame.className = 'app__overlay';
        frame.src = URL.createObjectURL(event.target.files[0]);
        scanningEle.style.display = 'block';
        window.appOverlay.style.borderColor = '#212121';
        scan();
      }
    });
  }
});
