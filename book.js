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
      playNarration();
    }
    if (currentPage == 0) {
      myBook.style.marginLeft = "-675px"; // back to starting position
      myBook.style.top = "25px"; // back to starting position
      myBook.style.transform = "rotate3d(0, 0, 0, 0deg)"; // back to starting angle

      pageNav.style.marginLeft = "50px"; // back to starting position
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
      myBook.style.marginLeft = "-100px"; // to reading position
      myBook.style.top = "12vh"; // to reading position
      myBook.style.transform = "rotate3d(150, -20, -100, 23deg)"; // to reading angle

      pageNav.style.marginLeft = "900px"; // to reading position
      pageNav.style.top = "540px"; // to reading position
      pageNav.style.transform = "rotate(-13deg)"; // to reading angle

      currentPage++;
      setPageSelection();
      playNarration();
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

  // narration audio
  var audio = new Audio();
  var narrationPlaylist = new Array(
    "/assets/audio/narration/narration-01.m4a",
    "/assets/audio/narration/narration-02.m4a",
    "/assets/audio/narration/narration-03.m4a",
    "/assets/audio/narration/narration-04.m4a",
    "/assets/audio/narration/narration-05.m4a",
    "/assets/audio/narration/narration-06.m4a",
    "/assets/audio/narration/narration-07.m4a",
    "/assets/audio/narration/narration-08.m4a",
    "/assets/audio/narration/narration-09.m4a",
    "/assets/audio/narration/narration-10.m4a",
    "/assets/audio/narration/narration-11.m4a",
    "/assets/audio/narration/narration-12.m4a",
    "/assets/audio/narration/narration-13.m4a",
    "/assets/audio/narration/narration-14.m4a",
    "/assets/audio/narration/narration-15.m4a",
    "/assets/audio/narration/narration-16.m4a",
    "/assets/audio/narration/narration-17.m4a",
    "/assets/audio/narration/narration-18.m4a",
    "/assets/audio/narration/narration-19.m4a",
    "/assets/audio/narration/narration-20.m4a"
  );

  function playNarration(e) {
    audio.src = narrationPlaylist[currentPage - 1];
    audio.play();
  }

  var soundToggle = document.getElementById('sound-toggle');

  soundToggle.addEventListener("click", (event) => {
    if (audio.muted) {
      audio.muted = false;
      soundToggle.innerHTML = '&#128266;';
    } else {
      audio.muted = true;
      soundToggle.innerHTML = '&#128263;';
    }
  });


  return;
})();
