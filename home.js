document.addEventListener("DOMContentLoaded", (event) => {
  window.Vlitejs.registerProvider('vimeo', window.VlitejsVimeo);
  let currentVideoPlayer = null;
  let currentVideo = null;
  
  // SplitText for animations
  new SplitText(".home_sequence-interventions-title", {type: "lines", linesClass: "line"});
  new SplitText(".home_sequence-interventions-entreprise", {type: "lines", linesClass: "line"});
  
  // Add authors to the good place (sibling entreprise)
  $(".home_sequence-interventions-entreprise").each((index, item) => {
    $(item).find(".home_sequence-interventions-authors").text($(item).find(".home_sequence-interventions-authors").text().trim());
    const authorsList = $(item).find(".home_sequence-interventions-authors");

    if(!$(item).find(".home_sequence-interventions-entreprise-item").hasClass("w-dyn-bind-empty")) {
      authorsList.append(",&nbsp;")
      authorsList.prependTo($(item).find(".home_sequence-interventions-entreprise-item"));
    }
  })

  // Open sommaire modal
  $('.navbar_second-sommaire').on('click', function() {
    gsap.to('.modal.is-sommaire', {
      translateX: 0,
      duration: 0.4,
      ease: "power2.easeOut",
      onComplete: function() {
        gsap.set("body", {
          overflow: 'hidden'
        })
      }
    })
  })
  
  function closeSommaire() {
    gsap.to('.modal.is-sommaire', {
      translateX: "102%",
      duration: 0.4,
      ease: "power2.easeOut",
      onComplete: function() {
        gsap.set("body", {
          overflow: 'inherit'
        })
      }
    })
  }
  // Close sommaire modal
  $('.modal-sommaire-link').on('click', closeSommaire)
  $('.close-icon.is-sommaire').on('click', closeSommaire)
  
  // Open edito modal
  $('.glowy-btn.is-edito').on('click', function() {
    gsap.to('.modal.is-edito', {
      translateX: 0,
      duration: 0.4,
      ease: "power2.easeOut",
      onComplete: function() {
        gsap.set("body", {
          overflow: 'hidden'
        })
      }
    })
  })
  
  // Close edito modal
  $('.close-icon.is-edito').on('click', function() {
    gsap.to('.modal.is-edito', {
      translateX: "102%",
      duration: 0.4,
      ease: "power2.easeOut",
      onComplete: function() {
        gsap.set("body", {
          overflow: 'inherit'
        })
      }
    })
  })

  // Active state effect on second nav
  ScrollTrigger.defaults({
    scroller: ".snapper",
  })

  const introTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#intro",
      start: "top 10%",
      end: "bottom 10%",
      toggleActions: "play reverse play reverse",
    }
  })
  introTl.to(".navbar_second-link.is-intro", {
    color: "#fff",
    duration: 0.3,
    ease: "power2.easeOut",
  }).fromTo($(".navbar_second-link.is-intro").find(".navbar_second-indicator"), {
    translateX: "-105%",
  }, {
    translateX: 0,
    duration: 0.3,
    ease: "power2.easeOut",
  }, 0)

  const editoTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#edito",
      start: "top 10%",
      end: "bottom 10%",
      toggleActions: "play reverse play reverse",
    }
  })
  editoTl.to(".navbar_second-link.is-edito", {
    color: "#fff",
    duration: 0.3,
    ease: "power2.easeOut",
  }).to($(".navbar_second-link.is-edito").find(".navbar_second-indicator"), {
    translateX: 0,
    duration: 0.3,
    ease: "power2.easeOut",
  }, 0)

  const makingTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#making",
      start: "top 10%",
      endTrigger: ".home_making-wrapper .snapper-item:last-child",
      end: "bottom 10%",
      toggleActions: "play reverse play reverse",
    }
  })
  makingTl.to(".navbar_second-link.is-making", {
    color: "#fff",
    duration: 0.3,
    ease: "power2.easeOut",
  }).to($(".navbar_second-link.is-making").find(".navbar_second-indicator"), {
    translateX: 0,
    duration: 0.3,
    ease: "power2.easeOut",
  }, 0)

  const thinkTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#thinking",
      start: "top 10%",
      endTrigger: ".footer",
      end: "bottom top",
      toggleActions: "play reverse play reverse",
    }
  })
  thinkTl.to(".navbar_second-link.is-thinking", {
    color: "#fff",
    duration: 0.3,
    ease: "power2.easeOut",
  }).to($(".navbar_second-link.is-thinking").find(".navbar_second-indicator"), {
    translateX: 0,
    duration: 0.3,
    ease: "power2.easeOut",
  }, 0)
  
  // Add custom player
  new window.Vlitejs("#player-making", {
    options: {
      controls: true,
      autoplay: false,
      playPause: true,
      progressBar: true,
      time: true,
      volume: true,
      fullscreen: true,
      poster: "https://uploads-ssl.webflow.com/65f1ad70977f323b50ce95e4/65faf81dae053291d2296dca_David%20Miet.jpg",
      bigPlay: true,
      playsinline: true,
      loop: false,
      muted: false,
      autoHide: true,
      providerParams: {
        controls: false,
      }
    },
    provider: ["vimeo"],
  })
  
  new window.Vlitejs("#player-think", {
    options: {
      controls: true,
      autoplay: false,
      playPause: true,
      progressBar: true,
      time: true,
      volume: true,
      fullscreen: true,
      poster: "https://uploads-ssl.webflow.com/65f1ad70977f323b50ce95e4/65faf81d3ba3b32f18736506_XAVIER%20TIMBEAU.jpg",
      bigPlay: true,
      playsinline: true,
      loop: false,
      muted: false,
      autoHide: true,
      providerParams: {
        controls: false,
      }
    },
    provider: ["vimeo"],
  })

  // Add match media to gsap
  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    // Scroll to the good element in view (due to scroll snap)
    $('.navbar_second-link').on("click", function() {
      const element = document.getElementById($(this).data("target"))
      element.scrollIntoView(true)
    })

    $('.modal-sommaire-link').on("click", function() {
      const element = document.getElementById($(this).data("target"))
      element.scrollIntoView(true)
    })

    // Hover effect for navbar second
    $('.navbar_second-link').on("mouseenter", function() {
      gsap.to(this, {
        color: "#fff",
        duration: 0.2,
        ease: "power2.easeOut",
      })
    }).on("mouseleave", function() {
      gsap.to(this, {
        color: "#a0a0a0",
        duration: 0.2,
        ease: "power2.easeIn",
      })
    })

  // Dynamicly add click event after finsweet attributes cmsnest loads
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsnest',
    (listInstances) => {
      // Add active class when dynamic nested video element clicked
      $('.home_sequence-interventions-item-video').on('click', function() {
        $('.home_sequence-interventions-item').removeClass('is-active');
        $(".home_intervention-video-overlay").removeClass('is-active');

        gsap.to(".home_sequence-interventions-item", {
          flex: 1,
          duration: 0.4,
          ease: "power2.easeOut",
        })

        gsap.to($(this).parent(), {
          flex:  $(this).parent().parent().children().length ? $(this).parent().parent().children().length : 1,
          duration: 0.6,
          ease: "back.out(1.3)",
        })
        gsap.set($(this).find(".home_intervention-video-overlay"), { display: "flex" })
        $(this).find(".home_intervention-video-overlay").addClass("is-active")
      })
      
      // Add click event on plus / minus icon
      $(".home_sequence-icon").on("click", function() {
        if($(this).hasClass("is-plus")) {
          $(this).removeClass("is-plus")
          $(this).addClass("is-minus")
          const collection = $(this)
            .parent()
            .siblings(".home_sequence-interventions")
            .find(".home_sequence-interventions-collection")

          const initialCollection = Flip.getState(collection);
          const tl = gsap.timeline()
          collection.find(".home_sequence-interventions-title .line")
          tl.to(collection.find(".home_sequence-interventions-title .line"), {
            yPercent: 100,
            duration: 0.4,
            ease: "power2.easeInOut",
            stagger: 0.03,
          }).to(collection.find(".home_sequence-interventions-entreprise .line"), {
            yPercent: 100,
            duration: 0.4,
            ease: "power2.easeInOut",
            stagger: 0.03,
            onComplete: function() {
              collection.addClass("is-video")
              $(collection.find(".home_sequence-interventions-item-classic")).addClass("is-disabled")
              $(collection.find(".home_sequence-interventions-item-video")).addClass("is-active")
              const options = {
                duration: 0.8,
                ease: "power2.easeOut",
              }
              Flip.from(initialCollection, options)
            }
          }, 0).to(collection.find(".home_sequence-interventions-item-video"), {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.easeOut",
            stagger: 0.05,
          })
        } else if($(this).hasClass("is-minus")) {
          $(this).removeClass("is-minus")
          $(this).addClass("is-plus")
          const collection = $(this)
            .parent()
            .siblings(".home_sequence-interventions")
            .find(".home_sequence-interventions-collection")
          
          $('.home_sequence-interventions-item').removeClass('is-active');
          $(".home_intervention-video-overlay").removeClass('is-active');
          
          const initialCollection = Flip.getState(collection);
          const tl = gsap.timeline()
          tl.to(".home_sequence-interventions-item", {
            flex: 1,
            duration: 0.4,
            ease: "power2.easeOut",
          }).to(collection.find(".home_sequence-interventions-item-video"), {
            scaleY: 0,
            duration: 0.6,
            ease: "power2.easeOut",
            stagger: {
              amount: 0.15,
              from: "end",
            },
            onComplete: function() {
              collection.removeClass("is-video")
              collection.find(".home_sequence-interventions-item-classic").removeClass("is-disabled")
              collection.find(".home_sequence-interventions-item-video").removeClass("is-active")
              
              const options = {
                duration: 0.6,
                ease: "power2.easeOut",
              }
              Flip.from(initialCollection, options)
            },
          }, "-=0.2").to([collection.find(".home_sequence-interventions-title .line"), collection.find(".home_sequence-interventions-entreprise .line")], {
            yPercent: 0,
            duration: 0.4,
            ease: "power2.easeOut",
            stagger: {
              amount: 0.03,
              from: "end",
            },
          }, "+=0.3")
        }
      })
      
      // Add click event to play btn overlay to open modal video
      $('.home_intervention-video-overlay').on('click', function() {
        if(!$(this).hasClass("is-active")) {
          return
        }

        currentVideo = {
          vimeoId: $(this).data("vimeo"),
        }
        $("#player").attr("data-vimeo-id", currentVideo.vimeoId)

        currentVideoPlayer = new window.Vlitejs("#player", {
          options: {
            controls: true,
            autoplay: false,
            playPause: true,
            progressBar: true,
            poster: $(this).parent().find(".home_intervention-video-cover").attr("src"),
            time: true,
            volume: true,
            fullscreen: true,
            bigPlay: true,
            playsinline: true,
            loop: false,
            muted: false,
            autoHide: true,
            providerParams: {
              controls: false,
            }
          },
          provider: ["vimeo"],
        })

        gsap.set("body", { overflow: 'hidden' })
        const tl = gsap.timeline()
        tl.set('.home_modal-video', { display: "flex" })
          .to('.home_modal-video', {
            opacity: 1,
            duration: 0.4,
            ease: "power2.easeOut",
          }
        )
      })
      
      // Add click event to modal background to close video and modal
      $('.home_modal-video').on('click', function(e) {
        if (e.target !== this && !$(e.target).parent().hasClass("home_modal-video"))
          return;
        
        gsap.set("body", { overflow: 'scroll' })
        currentVideoPlayer.player.pause()
        currentVideoPlayer = null
        $(this).find('.v-vlite').remove()
        $(this).find('.home_modal-video-item-wrapper').append('<div class="home_modal-video-item" id="player"></div>')

        gsap.to($(this), {
          opacity: 0,
          duration: 0.3,
          ease: "power2.easeOut",
          onComplete: () => {
            gsap.set($(this), { display: "none" })
          }
        })
      })
    }
  ])
});
