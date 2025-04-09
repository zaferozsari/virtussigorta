 document.addEventListener('DOMContentLoaded', function() {
            // Modal açma işlevi
            const viewDetailsButtons = document.querySelectorAll('.view-details');
            const modalOverlay = document.getElementById('serviceModal');
            const modalHeader = document.getElementById('modalHeader');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const closeModal = document.getElementById('closeModal');
            
            viewDetailsButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Butondan verileri al
                    const title = this.getAttribute('data-title');
                    const img = this.getAttribute('data-img');
                    const description = this.getAttribute('data-description');
                    
                    // Modal içeriğini güncelle
                    modalHeader.style.backgroundImage = `url('${img}')`;
                    modalTitle.textContent = title;
                    modalDescription.textContent = description;
                    
                    // Modalı göster
                    modalOverlay.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Modal kapatma işlevi
            closeModal.addEventListener('click', function() {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Dışarı tıklayarak kapatma
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    modalOverlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
   
	

	
document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll("a[href*='#']"); // Tüm hash içeren linkler

  links.forEach(link => {
    link.addEventListener("click", function(event) {
      // Harici linkleri pas geç
      if (this.origin !== window.location.origin) return;
      
      const href = this.getAttribute('href');
      // Sadece hash içeren linkleri işle
      if (!href.includes('#')) return;

      const targetId = href.split('#')[1];
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        console.warn(`Hedef element bulunamadı: #${targetId}`);
        return; // Element yoksa normal navigasyona izin ver
      }

      event.preventDefault();
      
      // Dinamik offset hesaplama (header yüksekliği + 20px boşluk)
      const header = document.querySelector('header');
      const offset = header ? header.offsetHeight + 20 : 80;
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // URL'de hash güncelle (tarayıcı geçmişi için)
      history.pushState(null, null, `#${targetId}`);
    });
  });
});

        // Mobile Menu Toggle
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('active');
        });

        // Dropdown Menu for Mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            });
        });

        // Hero Slider
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Change slide every 5 seconds
        setInterval(nextSlide, 6000);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

 
		function toggleItems() {
    const hiddenItems = document.querySelector('.hidden-items');
    const button = document.querySelector('.toggle-button button');
    
    if (hiddenItems.style.display === "none") {
        hiddenItems.style.display = "block";
        button.textContent = "▲";
    } else {
        hiddenItems.style.display = "none";
        button.textContent = "Tümünü Göster";
    }
}




  document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("cookieConsent")) {
      document.getElementById("cookie-consent").style.display = "block";
    }

    document.getElementById("accept-cookie").addEventListener("click", function () {
      localStorage.setItem("cookieConsent", true);
      document.getElementById("cookie-consent").style.display = "none";
    });
  });




const overlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('searchResults');

document.getElementById('openSearch').addEventListener('click', () => {
  overlay.style.display = "flex";
  searchInput.focus();
});

// Kapatma butonu için event listener
document.getElementById('closeSearch').addEventListener('click', () => {
  overlay.style.display = "none";
  resultsDiv.innerHTML = "";
});

document.addEventListener('keydown', function (e) {
  // ESC ile kapat
  if (e.key === "Escape") {
    overlay.style.display = "none";
    resultsDiv.innerHTML = "";
  }

  // Enter ile arama
  if (e.key === "Enter" && overlay.style.display === "flex") {
    searchFromJSON();
  }
});

function searchFromJSON() {
  const term = normalizeTurkishChars(searchInput.value.toLowerCase());
  resultsDiv.innerHTML = "";

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      const results = data.filter(entry => 
        normalizeTurkishChars(entry.text.toLowerCase()).includes(term)
      );

      if (results.length === 0) {
        resultsDiv.innerHTML = "<p>Sonuç bulunamadı.</p>";
        return;
      }

      results.forEach(entry => {
        if (entry.id && entry.id !== "#") {
          const wrapper = document.createElement('div');
          wrapper.className = "result-item";
          const snippetText = entry.title || entry.text;
          
          const link = document.createElement('a');
          link.href = `${entry.page}#${entry.id}`;
          link.textContent = snippetText;
          link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Mevcut sayfa ile hedef sayfa aynı mı kontrol et
            if (window.location.pathname.endsWith(entry.page)) {
              // Aynı sayfadaysak direkt butona tıkla
              const targetElement = document.querySelector(`[data-title="${snippetText}"]`);
              if (targetElement) {
                targetElement.click();
              } else {
                // Element bulunamazsa hash ile yönlendir
                window.location.hash = entry.id;
              }
            } else {
              // Farklı sayfadaysa, hedef sayfaya git ve localStorage'a tıklanacak bilgisini kaydet
              localStorage.setItem('autoClickItem', JSON.stringify({
                title: snippetText,
                id: entry.id
              }));
              window.location.href = `${entry.page}#${entry.id}`;
            }
            
            resultsDiv.innerHTML = "";
            overlay.style.display = "none";
          });

          wrapper.appendChild(link);
          resultsDiv.appendChild(wrapper);
        }
      });
    });
}

// Hedef sayfa yüklendikten sonra çalışacak kod
document.addEventListener('DOMContentLoaded', function() {
  // URL'de hash varsa scroll et
  if (window.location.hash) {
    const element = document.querySelector(window.location.hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // localStorage'da autoClickItem varsa butona tıkla
  const autoClickItem = localStorage.getItem('autoClickItem');
  if (autoClickItem) {
    const { title, id } = JSON.parse(autoClickItem);
    const targetElement = document.querySelector(`[data-title="${title}"]`);
    
    // Element bulunursa tıkla ve scroll et
    if (targetElement) {
      setTimeout(() => {
        targetElement.click();
        const element = document.querySelector(`#${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Sayfanın tam yüklenmesi için küçük bir bekleme
    }
    
    // Temizle
    localStorage.removeItem('autoClickItem');
  }
});

// Türkçe karakterleri normalize eden yardımcı fonksiyon
function normalizeTurkishChars(text) {
  return text
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'g')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'o');
}



