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

(function () {
  // var px,
  //   py,
  //   sx,
  //   sy,
  //   down,
  //   rot = 0,
  //   rotX = 0,
  //   rotY = 0,
  //   cancel;
  // var cardPage = document.querySelector("#myBook > div");
  var pages = document.querySelectorAll("#myBook > div > div");
  var currentPage = 0;

  // button page turners
  const buttonNext = document.querySelector("button.button__next");
  const buttonPrevious = document.querySelector("button.button__previous");

  buttonNext.addEventListener("click", (event) => {
    nextPage();
  });

  buttonPrevious.addEventListener("click", (event) => {
    previousPage();
  });

  let myBook = document.getElementById("myBook");
  let pageNav = document.getElementById("page-nav");

  var previousPage = function () {
    if (currentPage > 0) {
      currentPage--;
      setTransform(
        pages[currentPage],
        "translate3d(0px,0px," + -currentPage + "px) rotateY(0deg)"
      );
      setPageSelection();
    }
    if (currentPage == 0) {
      myBook.style.left = "27vw"; // back to starting position
      myBook.style.top = "25px"; // back to starting position
      myBook.style.transform = "rotate3d(0, 0, 0, 0deg)"; // back to starting angle

      pageNav.style.left = "31vw"; // back to starting position
      pageNav.style.transform = "rotate3d(0, 0, 0, 0deg)"; // back to starting angle
    }
  };

  var nextPage = function () {
    if (currentPage < pages.length) {
      setTransform(
        pages[currentPage],
        "translate3d(0px,0px," + currentPage + "px) rotateY(-160deg)"
      );

      // book starts centered in screen. when book opens, it shifts to the right
      myBook.style.left = "45vw"; // to reading position
      myBook.style.top = "12vh"; // to reading position
      myBook.style.transform = "rotate3d(150, -20, -100, 23deg)"; // to reading angle

      pageNav.style.left = "57vw"; // to reading position
      pageNav.style.transform = "rotate(-13deg)"; // to reading angle

      currentPage++;
      setPageSelection();
    }
  };

  // set rotary page selector
  var setPage = function () {
    var selectedPage = parseInt(this.innerHTML);

    // if paging forwards
    if (currentPage < selectedPage) {
      var numberOfPagesToTurn = selectedPage - currentPage;

      for (var i = 0; i < numberOfPagesToTurn; i++) {
        nextPage();
      }

      // if paging backwards
    } else {
      var numberOfPagesToTurn = currentPage - selectedPage;

      for (var i = 0; i < numberOfPagesToTurn; i++) {
        previousPage();
      }
    }
    setPageSelection();
  };

  // get all page number indicator links
  var elements = document.getElementsByClassName("unit");

  var setPageSelection = function () {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "white";
      elements[i].style.color = "dodgerblue";
    }

    pageIndicator = elements[currentPage];
    pageIndicator.style.backgroundColor = "purple";
    pageIndicator.style.color = "white";
  };

  // run once to set page 0 as selected
  setPageSelection();

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", setPage, false);
  }

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
