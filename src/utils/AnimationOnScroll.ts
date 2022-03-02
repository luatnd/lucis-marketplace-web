export const addAnimationOnScroll = () => {
  const scrollElements = document.querySelectorAll(".scroll-animation")

  const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top

    return (
      elementTop - 100 <
      (window.innerHeight || document.documentElement.clientHeight)
    )
  }
  const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top
    return (
      elementTop > (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  const displayScrollElement = (element) => {
    element.classList.add("scrolled")
  }

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled")
  }

  const handleOnScroll = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el)) {
        displayScrollElement(el)
      } else if (elementOutofView(el)) {
        hideScrollElement(el)
      }
    })
  }

  window.addEventListener("scroll", () => {
    handleOnScroll()
  })
}
