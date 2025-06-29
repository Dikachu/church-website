// Pastor David's Church Website - JavaScript

// Wait for the page to load completely
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Prayer Form Handling
    const prayerForm = document.querySelector('form');
    
    if (prayerForm) {
        prayerForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the form from submitting normally
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const prayerRequest = document.getElementById('prayer-request').value;
            const isPrivate = document.getElementById('private').checked;
            
            // Simple validation
            if (!name.trim() || !prayerRequest.trim()) {
                alert('Please fill in your name and prayer request.');
                return;
            }
            
            // Show success message
            alert(`Thank you, ${name}! Your prayer request has been received. Our prayer team will lift you up in prayer.`);
            
            // Clear the form
            prayerForm.reset();
            
            // In a real website, you would send this data to a server
            console.log('Prayer Request Submitted:', {
                name: name,
                email: email,
                phone: phone,
                request: prayerRequest,
                private: isPrivate,
                timestamp: new Date()
            });
        });
    }
    
    // 2. Highlight today's events (simple example)
    function highlightTodaysEvents() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Find all list items that contain service times
        const serviceItems = document.querySelectorAll('ul li');
        
        serviceItems.forEach(function(item) {
            const text = item.textContent.toLowerCase();
            
            // Highlight Sunday services on Sundays
            if (dayOfWeek === 0 && text.includes('sunday')) {
                item.style.backgroundColor = '#ffffcc';
                item.style.fontWeight = 'bold';
                item.style.border = '2px solid #f1c40f';
                item.style.borderRadius = '5px';
            }
            
            // Highlight Tuesday Bible Study on Tuesdays
            if (dayOfWeek === 2 && text.includes('tuesday')) {
                item.style.backgroundColor = '#e8f5e8';
                item.style.fontWeight = 'bold';
                item.style.border = '2px solid #27ae60';
                item.style.borderRadius = '5px';
            }
            
            // Highlight Wednesday Prayer on Wednesdays
            if (dayOfWeek === 3 && text.includes('wednesday')) {
                item.style.backgroundColor = '#e3f2fd';
                item.style.fontWeight = 'bold';
                item.style.border = '2px solid #3498db';
                item.style.borderRadius = '5px';
            }
            
            // Highlight Friday service on Fridays
            if (dayOfWeek === 5 && text.includes('friday')) {
                item.style.backgroundColor = '#fce4ec';
                item.style.fontWeight = 'bold';
                item.style.border = '2px solid #e91e63';
                item.style.borderRadius = '5px';
            }
        });
    }
    
    // Call the function to highlight today's events
    highlightTodaysEvents();
    
    // 3. Add interactive Bible verse of the day
    function addBibleVerse() {
        const verses = [
            "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future. - Jeremiah 29:11",
            "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
            "I can do all things through Christ who strengthens me. - Philippians 4:13",
            "The Lord your God is with you, the Mighty Warrior who saves. - Zephaniah 3:17",
            "Cast all your anxiety on him because he cares for you. - 1 Peter 5:7"
        ];
        
        // Get a random verse
        const randomVerse = verses[Math.floor(Math.random() * verses.length)];
        
        // Create a verse element
        const verseElement = document.createElement('div');
        verseElement.style.cssText = `
            background: linear-gradient(45deg, #8e44ad, #9b59b6);
            color: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            text-align: center;
            font-style: italic;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        verseElement.innerHTML = `<h4 style="color: white; border: none; margin-bottom: 10px;">Daily Bible Verse</h4><p style="background: none; margin: 0; color: white;">${randomVerse}</p>`;
        
        // Insert after the welcome message
        const welcomeSection = document.querySelector('h3');
        if (welcomeSection) {
            welcomeSection.parentNode.insertBefore(verseElement, welcomeSection.nextSibling);
        }
    }
    
    // Add the daily Bible verse
    addBibleVerse();
    
    // 4. Simple countdown to next Sunday service
    function addServiceCountdown() {
        const now = new Date();
        const nextSunday = new Date();
        
        // Calculate next Sunday
        const daysUntilSunday = (7 - now.getDay()) % 7;
        if (daysUntilSunday === 0 && now.getHours() >= 12) {
            // If it's Sunday afternoon, count to next Sunday
            nextSunday.setDate(now.getDate() + 7);
        } else {
            nextSunday.setDate(now.getDate() + daysUntilSunday);
        }
        
        // Set to 8 AM (first service time)
        nextSunday.setHours(8, 0, 0, 0);
        
        // Create countdown element
        const countdownElement = document.createElement('div');
        countdownElement.id = 'service-countdown';
        countdownElement.style.cssText = `
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            color: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            text-align: center;
            font-size: 1.2em;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        // Function to update countdown
        function updateCountdown() {
            const now = new Date();
            const timeDiff = nextSunday - now;
            
            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                
                countdownElement.innerHTML = `
                    <h4 style="color: white; margin-bottom: 10px;">Next Sunday Service In:</h4>
                    <div style="font-size: 1.5em; font-weight: bold;">
                        ${days} days, ${hours} hours, ${minutes} minutes
                    </div>
                    <p style="margin-top: 10px; font-size: 0.9em;">First Service starts at 8:00 AM</p>
                `;
            } else {
                countdownElement.innerHTML = `
                    <h4 style="color: white;">Join us for worship!</h4>
                    <p>Service is happening now or has concluded for today.</p>
                `;
            }
        }
        
        // Insert countdown after service times
        const serviceSection = document.querySelector('h3');
        if (serviceSection) {
            let current = serviceSection;
            while (current && !current.textContent.includes('Service Times')) {
                current = current.nextElementSibling;
            }
            if (current) {
                // Find the end of the service times section
                let insertPoint = current.nextElementSibling;
                while (insertPoint && insertPoint.tagName !== 'H3') {
                    insertPoint = insertPoint.nextElementSibling;
                }
                if (insertPoint) {
                    insertPoint.parentNode.insertBefore(countdownElement, insertPoint);
                }
            }
        }
        
        // Update countdown immediately and then every minute
        updateCountdown();
        setInterval(updateCountdown, 60000);
    }
    
    // Add the service countdown
    addServiceCountdown();
    
    // 5. Simple contact form validation feedback
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
                this.style.backgroundColor = '#fadbd8';
            } else if (this.value.trim()) {
                this.style.borderColor = '#27ae60';
                this.style.backgroundColor = '#d5f4e6';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
            this.style.backgroundColor = 'white';
        });
    });
    
    // 6. Add smooth scrolling for better user experience
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Grace Life Church website loaded successfully!');
});