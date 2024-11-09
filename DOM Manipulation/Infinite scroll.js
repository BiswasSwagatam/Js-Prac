const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials';
let afterId = null
let canFetch = true
const testimonialContainer = document.getElementById('testimonial-container')

testimonialContainer.addEventListener('scroll', handleScroll)

fetchAndAppendTestimonials()

function handleScroll() {
  if(!canFetch) return
  const bottomSpace = (this.scrollHeight - this.scrollTop - this.clientHeight)

  if(bottomSpace > 0) return
  fetchAndAppendTestimonials()
}

function fetchAndAppendTestimonials() {
  canFetch = false
  const url = createTestimonialUrl()
  fetch(url)
    .then(res => res.json())
    .then(({testimonials, hasNext}) => {
      const fragment = document.createDocumentFragment()
      testimonials.forEach(({message}) => {
        fragment.appendChild(createTestimonialElement(message))
      })
      testimonialContainer.appendChild(fragment)

      if(hasNext) {
        afterId = testimonials[testimonials.length - 1].id
      }  else{
        testimonialContainer.removeEventListener('scroll', handleScroll)
      }
      canFetch = true
    })
}

function createTestimonialElement(message) {
  const testimonialElement = document.createElement('p')
  testimonialElement.classList.add('testimonial')
  testimonialElement.innerText = message
  return testimonialElement
}

function createTestimonialUrl() {
  const url = new URL(API_BASE_URL)
  url.searchParams.set('limit', 5)

  if(afterId != null){
    url.searchParams.set('after', afterId)
  }

  return url
}