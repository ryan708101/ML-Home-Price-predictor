function navigateTo(pageId) {
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => page.classList.remove("active"))

  const selectedPage = document.getElementById(pageId)
  if (selectedPage) {
    selectedPage.classList.add("active")
  }

  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active")
    }
  })

  const navMenu = document.querySelector(".nav-menu")
  if (navMenu.classList.contains("active")) {
    navMenu.classList.remove("active")
  }

  window.scrollTo({ top: 0, behavior: "smooth" })
}

function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu")
  navMenu.classList.toggle("active")
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const pageId = this.getAttribute("data-page")
      navigateTo(pageId)
    })
  })
})

function handleContactSubmit(event) {
  event.preventDefault()

  const formMessage = document.getElementById("formMessage")
  const form = event.target

  formMessage.className = "form-message success"
  formMessage.textContent = "Thank you for your message! We will get back to you soon."

  form.reset()

  setTimeout(() => {
    formMessage.style.display = "none"
  }, 5000)
}

function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms")
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return Number.parseInt(i) + 1
    }
  }
  return -1
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK")
  for (var i in uiBHK) {
    if (uiBHK[i].checked) {
      return Number.parseInt(i) + 1
    }
  }
  return -1
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked")
  var sqft = document.getElementById("uiSqft")
  var bhk = getBHKValue()
  var bathrooms = getBathValue()
  var location = document.getElementById("uiLocations")
  var estPrice = document.getElementById("uiEstimatedPrice")

  var url = "http://127.0.0.1:5000/predict_home_price"

  window.jQuery.post(
    url,
    {
      total_sqft: Number.parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value,
    },
    (data, status) => {
      console.log(data.estimated_price)
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>"
      console.log(status)
    },
  )
}

function onPageLoad() {
  console.log("document loaded")
  var url = "http://127.0.0.1:5000/get_location_names"
  window.jQuery.get(url, (data, status) => {
    console.log("got response for get_location_names request")
    if (data) {
      var locations = data.locations
      var uiLocations = document.getElementById("uiLocations")
      window.jQuery("#uiLocations").empty()
      for (var i in locations) {
        var opt = new Option(locations[i])
        window.jQuery("#uiLocations").append(opt)
      }
    }
  })
}

window.onload = onPageLoad
