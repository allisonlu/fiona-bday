vendorMadness = function (e, k, v) {
  var s = e.style;
  var cap = k.substring(0, 1).toUpperCase() + k.substring(1);
  s["webkit" + cap] = s["Moz" + cap] = s["ms" + cap] = s["O" + cap] = s[k] = v;
};

setTransform = function (e, v) {
  var s = e.style;
  s.webkitTransform = s.MozTransform = s.msTransform = s.OTransform = s.transform = v;
};

// add space in between pages so the stack of papers looks like a book
(function () {
  var books = document.querySelectorAll(".book");

  for (var i = 0; i < books.length; i++) {
    var book = books[i];
    var pages = book.childNodes;
    for (var j = 0; j < pages.length; j++) {
      if (pages[j].tagName == "DIV") {
        setTransform(pages[j], "translate3d(0px, 0px, " + -j + "px)");
      }
    }
  }
})();

// set viewing angle of book
(function () {
  var cardPage = document.querySelector("#myBook > div");
  setTransform(cardPage, "rotateX(23deg) rotateZ(-7deg) rotateY(-5deg)");
})();

(function () {
  var px,
    py,
    sx,
    sy,
    down,
    rot = 0,
    rotX = 0,
    rotY = 0,
    cancel;
  var cardPage = document.querySelector("#myBook > div");
  var pages = document.querySelectorAll("#myBook > div > div");
  var currentPage = 0;

  // button page turners
  const buttonNext = document.querySelector("button.button__next");
  const buttonPrevious = document.querySelector("button.button__previous");

  buttonNext.addEventListener("click", (event) => {
    nextPage();
    buttonNext.textContent = "turn to next page";
  });

  buttonPrevious.addEventListener("click", (event) => {
    previousPage();
  });

  let myBook = document.getElementById("myBook");

  var previousPage = function () {
    if (currentPage > 0) {
      currentPage--;
      setTransform(
        pages[currentPage],
        "translate3d(0px,0px," + -currentPage + "px) rotateY(0deg)"
      );
    }
    if (currentPage == 0) {
      console.log("on the cover");
      myBook.style.left = "400px";
    }
  };

  var nextPage = function () {
    if (currentPage < pages.length) {
      setTransform(
        pages[currentPage],
        "translate3d(0px,0px," + currentPage + "px) rotateY(-160deg)"
      );

      // book starts centered in screen. when book opens, it shifts to the right
      myBook.style.left = "700px";
      currentPage++;
    }
  };

  return;

  // book click and drag functionality
  // window.onmousedown = function (ev) {
  //   down = true;
  //   cancel = false;
  //   sx = px = ev.clientX;
  //   sy = py = ev.clientY;
  //   ev.preventDefault();
  // };

  // window.onmouseup = function (ev) {
  //   down = false;
  // };

  // window.onmousemove = function(ev) {
  //   if (down) {
  //     var x = ev.clientX;
  //     var y = ev.clientY;
  //     var dx = x-px;
  //     var dy = y-py;
  //     px = x;
  //     py = y;
  //     cancel = cancel || ((x-sx)*(x-sx)+(y-sy)*(y-sy) > 25);
  //     rotX -= dy * 1;
  //     rotY -= dx * 1;
  //     setTransform(cardPage, 'rotateX('+rotX+'deg) rotateY('+rotY+'deg)');
  //     ev.preventDefault();
  //   }
  // };

  // window.onclick = function (ev) {
  //   if (cancel) return;
  //   if (ev.clientX < 600) {
  //     previousPage();
  //   } else {
  //     nextPage();
  //   }
  //   ev.preventDefault();
  // };

  /* deprecated draggable page-turner

window.onmousemove = function(ev) {
  if (down) {
    var x = ev.clientX;
    var y = ev.clientY;
    var dx = x-px;
    var dy = y-py;
    px = x;
    py = y;
    rot = Math.min(0, Math.max(-150, rot+dx*2));
    var p = ((rot / -150)) * 2 * currentPage + -currentPage;
    setTransform(pages[currentPage], 'translate3d(0px,0px,'+p+'px) rotateY('+ rot + 'deg)');
    if (rot == -150 && currentPage < pages.length-1) {
      currentPage++;
      rot = 0;
    } else if (rot == 0 && currentPage > 0) {
      currentPage--;
      rot = -150;
    }
    ev.preventDefault();
  }
};
*/
})();
