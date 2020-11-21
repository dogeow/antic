import $ from "jquery";
import React, { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    $(document).ready(function () {
      let lazyloadImages;

      if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        const imageObserver = new IntersectionObserver(
          function (entries, observer) {
            console.log(observer);
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                image.classList.remove("lazy");
                imageObserver.unobserve(image);
              }
            });
          },
          {
            root: document.querySelector("#container"),
            rootMargin: "0px 0px 500px 0px",
          }
        );

        lazyloadImages.forEach(function (image) {
          imageObserver.observe(image);
        });
      } else {
        let lazyloadThrottleTimeout;
        lazyloadImages = $(".lazy");

        function lazyload() {
          if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
          }

          lazyloadThrottleTimeout = setTimeout(function () {
            const scrollTop = $(window).scrollTop();
            lazyloadImages.each(function () {
              const el = $(this);
              if (el.offset().top < window.innerHeight + scrollTop + 500) {
                const url = el.attr("data-src");
                el.attr("src", url);
                el.removeClass("lazy");
                lazyloadImages = $(".lazy");
              }
            });
            if (lazyloadImages.length == 0) {
              $(document).off("scroll");
              $(window).off("resize");
            }
          }, 20);
        }

        $(document).on("scroll", lazyload);
        $(window).on("resize", lazyload);
      }
    });
  }, []);

  return (
    <div id="container">
      <img src="https://ik.imagekit.io/demo/img/image1.jpeg?tr=w-400,h-300" />
      <img src="https://ik.imagekit.io/demo/img/image2.jpeg?tr=w-400,h-300" />
      <img src="https://ik.imagekit.io/demo/img/image3.jpg?tr=w-400,h-300" />
      <img
        className="lazy"
        data-src="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300"
      />
      <img
        className="lazy"
        data-src="https://ik.imagekit.io/demo/img/image5.jpeg?tr=w-400,h-300"
      />
      <img
        className="lazy"
        data-src="https://ik.imagekit.io/demo/img/image6.jpeg?tr=w-400,h-300"
      />
      <img
        className="lazy"
        data-src="https://ik.imagekit.io/demo/img/image7.jpeg?tr=w-400,h-300"
      />
      <img
        className="lazy"
        data-src="https://ik.imagekit.io/demo/img/image8.jpeg?tr=w-400,h-300"
      />
      <img
        className="lazy"
        data-src="https://ik.imagekit.io/demo/img/image9.jpeg?tr=w-400,h-300"
      />
      <img
        className="lazy"
        data-src="https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300"
      />
    </div>
  );
};

export default Index;
