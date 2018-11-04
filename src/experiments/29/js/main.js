/* global document */
/* global window */
document.addEventListener('DOMContentLoaded', () => {
  //-----------------------------------------------------------------------------------------------
  // CODE FOR SECTION 'cups.svg'
  const objectCups = document.querySelector("#objectCups");
  objectCups.addEventListener("load", function() {
    const svg = objectCups.contentDocument.querySelector("#cups");
    const snap = Snap(svg);
    const simpleCup = snap.select('#simple-cup');
    const fancyCup = snap.select('#fancy-cup');
    const simpleCupPoints = simpleCup.node.getAttribute('d');
    const fancyCupPoints = fancyCup.node.getAttribute('d');
    const toFancy = function() {
      simpleCup.animate({ d: fancyCupPoints }, 1000, mina.backout, toSimple);
    }
    const toSimple = function() {
      simpleCup.animate({ d: simpleCupPoints }, 1000, mina.backout, toFancy);
    }
    toSimple();
   }, false);
  //-----------------------------------------------------------------------------------------------
  // CODE FOR SECTION '01c_shapesPathed.svg'
  const objectShapesCharlie = document.querySelector("#objectShapesCharlie");
  objectShapesCharlie.addEventListener("load", function() {
    const svg = objectShapesCharlie.contentDocument.querySelector("#shapes");
    const snap = Snap(svg);
    const circle = snap.select('#circle');
    const circlePoints = circle.node.getAttribute('d');
    const triangle = snap.select('#triangle');
    const trianglePoints = triangle.node.getAttribute('d');
    const square = snap.select('#square');
    const squarePoints = square.node.getAttribute('d');
    const pentagon = snap.select('#pentagon');
    const pentagonPoints = pentagon.node.getAttribute('d');
    const cross = snap.select('#cross');
    const crossPoints = cross.node.getAttribute('d');
    const circleToTriangle = function() {
      circle.animate({ d: trianglePoints }, 1000, mina.bounce, triangleToSquare);
    }
    const triangleToSquare = function() {
      circle.animate({ d: squarePoints }, 1000, mina.bounce, squareToPentagon);
    }
    const squareToPentagon = function() {
      circle.animate({ d: pentagonPoints }, 1000, mina.bounce, pentagonToCross);
    }
    const pentagonToCross = function() {
      circle.animate({ d: crossPoints }, 1000, mina.bounce, crossToCircle);
    }
    const crossToCircle = function() {
      circle.animate({ d: circlePoints }, 1000, mina.bounce, circleToTriangle);
    }
    circleToTriangle();
   }, false);
  //-----------------------------------------------------------------------------------------------
  // CODE FOR SECTION '02_shapesEqualAnchors.svg'
  const objectShapes = document.querySelector("#objectShapesEA");
  objectShapes.addEventListener("load", function() {
    const svg = objectShapes.contentDocument.querySelector("#shapes");
    const snap = Snap(svg);
    const circle = snap.select('#circle');
    const circlePoints = circle.node.getAttribute('d');
    const triangle = snap.select('#triangle');
    const trianglePoints = triangle.node.getAttribute('d');
    const square = snap.select('#square');
    const squarePoints = square.node.getAttribute('d');
    const pentagon = snap.select('#pentagon');
    const pentagonPoints = pentagon.node.getAttribute('d');
    const cross = snap.select('#cross');
    const crossPoints = cross.node.getAttribute('d');
    const circleToTriangle = function() {
      circle.animate({ d: trianglePoints }, 1000, mina.bounce, triangleToSquare);
    }
    const triangleToSquare = function() {
      circle.animate({ d: squarePoints }, 1000, mina.bounce, squareToPentagon);
    }
    const squareToPentagon = function() {
      circle.animate({ d: pentagonPoints }, 1000, mina.bounce, pentagonToCross);
    }
    const pentagonToCross = function() {
      circle.animate({ d: crossPoints }, 1000, mina.bounce, crossToCircle);
    }
    const crossToCircle = function() {
      circle.animate({ d: circlePoints }, 1000, mina.bounce, circleToTriangle);
    }
    circleToTriangle();
   }, false);
  //-----------------------------------------------------------------------------------------------
  // CODE FOR SECTION '03_animateAlongPath.svg'
  const objectAAP = document.querySelector("#objectAAP");
  objectAAP.addEventListener("load", function() {
    const svg = objectAAP.contentDocument.querySelector("#svgAAP");
    const snap = Snap(svg);
    const circle = snap.select('#circle');
    const path = snap.select('#path');

    // - 'path' = The path; not the 'd' attribute, we wish with to animate along.
    // - 'element' =  The element we want to animate.
    // - 'start' = The frame we wish to start the animation on.
    // - 'duration' = Duration in milliseconds.
    const animateAlongPath = function(path, element, start, duration) {
      const length = Snap.path.getTotalLength(path);
      Snap.animate(start, length, function(value) {
        const nextPoint = Snap.path.getPointAtLength(path, value);
        element.attr({ cx: nextPoint.x, cy: nextPoint.y });
      }, duration, mina.easeinout, function() {
        // console.log('Restarting Animation...');
        animateAlongPath(path, circle, 0, 3000);
      });
    };

    animateAlongPath(path, circle, 0, 3000);
   }, false);
  //-----------------------------------------------------------------------------------------------
  // CODE FOR SECTION '03_animateAlongPath.svg + Click Handler'
  const objectAAPClick = document.querySelector("#objectAAPClick");
  objectAAPClick.addEventListener("load", function() {
    objectAAPClick.contentDocument.addEventListener("click", function() {
      animateAlongPath(path, circle, 0, 3000);
    });

    const svg = objectAAPClick.contentDocument.querySelector("#svgAAPC");
    const snap = Snap(svg);
    const circle = snap.select('#circle');
    const path = snap.select('#path');

    const animateAlongPath = function(path, element, start, duration) {
      const length = Snap.path.getTotalLength(path);
      Snap.animate(start, length, function(value) {
        const nextPoint = Snap.path.getPointAtLength(path, value);
        element.attr({ cx: nextPoint.x, cy: nextPoint.y });
      }, duration, mina.easeinout, function() {
        console.log('Restarting Animation...');
        animateAlongPath(path, circle, 0, 3000);
      });
    };
   }, false);
  //-----------------------------------------------------------------------------------------------
  // CODE FOR SECTION '05_ghostSprite.svg'
  let ghost;
  let ghostPath;

  const objectGhost = document.querySelector("#objectGhost");
  objectGhost.addEventListener("load", function() {
    const svg = objectGhost.contentDocument.querySelector("#svgGhost");
    const snap = Snap(svg);
    ghost = snap.select('#ghost');
    if(ghost && ghostPath) { animateAlongPath(ghostPath, ghost, 0, 2000, output) }
   }, false);

  const objectGhostPath = document.querySelector("#objectGhostPath");
  objectGhostPath.addEventListener("load", function() {
    const svg = objectGhostPath.contentDocument.querySelector("#svgGhostPath");
    const snap = Snap(svg);
    ghostPath = snap.select('#ghostPath');
    if(ghost && ghostPath) { animateAlongPath(ghostPath, ghost, 0, 2000, output) }
  }, false);

  const output = () => { console.log('Animation Complete!') };

  const animateAlongPath = function (path, element, start, dur, callback) {
    // Get the path length, so we know how many frames we will animate over
    const length = Snap.path.getTotalLength(path);
    Snap.animate(start, length, function (value) {
      // movePoint gets the path attributes at a certain frame
      const movePoint = Snap.path.getPointAtLength(path, value);
      // applies the attributes to our elemnt
      element.attr({ cx: movePoint.x, cy: movePoint.y });
    }, dur, mina.easeinout, function () {
      callback();
    });
  };
  //-----------------------------------------------------------------------------------------------
  // CODE FOR SECTION '06_ghostSprite.svg'
  const objectG2 = document.querySelector("#objectGhost2");
  objectG2.addEventListener("load", function() {
    const svg = objectG2.contentDocument.querySelector("#svgG2");
    const snap = Snap(svg);
    const ghosts = snap.select('#ghostAndWall');
    const path = snap.select('#path');
    const animateAlongPath = function(path, element, start, duration) {
      const length = Snap.path.getTotalLength(path);
      Snap.animate(start, length, function(value) {
        const nextPoint = Snap.path.getPointAtLength(path, value);
        element.attr({ transform:`translate(${nextPoint.x - 420} ${nextPoint.y - 250})` });
      }, duration, mina.linear, function() {
        animateAlongPath(path, ghosts, 0, 8000);
      });
    };
    animateAlongPath(path, ghosts, 0, 8000);
   }, false);
  //-----------------------------------------------------------------------------------------------
  // CODE FOR SECTION '07_ghostSprite.svg'
  const objectG3 = document.querySelector("#objectGhost3");
  objectG3.addEventListener("load", function() {
    const svg = objectG3.contentDocument.querySelector("#svgG3");
    const snap = Snap(svg);
    const ghosts = snap.select('#maskedGhost');
    const path = snap.select('#path3');
    const animateAlongPath = function(path, element, start, duration) {
      const length = Snap.path.getTotalLength(path);
      Snap.animate(start, length, function(value) {
        const nextPoint = Snap.path.getPointAtLength(path, value);
        element.attr({ transform:`translate(${nextPoint.x} ${nextPoint.y})` });
      }, duration, mina.linear, function() {
        animateAlongPath(path, ghosts, 0, 8000);
      });
    };
    animateAlongPath(path, ghosts, 0, 8000);
   }, false);
  //-----------------------------------------------------------------------------------------------
});
